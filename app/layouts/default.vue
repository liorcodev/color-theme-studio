<template>
  <div class="app-backdrop min-h-screen flex flex-col">
    <header class="sticky top-0 z-30 h-16 px-3 pt-2">
      <div
        class="glass mx-auto flex h-12 max-w-[120rem] items-center gap-6 rounded-2xl border border-default px-3 shadow-lg shadow-black/5"
      >
        <NoofpiLink to="/" class="group flex items-center gap-3">
          <img :src="logoUrl" alt="" class="size-9 rounded-xl shadow-md" />
          <span class="flex flex-col leading-none">
            <span class="text-[0.95rem] font-semibold tracking-tight text-highlighted">
              Color Theme Studio
            </span>
            <span
              class="mt-1 hidden text-[0.65rem] uppercase tracking-[0.14em] text-muted sm:block"
            >
              OKLCH palette builder
            </span>
          </span>
        </NoofpiLink>

        <nav
          aria-label="Main"
          class="ml-2 flex items-center gap-1 rounded-xl border border-default bg-(--ui-bg-muted)/60 p-1"
        >
          <NoofpiLink
            v-for="item in navItems"
            :key="item.to"
            :to="item.to"
            class="flex items-center gap-2 rounded-lg px-3 py-1.5 text-sm font-medium transition-all"
            :class="
              item.active
                ? 'bg-default text-highlighted ring-1 ring-default shadow-sm'
                : 'text-muted hover:text-highlighted'
            "
          >
            <NIcon :name="item.icon" class="size-4" :class="item.active ? 'text-primary' : ''" />
            {{ item.label }}
          </NoofpiLink>
        </nav>

        <div class="ml-auto flex items-center gap-1">
          <NButton
            :icon="isDark ? 'i-lucide-sun' : 'i-lucide-moon'"
            color="neutral"
            variant="ghost"
            :aria-label="isDark ? 'Switch to light mode' : 'Switch to dark mode'"
            @click="toggle"
          />
          <NButton
            as="a"
            icon="i-lucide-github"
            color="neutral"
            variant="soft"
            href="https://github.com/liorcodev/color-theme-studio"
            target="_blank"
            rel="noopener"
            aria-label="GitHub"
          >
            <span class="hidden sm:inline">Star on GitHub</span>
          </NButton>
        </div>
      </div>
    </header>

    <main class="flex-1">
      <slot />
    </main>

    <footer v-if="!isStudio" class="border-t border-default glass">
      <div
        class="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-6 py-8 text-sm text-muted"
      >
        <div class="flex items-center gap-2.5">
          <img :src="logoUrl" alt="" class="size-7 rounded-lg" />
          <span class="font-medium text-highlighted">Color Theme Studio</span>
          <span>· MIT licensed</span>
        </div>
        <div class="flex items-center gap-5">
          <NoofpiLink to="/studio" class="hover:text-highlighted">Studio</NoofpiLink>
          <NoofpiLink to="/docs" class="hover:text-highlighted">Docs</NoofpiLink>
          <a
            href="https://github.com/liorcodev/color-theme-studio"
            target="_blank"
            rel="noopener"
            class="hover:text-highlighted"
            >GitHub</a
          >
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { NoofpiLink } from 'noofpi/runtime';

const route = useRoute();
const logoUrl = `${import.meta.env.BASE_URL}favicon.svg`;
const { isDark, toggle } = useColorMode();
const { currentShades, secondaryShades } = useThemeStore();

// The whole site is themed by the color being designed, so expose the shades as CSS variables
const themeStyle = document.createElement('style');
themeStyle.id = 'theme-vars';
document.head.appendChild(themeStyle);
onBeforeUnmount(() => themeStyle.remove());

watchEffect(() => {
  const toVars = (prefix: string, shades: Record<string, string>) =>
    Object.entries(shades)
      .map(([k, v]) => `  --color-theme-${prefix}${k}: ${v};`)
      .join('\n');
  themeStyle.textContent = `:root {\n${toVars('', currentShades.value)}\n${toVars('secondary-', secondaryShades.value ?? {})}\n}`;
});

const isStudio = computed(() => route.path === '/studio');

const navItems = computed(() => [
  { label: 'Home', icon: 'i-lucide-house', to: '/', active: route.path === '/' },
  { label: 'Studio', icon: 'i-lucide-sliders-horizontal', to: '/studio', active: isStudio.value },
  { label: 'Docs', icon: 'i-lucide-book-open', to: '/docs', active: route.path === '/docs' }
]);
</script>
