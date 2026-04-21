<template>
  <div class="space-y-2">
    <div class="text-sm font-medium text-highlighted">Shade Palette</div>
    <div class="grid grid-cols-1 gap-1">
      <button
        v-for="shade in shades"
        :key="shade.key"
        class="relative flex items-center justify-between px-3 py-2 rounded-lg transition-all hover:brightness-110 active:scale-95 group"
        :style="{ backgroundColor: shade.hex }"
        @click="copyShade(shade)"
      >
        <span class="text-xs font-semibold" :style="{ color: shade.textColor }">
          {{ shade.key }}
        </span>
        <span class="text-xs font-mono opacity-80" :style="{ color: shade.textColor }">
          {{ shade.hex }}
        </span>
        <!-- Copy hint -->
        <span
          class="absolute inset-0 flex items-center justify-center rounded-lg opacity-0 group-hover:opacity-100 transition-opacity text-xs font-semibold"
          :style="{ color: shade.textColor, backgroundColor: shade.hex + 'cc' }"
        >
          <UIcon name="i-lucide-copy" class="mr-1 size-3" />
          Copy
        </span>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
const { currentShades } = useThemeStore();
const toast = useToast();

const SHADE_KEYS = ['50', '100', '200', '300', '400', '500', '600', '700', '800', '900', '950'];

function perceivedLuminance(hex: string): number {
  const h = hex.replace('#', '');
  const r = parseInt(h.slice(0, 2), 16) / 255;
  const g = parseInt(h.slice(2, 4), 16) / 255;
  const b = parseInt(h.slice(4, 6), 16) / 255;
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

const shades = computed(() =>
  SHADE_KEYS.map(key => {
    const hex = currentShades.value[key] ?? '#000000';
    const lum = perceivedLuminance(hex);
    return {
      key,
      hex,
      textColor: lum > 0.45 ? '#1a1a1a' : '#f5f5f5'
    };
  })
);

async function copyShade(shade: { key: string; hex: string }) {
  try {
    await navigator.clipboard.writeText(shade.hex);
    toast.add({
      title: `Copied ${shade.hex}`,
      icon: 'i-lucide-check',
      duration: 1500,
      color: 'success'
    });
  } catch {
    // fallback silent fail
  }
}
</script>
