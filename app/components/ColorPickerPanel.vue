<template>
  <div class="space-y-3">
    <div class="text-sm font-medium text-highlighted">Base Color</div>

    <div class="flex items-center gap-3">
      <!-- Native color wheel -->
      <label class="relative cursor-pointer">
        <input type="color" :value="currentColor" class="sr-only" @input="onColorInput" />
        <div
          class="w-10 h-10 rounded-lg border-2 border-default shadow-sm cursor-pointer transition-transform hover:scale-105"
          :style="{ backgroundColor: currentColor }"
        />
      </label>

      <!-- Hex text input -->
      <UInput
        v-model="hexText"
        placeholder="#3b82f6"
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
  </div>
</template>

<script setup lang="ts">
const { currentColor, setColor } = useThemeStore();

const hexText = ref(currentColor.value);

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
