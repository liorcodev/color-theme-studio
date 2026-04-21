import { ref, computed } from 'vue';
import { generateShades } from '~/utils/oklch';
import type { ThemeEntry } from '~/types/theme';

const DEFAULT_COLOR = '#3b82f6';
const NAME_REGEX = /^[a-zA-Z][a-zA-Z0-9-]*$/;

// Security constants
const MAX_FILE_SIZE = 1024 * 1024; // 1MB max
const MAX_THEMES = 100; // Prevent memory exhaustion
const MAX_THEME_NAME_LENGTH = 50;
const VALID_SHADE_KEYS = [
  '50',
  '100',
  '200',
  '300',
  '400',
  '500',
  '600',
  '700',
  '800',
  '900',
  '950'
];
const HEX_COLOR_REGEX = /^#[0-9A-Fa-f]{6}$/;

// Module-level state - shared across all composable calls
const currentColor = ref(DEFAULT_COLOR);
const currentShades = ref<Record<string, string>>(generateShades(DEFAULT_COLOR));
const currentName = ref('');
const nameError = ref('');
const themes = ref<ThemeEntry[]>([]);
const defaultTheme = ref('');
const includeTailwind = ref(false);
const includeNuxtUI = ref(false);

function setColor(hex: string) {
  currentColor.value = hex;
  currentShades.value = generateShades(hex);
}

function addTheme() {
  const name = currentName.value.trim();
  if (!name) {
    nameError.value = 'Name is required.';
    return;
  }
  if (!NAME_REGEX.test(name)) {
    nameError.value = 'Use letters, numbers and hyphens. Must start with a letter.';
    return;
  }
  if (themes.value.some(t => t.name === name)) {
    nameError.value = 'A theme with this name already exists.';
    return;
  }
  nameError.value = '';
  themes.value = [...themes.value, { name, shades: { ...currentShades.value } }];
  if (!defaultTheme.value) defaultTheme.value = name;
  currentName.value = '';
}

function removeTheme(name: string) {
  themes.value = themes.value.filter(t => t.name !== name);
  if (defaultTheme.value === name) {
    defaultTheme.value = themes.value[0]?.name ?? '';
  }
}

function setDefault(name: string) {
  defaultTheme.value = name;
}

// Security validation functions
function isValidHexColor(color: unknown): color is string {
  return typeof color === 'string' && HEX_COLOR_REGEX.test(color);
}

function isValidThemeName(name: unknown): name is string {
  return (
    typeof name === 'string' &&
    name.length > 0 &&
    name.length <= MAX_THEME_NAME_LENGTH &&
    NAME_REGEX.test(name)
  );
}

function isValidShades(shades: unknown): shades is Record<string, string> {
  if (typeof shades !== 'object' || shades === null || Array.isArray(shades)) {
    return false;
  }

  const shadesObj = shades as Record<string, unknown>;
  const keys = Object.keys(shadesObj);

  // Must have at least some shades
  if (keys.length === 0) return false;

  // All keys must be valid shade keys
  if (!keys.every(key => VALID_SHADE_KEYS.includes(key))) {
    return false;
  }

  // All values must be valid hex colors
  return keys.every(key => isValidHexColor(shadesObj[key]));
}

function isValidThemeEntry(entry: unknown): entry is ThemeEntry {
  if (typeof entry !== 'object' || entry === null || Array.isArray(entry)) {
    return false;
  }

  const themeEntry = entry as Record<string, unknown>;
  return isValidThemeName(themeEntry.name) && isValidShades(themeEntry.shades);
}

interface ImportData {
  version?: string;
  themes: ThemeEntry[];
  defaultTheme?: string;
  settings?: {
    includeTailwind?: boolean;
    includeNuxtUI?: boolean;
  };
}

