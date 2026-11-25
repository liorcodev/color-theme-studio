<template>
  <div class="space-y-3">
    <div class="panel-title">
      <span class="panel-title-icon"><NIcon name="i-lucide-bookmark-plus" class="size-3.5" /></span>
      Save Theme
    </div>

    <!-- Name input + add button -->
    <NFormField :error="nameError || undefined">
      <div class="flex gap-2">
        <NInput
          v-model="currentName"
          placeholder="theme-name"
          class="flex-1 font-mono"
          @keydown.enter="addTheme"
          @update:model-value="nameError = ''"
        />
        <NButton
          icon="i-lucide-plus"
          color="primary"
          aria-label="Add theme"
          :disabled="!currentName.trim()"
          @click="addTheme"
        />
      </div>
    </NFormField>

    <!-- Saved themes list -->
    <div v-if="themes.length" class="space-y-2">
      <div class="text-xs text-muted font-medium uppercase tracking-wide">Saved themes</div>

      <div
        v-for="(theme, index) in themes"
        :key="theme.name"
        draggable="true"
        class="flex items-center gap-2.5 px-3 py-2 rounded-lg border border-default bg-elevated hover:bg-accented transition-colors cursor-move"
        :class="{
          'opacity-50': draggedIndex === index,
          'border-primary': dropTargetIndex === index
        }"
        @dragstart="handleDragStart(index, $event)"
        @dragend="handleDragEnd"
        @dragover="handleDragOver(index, $event)"
        @dragleave="handleDragLeave"
        @drop="handleDrop(index, $event)"
      >
        <!-- Color dots (primary, secondary) -->
        <div class="flex shrink-0 -space-x-1">
          <div
            class="w-3 h-3 rounded-full ring-1 ring-default"
            :style="{ backgroundColor: theme.shades['500'] }"
          />
          <div
            v-if="theme.secondary"
            class="w-3 h-3 rounded-full ring-1 ring-default"
            :style="{ backgroundColor: theme.secondary['500'] }"
          />
        </div>

        <!-- Name with tooltip -->
        <div class="flex-1 min-w-0">
          <NTooltip :text="theme.name">
            <span class="block text-sm font-mono truncate">{{ theme.name }}</span>
          </NTooltip>
        </div>

        <!-- Apply to picker -->
        <NTooltip text="Apply to color picker">
          <NButton
            icon="i-lucide-palette"
            color="primary"
            variant="ghost"
            size="xs"
            aria-label="Apply to color picker"
            @click="applyTheme(theme)"
          />
        </NTooltip>

        <!-- Default radio -->
        <NTooltip text="Set as default">
          <NButton
            icon="i-lucide-star"
            :color="defaultTheme === theme.name ? 'primary' : 'neutral'"
            :variant="defaultTheme === theme.name ? 'solid' : 'ghost'"
            size="xs"
            aria-label="Set as default"
            @click="setDefault(theme.name)"
          />
        </NTooltip>

        <!-- Delete -->
        <NTooltip text="Remove">
          <NButton
            icon="i-lucide-trash-2"
            color="error"
            variant="ghost"
            size="xs"
            aria-label="Remove"
            @click="removeTheme(theme.name)"
          />
        </NTooltip>
      </div>
    </div>

    <div v-else class="text-xs text-muted text-center py-2">No themes saved yet.</div>

    <!-- Import/Export section -->
    <div class="flex gap-2 pt-2 border-t border-default">
      <NButton
        v-if="themes.length"
        icon="i-lucide-download"
        color="neutral"
        variant="soft"
        size="sm"
        class="flex-1"
        @click="handleExport"
      >
        Export
      </NButton>
      <NButton
        icon="i-lucide-upload"
        color="neutral"
        variant="soft"
        size="sm"
        :class="themes.length ? 'flex-1' : 'w-full'"
        @click="triggerImport"
      >
        Import
      </NButton>
      <input ref="fileInput" type="file" accept=".json" class="hidden" @change="handleImport" />
    </div>

    <!-- Import feedback -->
    <div
      v-if="importMessage"
      class="text-xs px-3 py-2 rounded-lg"
      :class="importError ? 'bg-red-500/10 text-red-600' : 'bg-green-500/10 text-green-600'"
    >
      {{ importMessage }}
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ThemeEntry } from '../types/theme';

const {
  currentName,
  nameError,
  themes,
  defaultTheme,
  addTheme,
  removeTheme,
  setDefault,
  reorderThemes,
  setColor,
  setSecondaryColor,
  setSecondaryMode,
  exportThemes,
  importThemes
} = useThemeStore();

const fileInput = ref<HTMLInputElement | null>(null);
const importMessage = ref('');
const importError = ref(false);

// Drag and drop state
const draggedIndex = ref<number | null>(null);
const dropTargetIndex = ref<number | null>(null);

function handleDragStart(index: number, event: DragEvent) {
  draggedIndex.value = index;
  if (event.dataTransfer) {
    event.dataTransfer.effectAllowed = 'move';
    event.dataTransfer.setData('text/plain', index.toString());
  }
}

function handleDragEnd() {
  draggedIndex.value = null;
  dropTargetIndex.value = null;
}

function handleDragOver(index: number, event: DragEvent) {
  event.preventDefault();
  if (event.dataTransfer) {
    event.dataTransfer.dropEffect = 'move';
  }
  if (draggedIndex.value !== null && draggedIndex.value !== index) {
    dropTargetIndex.value = index;
  }
}

function handleDragLeave() {
  dropTargetIndex.value = null;
}

function handleDrop(toIndex: number, event: DragEvent) {
  event.preventDefault();

  if (draggedIndex.value !== null && draggedIndex.value !== toIndex) {
    reorderThemes(draggedIndex.value, toIndex);
  }

  draggedIndex.value = null;
  dropTargetIndex.value = null;
}

function applyTheme(theme: ThemeEntry) {
  // Apply the theme's base color (500 shade) to the color picker
  const baseColor = theme.shades['500'];
  if (baseColor) {
    setColor(baseColor);
  }
  const secondaryBase = theme.secondary?.['500'];
  if (secondaryBase) {
    setSecondaryColor(secondaryBase);
    setSecondaryMode('manual');
  } else {
    setSecondaryMode('off');
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
