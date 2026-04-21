<template>
  <div class="space-y-3">
    <div class="text-sm font-medium text-highlighted">Save Theme</div>

    <!-- Name input + add button -->
    <UFormField :error="nameError || undefined">
      <div class="flex gap-2">
        <UInput
          v-model="currentName"
          placeholder="theme-name"
          class="flex-1 font-mono"
          @keydown.enter="addTheme"
          @update:model-value="nameError = ''"
        />
        <UButton
          icon="i-lucide-plus"
          color="primary"
          :disabled="!currentName.trim()"
          @click="addTheme"
        />
      </div>
    </UFormField>

    <!-- Saved themes list -->
    <div v-if="themes.length" class="space-y-2">
      <div class="text-xs text-muted font-medium uppercase tracking-wide">Saved themes</div>

      <div
        v-for="theme in themes"
        :key="theme.name"
        class="flex items-center gap-2 px-3 py-2 rounded-lg border border-default bg-elevated hover:bg-accented transition-colors"
      >
        <!-- Color dot -->
        <div
          class="w-3 h-3 rounded-full shrink-0 ring-1 ring-default"
          :style="{ backgroundColor: theme.shades['500'] }"
        />

        <!-- Name -->
        <span class="flex-1 text-sm font-mono truncate">{{ theme.name }}</span>

        <!-- Apply to picker -->
        <UTooltip text="Apply to color picker">
          <UButton
            icon="i-lucide-palette"
            color="primary"
            variant="ghost"
            size="xs"
            @click="applyTheme(theme)"
          />
        </UTooltip>

        <!-- Default radio -->
        <UTooltip text="Set as default">
          <UButton
            icon="i-lucide-star"
            :color="defaultTheme === theme.name ? 'primary' : 'neutral'"
            :variant="defaultTheme === theme.name ? 'solid' : 'ghost'"
            size="xs"
            @click="setDefault(theme.name)"
          />
        </UTooltip>

        <!-- Delete -->
        <UTooltip text="Remove">
          <UButton
            icon="i-lucide-trash-2"
            color="error"
            variant="ghost"
            size="xs"
            @click="removeTheme(theme.name)"
          />
        </UTooltip>
      </div>
    </div>

    <div v-else class="text-xs text-muted text-center py-2">No themes saved yet.</div>

    <!-- Import/Export section -->
    <div class="flex gap-2 pt-2 border-t border-default">
      <UButton
        v-if="themes.length"
        icon="i-lucide-download"
        color="neutral"
        variant="soft"
        size="sm"
        class="flex-1"
        @click="handleExport"
      >
        Export
      </UButton>
      <UButton
        icon="i-lucide-upload"
        color="neutral"
        variant="soft"
        size="sm"
        :class="themes.length ? 'flex-1' : 'w-full'"
        @click="triggerImport"
      >
        Import
      </UButton>
      <input ref="fileInput" type="file" accept=".json" class="hidden" @change="handleImport" />
    </div>

    <!-- Import feedback -->
    <div
      v-if="importMessage"
      class="text-xs px-3 py-2 rounded-lg"
      :class="importError ? 'bg-error-50 text-error-500' : 'bg-success-50 text-success-500'"
    >
      {{ importMessage }}
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ThemeEntry } from '~/types/theme';

const {
  currentName,
  nameError,
  themes,
  defaultTheme,
  addTheme,
  removeTheme,
  setDefault,
  setColor,
  exportThemes,
  importThemes
} = useThemeStore();

const fileInput = ref<HTMLInputElement | null>(null);
const importMessage = ref('');
const importError = ref(false);

function applyTheme(theme: ThemeEntry) {
  // Apply the theme's base color (500 shade) to the color picker
  const baseColor = theme.shades['500'];
  if (baseColor) {
    setColor(baseColor);
  }
}

function handleExport() {
  try {
    exportThemes();
  } catch (error) {
    console.error('Export error:', error);
    importMessage.value = 'Export failed';
    importError.value = true;
    setTimeout(() => {
      importMessage.value = '';
    }, 3000);
  }
}

function triggerImport() {
  fileInput.value?.click();
}

async function handleImport(event: Event) {
  const target = event.target as HTMLInputElement;
  const file = target.files?.[0];

  if (!file) return;

  const result = await importThemes(file);

  if (result.success) {
    importMessage.value = `Successfully imported ${result.imported} theme(s)`;
    importError.value = false;
  } else {
    importMessage.value = result.error || 'Import failed';
    importError.value = true;
  }

  // Clear the file input so the same file can be selected again
  target.value = '';

  // Clear message after 5 seconds
  setTimeout(() => {
    importMessage.value = '';
  }, 5000);
}
</script>