function validateImportData(
  data: unknown
): { valid: false; error: string } | { valid: true; data: ImportData } {
  // Type check
  if (typeof data !== 'object' || data === null || Array.isArray(data)) {
    return { valid: false, error: 'Invalid file format' };
  }

  const importData = data as Record<string, unknown>;

  // Validate themes array
  if (!Array.isArray(importData.themes)) {
    return { valid: false, error: 'Missing or invalid themes array' };
  }

  if (importData.themes.length === 0) {
    return { valid: false, error: 'No themes found in file' };
  }

  if (importData.themes.length > MAX_THEMES) {
    return { valid: false, error: `Too many themes (max ${MAX_THEMES})` };
  }

  // Validate each theme
  if (!importData.themes.every(isValidThemeEntry)) {
    return { valid: false, error: 'Invalid theme data found' };
  }

  const validatedThemes = importData.themes as ThemeEntry[];

  // Check for duplicate names
  const names = new Set<string>();
  for (const theme of validatedThemes) {
    if (names.has(theme.name)) {
      return { valid: false, error: `Duplicate theme name: ${theme.name}` };
    }
    names.add(theme.name);
  }

  // Validate defaultTheme if present
  if (importData.defaultTheme !== undefined) {
    if (!isValidThemeName(importData.defaultTheme)) {
      return { valid: false, error: 'Invalid default theme name' };
    }
    if (!validatedThemes.some(t => t.name === importData.defaultTheme)) {
      return { valid: false, error: 'Default theme not found in themes list' };
    }
  }

  // Validate settings if present
  if (importData.settings !== undefined) {
    if (
      typeof importData.settings !== 'object' ||
      importData.settings === null ||
      Array.isArray(importData.settings)
    ) {
      return { valid: false, error: 'Invalid settings format' };
    }

    const settings = importData.settings as Record<string, unknown>;
    if (settings.includeTailwind !== undefined && typeof settings.includeTailwind !== 'boolean') {
      return { valid: false, error: 'Invalid includeTailwind setting' };
    }
    if (settings.includeNuxtUI !== undefined && typeof settings.includeNuxtUI !== 'boolean') {
      return { valid: false, error: 'Invalid includeNuxtUI setting' };
    }
  }

  return {
    valid: true,
    data: {
      themes: validatedThemes,
      defaultTheme: importData.defaultTheme as string | undefined,
      settings: importData.settings as ImportData['settings']
    }
  };
}

// Export themes to JSON file
function exportThemes() {
  const exportData: ImportData = {
    version: '1.0',
    themes: themes.value,
    defaultTheme: defaultTheme.value || undefined,
    settings: {
      includeTailwind: includeTailwind.value,
      includeNuxtUI: includeNuxtUI.value
    }
  };

  const json = JSON.stringify(exportData, null, 2);
  const blob = new Blob([json], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `themes-${Date.now()}.json`;
  link.click();
  URL.revokeObjectURL(url);
}

// Import themes from JSON file
async function importThemes(
  file: File
): Promise<{ success: boolean; error?: string; imported?: number }> {
  // Validate file type
  if (!file.name.toLowerCase().endsWith('.json')) {
    return { success: false, error: 'Only JSON files are allowed' };
  }

  // Validate file size
  if (file.size > MAX_FILE_SIZE) {
    return { success: false, error: `File too large (max ${MAX_FILE_SIZE / 1024}KB)` };
  }

  if (file.size === 0) {
    return { success: false, error: 'File is empty' };
  }

  try {
    // Read file content
    const text = await file.text();

    // Parse JSON with error handling
    let data: unknown;
    try {
      data = JSON.parse(text);
    } catch {
      return { success: false, error: 'Invalid JSON format' };
    }

    // Validate data structure
    const validation = validateImportData(data);
    if (!validation.valid) {
      return { success: false, error: validation.error };
    }

    const importData = validation.data;

    // Check for name conflicts with existing themes
    const conflicts = importData.themes.filter(imported =>
      themes.value.some(existing => existing.name === imported.name)
    );

    if (conflicts.length > 0) {
      return {
        success: false,
        error: `Theme name conflicts: ${conflicts.map(t => t.name).join(', ')}`
      };
    }

    // All validation passed - import the themes
    themes.value = [...themes.value, ...importData.themes];

    // Import settings if present
    if (importData.settings) {
      if (importData.settings.includeTailwind !== undefined) {
        includeTailwind.value = importData.settings.includeTailwind;
      }
      if (importData.settings.includeNuxtUI !== undefined) {
        includeNuxtUI.value = importData.settings.includeNuxtUI;
      }
    }

    // Set default theme if present and we don't have one
    if (importData.defaultTheme && !defaultTheme.value) {
      defaultTheme.value = importData.defaultTheme;
    }

    return { success: true, imported: importData.themes.length };
  } catch (error) {
    // Don't expose internal error details
    console.error('Import error:', error);
    return { success: false, error: 'Failed to read file' };
  }
}

const themeInfos = computed(() =>
  themes.value.map(t => ({ name: t.name, color: t.shades['500'] ?? '#000' }))
);

export function useThemeStore() {
  return {
    currentColor,
    currentShades,
    currentName,
    nameError,
    themes,
    defaultTheme,
    includeTailwind,
    includeNuxtUI,
    themeInfos,
    setColor,
    addTheme,
    removeTheme,
    setDefault,
    exportThemes,
    importThemes
  };
}
