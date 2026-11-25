<template>
  <div class="overflow-x-clip">
    <!-- Hero -->
    <section class="relative">
      <div
        class="dot-grid pointer-events-none absolute inset-0 opacity-50 mask-[linear-gradient(to_bottom,black,transparent_85%)]"
      />
      <div class="relative mx-auto max-w-5xl px-6 pb-10 pt-20 text-center md:pt-28">
        <span
          class="fade-up inline-flex items-center gap-2 rounded-full border border-default bg-(--ui-bg)/70 px-3.5 py-1.5 text-xs font-medium text-muted backdrop-blur"
        >
          <span class="size-2 rounded-full bg-primary" />
          Free &amp; open source · OKLCH color science
        </span>

        <h1
          class="fade-up mt-6 text-5xl font-bold leading-[1.05] tracking-tight text-highlighted sm:text-6xl md:text-7xl"
          style="animation-delay: 60ms"
        >
          Design color themes
          <br />
          that feel <span class="text-gradient">effortless.</span>
        </h1>

        <p
          class="fade-up mx-auto mt-6 max-w-2xl text-lg text-muted md:text-xl"
          style="animation-delay: 120ms"
        >
          Pick one color. Get a perfectly balanced 11-step palette, a live preview of real UI, and
          production-ready CSS, JS and TypeScript files.
        </p>

        <div
          class="fade-up mt-9 flex flex-wrap items-center justify-center gap-3"
          style="animation-delay: 180ms"
        >
          <NoofpiLink
            to="/studio"
            class="brand-tile inline-flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5"
          >
            Open the Studio
            <NIcon name="i-lucide-arrow-right" class="size-4" />
          </NoofpiLink>
          <NoofpiLink
            to="/docs"
            class="inline-flex items-center gap-2 rounded-xl border border-default bg-(--ui-bg)/70 px-6 py-3 text-sm font-semibold text-highlighted backdrop-blur transition-colors hover:bg-elevated"
          >
            <NIcon name="i-lucide-book-open" class="size-4" />
            Read the docs
          </NoofpiLink>
        </div>

        <!-- Presets re-tint the whole page -->
        <div
          class="fade-up mt-10 flex flex-wrap items-center justify-center gap-3"
          style="animation-delay: 240ms"
        >
          <span class="text-sm text-muted">Try a color</span>
          <button
            v-for="preset in presets"
            :key="preset.hex"
            type="button"
            :aria-label="`Use ${preset.name}`"
            :title="preset.name"
            class="size-8 rounded-full ring-2 ring-offset-2 ring-offset-(--ui-bg) transition-transform hover:scale-110"
            :class="currentColor.toLowerCase() === preset.hex ? 'ring-primary' : 'ring-transparent'"
            :style="{ backgroundColor: preset.hex }"
            @click="setColor(preset.hex)"
          />
        </div>
      </div>

      <!-- Product mock -->
      <div class="relative mx-auto max-w-5xl px-6 pb-20">
        <div class="studio-frame fade-up overflow-hidden" style="animation-delay: 300ms">
          <div class="studio-toolbar">
            <div class="flex items-center gap-1.5">
              <span class="size-3 rounded-full bg-[#ff5f57]" />
              <span class="size-3 rounded-full bg-[#febc2e]" />
              <span class="size-3 rounded-full bg-[#28c840]" />
            </div>
            <div
              class="mx-auto flex w-full max-w-xs items-center gap-2 rounded-lg border border-default bg-default px-3 py-1 text-xs text-muted"
            >
              <NIcon name="i-lucide-lock" class="size-3.5" />
              <span class="font-mono">your-app.com</span>
              <span class="ml-auto font-mono uppercase text-highlighted">{{ currentColor }}</span>
            </div>
          </div>

          <div class="grid gap-6 p-6 md:grid-cols-5 md:p-8">
            <div class="space-y-4 md:col-span-3">
              <p class="panel-title">Generated palette</p>
              <div class="flex h-44 overflow-hidden rounded-2xl ring-1 ring-black/10 shadow-lg">
                <button
                  v-for="shade in shades"
                  :key="shade.key"
                  type="button"
                  class="group relative flex-1 transition-all hover:flex-[1.6]"
                  :style="{ backgroundColor: shade.hex }"
                  :aria-label="`Shade ${shade.key} ${shade.hex}`"
                >
                  <span
                    class="absolute inset-x-0 bottom-2 text-center text-[0.65rem] font-semibold opacity-0 transition-opacity group-hover:opacity-100"
                    :style="{ color: shade.text }"
                    >{{ shade.key }}</span
                  >
                </button>
              </div>
              <div class="flex flex-wrap gap-3">
                <span class="rounded-lg bg-theme-600 px-3 py-1.5 font-mono text-xs text-white"
                  >--color-theme-600</span
                >
                <span class="rounded-lg bg-theme-100 px-3 py-1.5 font-mono text-xs text-theme-800"
                  >--color-theme-100</span
                >
                <span class="rounded-lg bg-theme-950 px-3 py-1.5 font-mono text-xs text-theme-100"
                  >--color-theme-950</span
                >
              </div>
            </div>

            <div
              class="space-y-4 rounded-2xl border border-default bg-muted p-5 md:col-span-2 shadow-sm"
            >
              <div class="flex items-center justify-between">
                <p class="font-semibold text-highlighted">Live UI</p>
                <span
                  class="rounded-full bg-theme-500/15 px-2.5 py-0.5 text-xs font-medium text-theme-600 dark:text-theme-300"
                  >Active</span
                >
              </div>
              <p class="text-sm text-muted">
                Every component follows your palette the moment you change it.
              </p>
              <div class="h-2 overflow-hidden rounded-full bg-theme-500/15">
                <div class="h-full w-2/3 rounded-full bg-theme-500" />
              </div>
              <div class="flex gap-2">
                <span
                  class="flex-1 rounded-lg bg-theme-500 py-2 text-center text-sm font-semibold text-white"
                  >Primary</span
                >
                <span
                  class="flex-1 rounded-lg border border-theme-500/40 py-2 text-center text-sm font-semibold text-theme-600 dark:text-theme-300"
                  >Outline</span
                >
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Features -->
    <section class="mx-auto max-w-6xl px-6 py-20">
      <div class="mx-auto max-w-2xl text-center">
        <p class="text-sm font-semibold uppercase tracking-widest text-primary">Features</p>
        <h2 class="mt-3 text-3xl font-bold tracking-tight text-highlighted md:text-4xl">
          Everything a theme needs, nothing it doesn't
        </h2>
      </div>

      <div class="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <article
          v-for="feature in features"
          :key="feature.title"
          class="group rounded-2xl border border-default bg-default p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl"
        >
          <span class="brand-tile grid size-11 place-items-center rounded-xl text-white">
            <NIcon :name="feature.icon" class="size-5" />
          </span>
          <h3 class="mt-5 text-lg font-semibold text-highlighted">{{ feature.title }}</h3>
          <p class="mt-2 text-sm leading-relaxed text-muted">{{ feature.text }}</p>
        </article>
      </div>
    </section>

    <!-- How it works -->
    <section class="border-y border-default bg-(--ui-bg-muted)/60">
      <div class="mx-auto max-w-6xl px-6 py-20">
        <div class="mx-auto max-w-2xl text-center">
          <p class="text-sm font-semibold uppercase tracking-widest text-primary">How it works</p>
          <h2 class="mt-3 text-3xl font-bold tracking-tight text-highlighted md:text-4xl">
            From one color to a shipped theme in three steps
          </h2>
        </div>

        <ol class="mt-12 grid gap-6 md:grid-cols-3">
          <li
            v-for="(step, i) in steps"
            :key="step.title"
            class="relative rounded-2xl border border-default bg-default p-6"
          >
            <span class="text-gradient text-5xl font-bold">0{{ i + 1 }}</span>
            <h3 class="mt-3 text-lg font-semibold text-highlighted">{{ step.title }}</h3>
            <p class="mt-2 text-sm leading-relaxed text-muted">{{ step.text }}</p>
          </li>
        </ol>
      </div>
    </section>

    <!-- Call to action -->
    <section class="mx-auto max-w-6xl px-6 py-20">
      <div
        class="relative overflow-hidden rounded-3xl px-8 py-14 text-center text-white md:py-20"
        style="
          background-image: linear-gradient(
            120deg,
            var(--color-theme-800),
            var(--color-theme-600) 55%,
            var(--color-theme-400)
          );
        "
      >
        <div
          class="pointer-events-none absolute -left-20 -top-20 size-72 rounded-full bg-white/15 blur-3xl"
        />
        <h2 class="relative text-3xl font-bold tracking-tight md:text-5xl">
          Your next theme starts here.
        </h2>
        <p class="relative mx-auto mt-4 max-w-xl text-white/80">
          No sign-up, no install. Build it in the browser and download it in seconds.
        </p>
        <NoofpiLink
          to="/studio"
          class="relative mt-8 inline-flex items-center gap-2 rounded-xl bg-white px-7 py-3 text-sm font-semibold text-slate-900 shadow-xl transition-transform hover:-translate-y-0.5"
        >
          Launch the Studio
          <NIcon name="i-lucide-arrow-right" class="size-4" />
        </NoofpiLink>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
