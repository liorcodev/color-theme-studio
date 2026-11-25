<template>
  <div class="space-y-3">
    <div class="panel-title">
      <span class="panel-title-icon"><NIcon name="i-lucide-blend" class="size-3.5" /></span>
      Secondary Color
    </div>

    <NRadioGroup v-model="secondaryMode" orientation="horizontal" size="sm" :items="modes" />

    <p v-if="secondaryMode === 'off'" class="text-xs text-muted">
      No secondary exported. noofpi-ui keeps its default blue secondary.
    </p>

    <!-- Auto: hue rotated from the primary -->
    <div v-else-if="secondaryMode === 'auto'" class="space-y-2">
      <div class="flex items-center justify-between text-xs text-muted">
        <span>Hue shift from primary</span>
        <span class="font-mono">{{ secondaryHueShift }}°</span>
      </div>
      <NSlider v-model="secondaryHueShift" :min="0" :max="360" :step="5" />
    </div>

    <!-- Manual: pick the color -->
    <div v-else class="flex items-center gap-3">
      <label class="relative cursor-pointer">
        <input type="color" :value="secondaryColor" class="sr-only" @input="onColorInput" />
        <div
          class="size-11 rounded-xl ring-2 ring-offset-2 ring-offset-(--ui-bg) ring-default shadow-md cursor-pointer transition-transform hover:scale-105"
          :style="{ backgroundColor: secondaryColor }"
        />
      </label>
      <NInput
        v-model="hexText"
        placeholder="#10b981"
        class="flex-1 font-mono [&_input]:uppercase"
        @blur="onHexBlur"
        @keydown.enter="onHexBlur"
      >
        <template #leading>
          <span class="text-muted text-xs">#</span>
        </template>
      </NInput>
    </div>

    <!-- Generated secondary shades -->
    <div v-if="secondaryShades" class="flex overflow-hidden rounded-lg">
      <div
        v-for="(hex, key) in secondaryShades"
        :key="key"
        class="h-6 flex-1"
        :style="{ backgroundColor: hex }"
        :title="`${key} ${hex}`"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
const { secondaryMode, secondaryColor, secondaryHueShift, secondaryShades, setSecondaryColor } =
  useThemeStore();

const modes = [
  { label: 'Off', value: 'off' },
  { label: 'Auto', value: 'auto' },
  { label: 'Manual', value: 'manual' }
];

const hexText = ref(secondaryColor.value);

watch(secondaryColor, val => {
  hexText.value = val;
});

function onColorInput(e: Event) {
  setSecondaryColor((e.target as HTMLInputElement).value);
}

function onHexBlur() {
  let val = hexText.value.trim();
  if (!val.startsWith('#')) val = '#' + val;
  if (/^#[0-9a-fA-F]{6}$/.test(val)) {
    setSecondaryColor(val);
  } else {
    hexText.value = secondaryColor.value;
  }
}
</script>
