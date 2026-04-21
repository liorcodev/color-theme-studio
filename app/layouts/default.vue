<template>
  <div class="min-h-screen flex flex-col">
    <UHeader :ui="{ body: 'flex flex-col' }">
      <template #left>
        <div class="flex items-center gap-2">
          <UIcon name="i-lucide-palette" class="text-primary size-5" />
          <span class="font-semibold text-base">Color Theme Studio</span>
        </div>
      </template>
      <UButton
        v-for="navItem in navItems"
        :key="navItem.label"
        :icon="navItem.icon"
        :to="navItem.to"
        :color="navItem.active ? 'primary' : 'neutral'"
        variant="ghost"
        ,
      >
        {{ navItem.label }}
      </UButton>
      <template #body>
        <UButton
          v-for="navItem in navItems"
          :key="navItem.label"
          :icon="navItem.icon"
          :to="navItem.to"
          :color="navItem.active ? 'primary' : 'neutral'"
          variant="ghost"
          ,
          class=""
        >
          {{ navItem.label }}
        </UButton>
      </template>
      <template #right>
        <UColorModeButton />
        <UButton
          icon="i-lucide-github"
          color="neutral"
          variant="ghost"
          as="a"
          href="https://github.com/liorcodev/color-theme-studio"
        />
      </template>
    </UHeader>

    <UMain>
      <slot />
    </UMain>
  </div>
</template>

<script setup lang="ts">
const route = useRoute();
const activeNav = computed(() => {
  if (route.path === '/') return 'Builder';
  if (route.path === '/docs') return 'Docs';
  return '';
});

const navItems = computed(() => [
  {
    label: 'Builder',
    icon: 'i-lucide-sliders',
    to: '/',
    active: activeNav.value === 'Builder'
  },
  {
    label: 'Docs',
    icon: 'i-lucide-book-open',
    to: '/docs',
    active: activeNav.value === 'Docs'
  }
]);
</script>
