<template>
  <div class="flex flex-col lg:flex-row gap-4 p-3 pt-1 h-[calc(100vh-4rem)] overflow-hidden">
    <!-- Desktop sidebar -->
    <aside
      class="hidden lg:flex flex-col w-84 shrink-0 overflow-y-auto rounded-3xl border border-default bg-(--ui-bg-muted)/70 backdrop-blur shadow-xl shadow-black/5"
    >
      <div class="p-4 space-y-3">
        <ColorPickerPanel class="panel-card" />
        <ShadeGrid class="panel-card" />
        <SecondaryPanel class="panel-card" />
        <ThemeList class="panel-card" />
        <OutputPanel class="panel-card" />
      </div>
    </aside>

    <!-- Mobile: sticky controls bar with drawer trigger -->
    <div
      class="glass lg:hidden sticky top-16 z-20 flex items-center gap-2 px-4 py-2 border-b border-default"
    >
      <NButton
        icon="i-lucide-sliders-horizontal"
        variant="soft"
        color="primary"
        size="sm"
        @click="drawerOpen = true"
        >Controls</NButton
      >
      <span class="ml-auto flex items-center gap-2 text-xs font-mono uppercase text-muted">
        <span
          class="size-4 rounded-full ring-1 ring-default"
          :style="{ backgroundColor: currentColor }"
        />
        {{ currentColor }}
      </span>
    </div>

    <!-- Main preview area -->
    <div class="flex-1 min-w-0 overflow-hidden">
      <ComponentGallery />
    </div>

    <!-- Mobile drawer -->
    <NDrawer v-model:open="drawerOpen" placement="start" title="Theme Controls">
      <div class="space-y-3">
        <ColorPickerPanel class="panel-card" />
        <ShadeGrid class="panel-card" />
        <SecondaryPanel class="panel-card" />
        <ThemeList class="panel-card" />
        <OutputPanel class="panel-card" />
      </div>
    </NDrawer>
  </div>
</template>

<script setup lang="ts">
const drawerOpen = ref(false);
const { currentColor } = useThemeStore();
</script>
