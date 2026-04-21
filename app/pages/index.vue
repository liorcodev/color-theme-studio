<template>
  <div class="flex flex-col lg:flex-row h-[calc(100vh-4rem)] overflow-hidden">
    <!-- Desktop sidebar -->
    <aside
      class="hidden lg:flex flex-col w-72 shrink-0 border-r border-default bg-default overflow-y-auto"
    >
      <div class="p-4 space-y-5">
        <ColorPickerPanel />
        <USeparator />
        <ShadeGrid />
        <USeparator />
        <ThemeList />
        <USeparator />
        <OutputPanel />
      </div>
    </aside>

    <!-- Mobile: sticky controls bar with drawer trigger -->
    <div
      class="lg:hidden sticky top-0 z-10 flex items-center gap-2 px-4 py-2 border-b border-default bg-default"
    >
      <UButton icon="i-lucide-sliders" variant="ghost" size="sm" @click="drawerOpen = true"
        >Controls</UButton
      >
      <span class="text-xs text-muted ml-auto">{{ currentColor }}</span>
    </div>

    <!-- Main preview area -->
    <div class="flex-1 overflow-hidden bg-muted/30">
      <div class="p-4 h-full">
        <DemoPreview />
      </div>
    </div>

    <!-- Mobile drawer -->
    <UDrawer v-model:open="drawerOpen" direction="left" :ui="{ content: 'w-80' }">
      <template #content>
        <div class="h-full overflow-y-auto">
          <div class="p-4 space-y-5">
            <div class="flex items-center justify-between mb-1">
              <span class="font-semibold text-sm">Theme Controls</span>
              <UButton icon="i-lucide-x" variant="ghost" size="xs" @click="drawerOpen = false" />
            </div>
            <ColorPickerPanel />
            <USeparator />
            <ShadeGrid />
            <USeparator />
            <ThemeList />
            <USeparator />
            <OutputPanel />
          </div>
        </div>
      </template>
    </UDrawer>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'default' });
const drawerOpen = ref(false);
const { currentColor } = useThemeStore();
</script>
