<template>
  <div class="h-full">
    <div class="studio-frame h-full flex flex-col overflow-hidden">
      <!-- Window chrome -->
      <div class="studio-toolbar">
        <div class="hidden sm:flex items-center gap-1.5">
          <span class="size-3 rounded-full bg-[#ff5f57]" />
          <span class="size-3 rounded-full bg-[#febc2e]" />
          <span class="size-3 rounded-full bg-[#28c840]" />
        </div>
        <div
          class="hidden md:flex flex-1 max-w-sm items-center gap-2 rounded-lg border border-default bg-default px-3 py-1.5 text-xs text-muted"
        >
          <NIcon name="i-lucide-blocks" class="size-3.5" />
          <span class="font-mono truncate">components</span>
          <span class="ml-auto flex items-center gap-1.5 font-mono uppercase text-highlighted">
            <span class="size-2.5 rounded-full bg-theme-500" />
            {{ currentColor }}
          </span>
        </div>
        <div class="ml-auto flex items-center gap-3">
          <span v-if="!secondaryShades" class="hidden xl:block text-xs text-muted">
            Set a secondary color to preview it.
          </span>
          <NTabs v-model="previewChoice" :items="previewItems" variant="pill" class="w-auto" />
        </div>
      </div>

      <div class="overflow-y-auto flex-1 p-5 sm:p-8 space-y-8">
        <!-- Hero: live gradient built from the current theme -->
        <div
          class="fade-up relative overflow-hidden rounded-2xl p-6 sm:p-8 text-white"
          style="
            background-image: linear-gradient(
              120deg,
              var(--color-theme-700),
              var(--color-theme-500) 60%,
              var(--color-theme-400)
            );
          "
        >
          <div
            class="pointer-events-none absolute -right-16 -top-16 size-64 rounded-full bg-white/15 blur-3xl"
          />
          <div class="relative flex flex-wrap items-center justify-between gap-6">
            <div class="max-w-xl space-y-2">
              <span
                class="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1 text-xs font-medium ring-1 ring-white/25 backdrop-blur"
              >
                <NIcon name="i-lucide-sparkles" class="size-3.5" />
                Live Theme Preview
              </span>
              <h2 class="text-2xl sm:text-3xl font-bold tracking-tight">
                Design your palette. See it everywhere.
              </h2>
              <p class="text-sm sm:text-base text-white/80">
                Every component below updates in real time as you adjust the theme color.
              </p>
            </div>
            <div class="flex overflow-hidden rounded-xl ring-1 ring-white/30 shadow-lg">
              <div
                v-for="shade in shadeList"
                :key="shade.key"
                class="h-12 w-4 sm:w-5"
                :style="{ backgroundColor: shade.hex }"
              />
            </div>
          </div>
        </div>

        <!-- Palette ramps -->
        <div class="space-y-3">
          <div v-for="ramp in ramps" :key="ramp.label" class="space-y-2">
            <p class="panel-title">{{ ramp.label }}</p>
            <div class="flex overflow-hidden rounded-2xl ring-1 ring-black/10 shadow-md">
              <div
                v-for="shade in ramp.shades"
                :key="shade.key"
                class="flex-1 px-1 pb-2 pt-10 text-center transition-all hover:flex-[1.5]"
                :style="{ backgroundColor: shade.hex, color: shade.text }"
              >
                <p class="text-[0.7rem] font-semibold">{{ shade.key }}</p>
                <p class="hidden text-[0.6rem] font-mono opacity-80 xl:block">{{ shade.hex }}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Category filter -->
        <div class="flex flex-wrap gap-2">
          <button
            v-for="cat in categories"
            :key="cat.value"
            type="button"
            class="flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-sm font-medium transition-all"
            :class="
              category === cat.value
                ? 'border-transparent bg-theme-500 text-white shadow-md'
                : 'border-default bg-default text-muted hover:text-highlighted'
            "
            @click="category = cat.value"
          >
            <NIcon :name="cat.icon" class="size-4" />
            {{ cat.label }}
          </button>
        </div>

        <!-- Components, rendered once per previewed color -->
        <div :class="previewMode === 'both' ? 'grid grid-cols-1 2xl:grid-cols-2 gap-8' : ''">
          <div
            v-for="variant in variants"
            :key="variant"
            class="@container min-w-0 space-y-4"
            :class="{ theme: variant === 'secondary' }"
            :style="variant === 'secondary' ? secondaryScope : undefined"
          >
            <div v-if="previewMode === 'both'" class="flex items-center gap-2">
              <span class="size-3 rounded-full bg-primary" />
              <span class="text-sm font-semibold text-highlighted capitalize">{{ variant }}</span>
            </div>

            <div class="grid items-start gap-4 @2xl:grid-cols-2 @6xl:grid-cols-3">
              <!-- Actions -->
              <GalleryCard v-if="show('actions')" title="Buttons" tag="NButton">
                <div class="grid grid-cols-2 gap-2">
                  <NButton color="primary" variant="solid" block>Solid</NButton>
                  <NButton color="primary" variant="outline" block>Outline</NButton>
                  <NButton color="primary" variant="soft" block>Soft</NButton>
                  <NButton color="primary" variant="ghost" block>Ghost</NButton>
                </div>
                <div class="flex flex-wrap items-center gap-2">
                  <NButton color="primary" size="xs">XS</NButton>
                  <NButton color="primary" size="sm">Small</NButton>
                  <NButton color="primary" size="md">Medium</NButton>
                  <NButton color="primary" size="lg">Large</NButton>
                </div>
                <div class="flex flex-wrap gap-2">
                  <NButton icon="i-lucide-download" color="primary">Download</NButton>
                  <NButton icon="i-lucide-settings" color="primary" variant="outline"
                    >Settings</NButton
                  >
                  <NButton color="primary" disabled>Disabled</NButton>
                </div>
              </GalleryCard>

              <GalleryCard v-if="show('actions')" title="Icon buttons & chips" tag="NChip">
                <div class="flex flex-wrap items-center gap-4">
                  <NChip color="primary" :text="5">
                    <NButton icon="i-lucide-bell" color="primary" variant="soft" />
                  </NChip>
                  <NChip color="primary" :text="12">
                    <NButton icon="i-lucide-mail" color="primary" variant="soft" />
                  </NChip>
                  <NChip color="success" :text="3">
                    <NButton icon="i-lucide-check" color="success" variant="soft" />
                  </NChip>
                  <NButton icon="i-lucide-star" color="primary" />
                  <NButton icon="i-lucide-heart" color="primary" variant="outline" />
                  <NButton icon="i-lucide-share-2" color="primary" variant="ghost" />
                </div>
              </GalleryCard>

              <GalleryCard v-if="show('actions')" title="Status colors" tag="color">
                <div class="grid grid-cols-2 gap-2">
                  <NButton color="primary" variant="soft" block>Primary</NButton>
                  <NButton color="success" variant="soft" block>Success</NButton>
                  <NButton color="warning" variant="soft" block>Warning</NButton>
                  <NButton color="error" variant="soft" block>Error</NButton>
                </div>
              </GalleryCard>

              <!-- Forms -->
              <GalleryCard v-if="show('forms')" title="Text fields" tag="NInput · NSelect">
                <NInput v-model="text" placeholder="Search components…" icon="i-lucide-search" />
                <NInput placeholder="Email address" icon="i-lucide-mail" />
                <NSelect v-model="selected" :items="selectItems" placeholder="Choose a plan" />
              </GalleryCard>

              <GalleryCard v-if="show('forms')" title="Choices" tag="NCheckbox · NRadioGroup">
                <div class="flex flex-col gap-3">
                  <NCheckbox v-model="checkA" label="Email notifications" />
                  <NCheckbox v-model="checkB" label="Weekly digest" />
                </div>
                <NRadioGroup v-model="radio" :items="radioItems" orientation="horizontal" />
                <div class="flex flex-col gap-3">
                  <NSwitch v-model="switchA" label="Dark sidebar" />
                  <NSwitch v-model="switchB" label="Auto-save" />
                </div>
              </GalleryCard>

              <GalleryCard v-if="show('forms')" title="Slider & rating" tag="NSlider · NRating">
                <NSlider v-model="slider" :min="0" :max="100" :step="1" label="Volume" />
                <NRating v-model="rating" color="primary" />
              </GalleryCard>

              <!-- Feedback -->
              <GalleryCard v-if="show('feedback')" title="Alerts" tag="NAlert">
                <NAlert
                  icon="i-lucide-info"
                  color="primary"
                  variant="subtle"
                  title="Heads up"
                  description="This alert uses your primary theme color."
                />
                <NAlert
                  icon="i-lucide-check-circle"
                  color="success"
                  variant="subtle"
                  title="Saved"
                  description="Your changes were applied."
                />
                <NAlert
                  icon="i-lucide-triangle-alert"
                  color="warning"
                  variant="subtle"
                  title="Careful"
                  description="Contrast is a bit low here."
                />
              </GalleryCard>

              <GalleryCard v-if="show('feedback')" title="Badges" tag="NBadge">
                <div class="flex flex-wrap gap-2">
                  <NBadge label="Solid" color="primary" variant="solid" />
                  <NBadge label="Soft" color="primary" variant="soft" />
                  <NBadge label="Outline" color="primary" variant="outline" />
                  <NBadge label="Subtle" color="primary" variant="subtle" />
                  <NBadge label="Success" color="success" variant="soft" />
                  <NBadge label="Warning" color="warning" variant="soft" />
                  <NBadge label="Error" color="error" variant="soft" />
                </div>
              </GalleryCard>

              <GalleryCard v-if="show('feedback')" title="Progress & toast" tag="NProgress">
                <NProgress :value="72" color="primary" size="lg" />
                <div class="grid grid-cols-3 gap-2">
                  <NProgress :value="30" color="primary" size="sm" />
                  <NProgress :value="60" color="primary" size="sm" />
                  <NProgress :value="90" color="primary" size="sm" />
                </div>
                <NButton
                  color="primary"
                  variant="soft"
                  icon="i-lucide-bell-ring"
                  @click="showToast(variant)"
                >
                  Show a toast
                </NButton>
              </GalleryCard>

              <!-- Data -->
              <GalleryCard v-if="show('data')" title="Stats" tag="NStat">
                <div class="grid grid-cols-2 gap-3">
                  <NStat
                    label="Revenue"
                    value="$48.2k"
                    description="+12.5%"
                    icon="i-lucide-wallet"
                  />
                  <NStat label="Users" value="12,480" description="+8.1%" icon="i-lucide-users" />
                </div>
              </GalleryCard>

              <GalleryCard v-if="show('data')" title="Tabs & pagination" tag="NTabs · NPagination">
                <NTabs v-model="tab" :items="tabItems" variant="pill" />
                <NPagination v-model="page" :total="120" :page-size="10" />
              </GalleryCard>

              <GalleryCard v-if="show('data')" title="Avatars" tag="NAvatar">
                <div class="flex items-center gap-3">
                  <NAvatar v-for="a in avatars" :key="a" :text="a" color="primary" />
                </div>
              </GalleryCard>

              <!-- Display -->
              <GalleryCard v-if="show('display')" title="Typography" tag="text">
                <div class="space-y-2">
                  <h4 class="text-2xl font-bold text-highlighted">Heading</h4>
                  <h5 class="text-lg font-semibold text-primary">Accent heading</h5>
                  <p class="text-sm text-default">
                    Body text with a
                    <a href="#" class="text-primary underline" @click.prevent>themed link</a>
                    inside it.
                  </p>
                  <p class="text-sm text-muted">Muted helper text for descriptions.</p>
                  <code class="rounded-md bg-elevated px-2 py-1 font-mono text-xs text-primary"
                    >const theme = 'primary';</code
                  >
                </div>
              </GalleryCard>

              <GalleryCard v-if="show('display')" title="Card" tag="NCard">
                <NCard>
                  <template #header>
                    <div class="flex items-center justify-between">
                      <span class="font-semibold text-highlighted">Theme in action</span>
                      <NBadge label="Live" color="primary" variant="soft" />
                    </div>
                  </template>
                  <p class="text-sm text-muted">Borders, icons and accents follow your color.</p>
                  <template #footer>
                    <div class="flex gap-2">
                      <NButton color="primary" size="sm">View</NButton>
                      <NButton color="neutral" variant="outline" size="sm">Configure</NButton>
                    </div>
                  </template>
                </NCard>
              </GalleryCard>

              <GalleryCard v-if="show('display')" title="Gradients & shades" tag="bg-theme-*">
                <div class="space-y-2">
                  <div
                    class="h-10 rounded-lg bg-linear-to-r from-theme-400 to-theme-800 px-3 text-xs font-medium leading-10 text-white"
                  >
                    400 → 800
                  </div>
                  <div
                    class="h-10 rounded-lg bg-linear-to-r from-theme-200 to-theme-600 px-3 text-xs font-medium leading-10 text-white"
                  >
                    200 → 600
                  </div>
                </div>
                <div class="grid grid-cols-4 gap-2 text-center text-xs font-semibold">
                  <span class="rounded-lg bg-theme-100 py-2 text-theme-800">100</span>
                  <span class="rounded-lg bg-theme-300 py-2 text-theme-900">300</span>
                  <span class="rounded-lg bg-theme-600 py-2 text-white">600</span>
                  <span class="rounded-lg bg-theme-900 py-2 text-theme-100">900</span>
                </div>
              </GalleryCard>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { toast } from 'noofpi-ui';

