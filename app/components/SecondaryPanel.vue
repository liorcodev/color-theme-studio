<template>
  <div class="space-y-3">
    <div class="text-sm font-medium text-highlighted">Secondary Color</div>

    <URadioGroup
      v-model="secondaryMode"
      orientation="horizontal"
      size="sm"
      :items="modes"
      :ui="{ fieldset: 'flex-wrap gap-x-3 gap-y-1' }"
    />

    <p v-if="secondaryMode === 'off'" class="text-xs text-muted">
      No secondary exported. noofpi-ui keeps its default blue secondary.
    </p>

    <!-- Auto: hue rotated from the primary -->
    <div v-else-if="secondaryMode === 'auto'" class="space-y-2">
      <div class="flex items-center justify-between text-xs text-muted">
        <span>Hue shift from primary</span>
        <span class="font-mono">{{ secondaryHueShift }}°</span>
      </div>
      <USlider v-model="secondaryHueShift" :min="0" :max="360" :step="5" />
    </div>

    <!-- Manual: pick the color -->
    <div v-else class="flex items-center gap-3">
      <label class="relative cursor-pointer">
        <input type="color" :value="secondaryColor" class="sr-only" @input="onColorInput" />
        <div
          class="w-10 h-10 rounded-lg border-2 border-default shadow-sm cursor-pointer transition-transform hover:scale-105"
          :style="{ backgroundColor: secondaryColor }"
        />
      </label>
      <UInput
        v-model="hexText"
        placeholder="#10b981"
        class="flex-1 font-mono"
        :ui="{ base: 'uppercase' }"
        @blur="onHexBlur"
        @keydown.enter="onHexBlur"
      >
        <template #leading>
          <span class="text-muted text-xs">#</span>
        </template>
      </UInput>
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
