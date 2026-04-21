<template>
  <div class="space-y-3">
    <!-- Export options -->
    <div class="space-y-2">
      <p class="text-xs font-semibold text-foreground">Export Options</p>
      <UCheckbox v-model="includeTailwind" label="Include Tailwind CSS v4" />
      <UCheckbox v-model="includeNuxtUI" label="Include Nuxt UI integration" />
    </div>

    <!-- Download button -->
    <UButton
      block
      icon="i-lucide-download"
      :disabled="!themes.length"
      color="primary"
      variant="solid"
      @click="downloadZip"
    >
      Download ZIP
    </UButton>

    <!-- Hint -->
    <p class="text-xs text-center text-muted">
      <template v-if="themes.length">
        {{ themes.length }} theme{{ themes.length > 1 ? 's' : '' }} ready to export
      </template>
      <template v-else> Add at least one theme to export. </template>
    </p>
  </div>
</template>

<script setup lang="ts">
import JSZip from 'jszip';
import { generateCss, generateJs, generateTypes } from '~/utils/generators';

const { themes, defaultTheme, includeTailwind, includeNuxtUI } = useThemeStore();

async function downloadZip() {
  if (!themes.value.length) return;
  const defaultName = defaultTheme.value || themes.value[0]?.name || 'default';
  const zip = new JSZip();
  zip.file(
    'theme.css',
    generateCss(themes.value, defaultName, 'color-theme', {
      includeTailwind: includeTailwind.value,
      includeNuxtUI: includeNuxtUI.value
    })
  );
  zip.file('theme.js', generateJs(themes.value, defaultName));
  zip.file('theme.d.ts', generateTypes(themes.value));
  const blob = await zip.generateAsync({ type: 'blob' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'theme.zip';
  a.click();
  URL.revokeObjectURL(url);
}
</script>