const { currentColor, currentShades, secondaryShades } = useThemeStore();

const SHADE_KEYS = ['50', '100', '200', '300', '400', '500', '600', '700', '800', '900', '950'];

// Dark text on light shades and light text on dark ones
function textFor(hex: string) {
  const h = hex.replace('#', '');
  const [r, g, b] = [0, 2, 4].map(i => parseInt(h.slice(i, i + 2), 16) / 255);
  return 0.2126 * r! + 0.7152 * g! + 0.0722 * b! > 0.5 ? '#1a1a1a' : '#f5f5f5';
}

function toShadeList(shades: Record<string, string>) {
  return SHADE_KEYS.map(key => {
    const hex = shades[key] ?? '#000000';
    return { key, hex, text: textFor(hex) };
  });
}

const shadeList = computed(() => toShadeList(currentShades.value));

const ramps = computed(() => {
  const list = [{ label: 'Primary', shades: shadeList.value }];
  if (secondaryShades.value) {
    list.push({ label: 'Secondary', shades: toShadeList(secondaryShades.value) });
  }
  return list;
});

type PreviewMode = 'primary' | 'secondary' | 'both';

const previewChoice = ref<PreviewMode>('primary');

const previewItems = computed(() => [
  { label: 'Primary', value: 'primary' },
  { label: 'Secondary', value: 'secondary', disabled: !secondaryShades.value },
  { label: 'Both', value: 'both', disabled: !secondaryShades.value }
]);