const { currentColor, currentShades, setColor } = useThemeStore();

const presets = [
  { name: 'Ocean', hex: '#3b82f6' },
  { name: 'Violet', hex: '#8b5cf6' },
  { name: 'Rose', hex: '#f43f5e' },
  { name: 'Amber', hex: '#f59e0b' },
  { name: 'Emerald', hex: '#10b981' },
  { name: 'Teal', hex: '#14b8a6' },
  { name: 'Fuchsia', hex: '#d946ef' }
];

const SHADE_KEYS = ['50', '100', '200', '300', '400', '500', '600', '700', '800', '900', '950'];

// Dark text on light shades and light text on dark ones
function textFor(hex: string) {
  const h = hex.replace('#', '');
  const [r, g, b] = [0, 2, 4].map(i => parseInt(h.slice(i, i + 2), 16) / 255);
  return 0.2126 * r! + 0.7152 * g! + 0.0722 * b! > 0.5 ? '#1a1a1a' : '#f5f5f5';
}

const shades = computed(() =>
  SHADE_KEYS.map(key => {
    const hex = currentShades.value[key] ?? '#000000';
    return { key, hex, text: textFor(hex) };
  })
);

const features = [
  {
    icon: 'i-lucide-swatch-book',
    title: 'OKLCH shade palettes',
    text: 'Perceptually even 50–950 scales generated from a single color, so every step feels balanced.'
  },
  {
    icon: 'i-lucide-eye',
    title: 'Live component preview',
    text: 'See buttons, cards, alerts and gradients update in real time before you export anything.'
  },
  {
    icon: 'i-lucide-blend',
    title: 'Secondary colors',
    text: 'Derive a harmonious secondary automatically with a hue shift, or pick your own manually.'
  },
  {
    icon: 'i-lucide-package',
    title: 'One-click export',
    text: 'Download theme.css, theme.js and theme.d.ts in a single ZIP, ready to drop into your project.'
  },
  {
    icon: 'i-lucide-wind',
    title: 'Tailwind v4 & Nuxt UI',
    text: 'Optional @theme output and Nuxt UI variables so your palette plugs straight into your stack.'
  },
  {
    icon: 'i-lucide-repeat',
    title: 'Runtime switching',
    text: 'Switch between saved themes at runtime with localStorage persistence and change events.'
  }
];

const steps = [
  {
    title: 'Pick a color',
    text: 'Use the color picker or paste a hex value. The full palette is generated instantly.'
  },
  {
    title: 'Preview & refine',
    text: 'Check real UI components, add a secondary color and save as many named themes as you like.'
  },
  {
    title: 'Export & ship',
    text: 'Download the ZIP, include the files in your app, and switch themes with a single call.'
  }
];
</script>
