<template>
  <div class="space-y-3">
    <div class="panel-title">
      <span class="panel-title-icon"><NIcon name="i-lucide-pipette" class="size-3.5" /></span>
      Base Color
    </div>

    <!-- Large swatch; click anywhere to open the native color picker -->
    <label
      class="relative flex h-28 cursor-pointer items-end justify-between overflow-hidden rounded-2xl p-3 shadow-lg ring-1 ring-black/10 transition-transform hover:scale-[1.02]"
      :style="{
        backgroundImage: `linear-gradient(135deg, ${currentShades['400']}, ${currentColor} 55%, ${currentShades['700']})`,
        color: swatchText
      }"
    >
      <input type="color" :value="currentColor" class="sr-only" @input="onColorInput" />
      <span class="font-mono text-lg font-semibold uppercase tracking-wide">{{
        currentColor
      }}</span>
      <span
        class="flex items-center gap-1 rounded-full bg-black/20 px-2.5 py-1 text-xs font-medium backdrop-blur"
      >
        <NIcon name="i-lucide-pipette" class="size-3.5" />
        Pick
      </span>
    </label>

    <!-- Hex text input -->
    <NInput
      v-model="hexText"
      placeholder="#3b82f6"
      class="w-full font-mono [&_input]:uppercase"
      @blur="onHexBlur"
      @keydown.enter="onHexBlur"
    >
      <template #leading>
        <span class="text-muted text-xs">#</span>
      </template>
    </NInput>
  </div>
</template>

<script setup lang="ts">
const { currentColor, currentShades, setColor } = useThemeStore();

const hexText = ref(currentColor.value);

// White or near-black text, whichever reads better on the swatch
const swatchText = computed(() => {
  const h = currentColor.value.replace('#', '');
  const [r, g, b] = [0, 2, 4].map(i => parseInt(h.slice(i, i + 2), 16) / 255);
  return 0.2126 * r! + 0.7152 * g! + 0.0722 * b! > 0.6 ? '#1a1a1a' : '#ffffff';
});

watch(currentColor, val => {
  hexText.value = val;
});

function onColorInput(e: Event) {
  const val = (e.target as HTMLInputElement).value;
  setColor(val);
}

function onHexBlur() {
  let val = hexText.value.trim();
  if (!val.startsWith('#')) val = '#' + val;
  if (/^#[0-9a-fA-F]{6}$/.test(val)) {
    setColor(val);
  } else {
    hexText.value = currentColor.value;
  }
}
</script>