// Falls back to primary when the secondary is turned off
const previewMode = computed<PreviewMode>(() =>
  secondaryShades.value ? previewChoice.value : 'primary'
);

const variants = computed(() =>
  previewMode.value === 'both' ? ['primary', 'secondary'] : [previewMode.value]
);

// Re-points the theme color variables at the secondary shades for a subtree (together with the
// `theme` class, which makes noofpi-ui re-resolve its primary shades there), so every component
// inside renders in the secondary color without any per-component changes.
const secondaryScope = computed(() => {
  const scope: Record<string, string> = {};
  for (const key of SHADE_KEYS) {
    scope[`--color-theme-${key}`] = `var(--color-theme-secondary-${key})`;
  }
  return scope;
});

const categories = [
  { value: 'all', label: 'All', icon: 'i-lucide-layout-grid' },
  { value: 'actions', label: 'Actions', icon: 'i-lucide-mouse-pointer-click' },
  { value: 'forms', label: 'Forms', icon: 'i-lucide-text-cursor-input' },
  { value: 'feedback', label: 'Feedback', icon: 'i-lucide-bell' },
  { value: 'data', label: 'Data', icon: 'i-lucide-chart-column' },
  { value: 'display', label: 'Display', icon: 'i-lucide-type' }
];

const category = ref('all');
const show = (name: string) => category.value === 'all' || category.value === name;

// Demo state for the interactive components
const text = ref('');
const selected = ref('pro');
const selectItems = [
  { label: 'Starter', value: 'starter' },
  { label: 'Pro', value: 'pro' },
  { label: 'Enterprise', value: 'enterprise' }
];
const checkA = ref(true);
const checkB = ref(false);
const radio = ref('monthly');
const radioItems = [
  { label: 'Monthly', value: 'monthly' },
  { label: 'Yearly', value: 'yearly' }
];
const switchA = ref(true);
const switchB = ref(false);
const slider = ref(64);
const rating = ref(4);
const tab = ref('overview');
const tabItems = [
  { label: 'Overview', value: 'overview' },
  { label: 'Activity', value: 'activity' },
  { label: 'Settings', value: 'settings' }
];
const page = ref(3);
const avatars = ['AK', 'JL', 'MN', 'TS', '+4'];

// Toasts render outside the secondary scope, so they need noofpi-ui's `secondary` color,
// which reads the exported secondary shades
function showToast(variant: string) {
  toast.add({
    title: 'Theme applied',
    description: 'Toasts use your theme color too.',
    icon: 'i-lucide-check',
    duration: 2500,
    color: variant === 'secondary' ? 'secondary' : 'primary'
  });
}
</script>
