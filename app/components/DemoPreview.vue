<template>
  <div class="h-full">
    <!-- Component Showcase -->
    <div class="rounded-xl border border-default shadow-lg bg-default h-full flex flex-col">
      <div class="overflow-y-auto flex-1 p-6 space-y-8">
        <!-- Live Preview Alert -->
        <UAlert
          icon="i-lucide-palette"
          color="primary"
          variant="subtle"
          title="Live Theme Preview"
          description="All components below update in real-time as you adjust the theme color."
        />

        <!-- Full Shade Palette Section -->
        <section class="space-y-4">
          <div class="border-b border-default pb-2">
            <h3 class="text-lg font-bold text-primary">Color Palette</h3>
          </div>

          <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
            <div
              v-for="shade in shadeList"
              :key="shade.key"
              class="group relative overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-all"
            >
              <div class="aspect-square" :style="{ backgroundColor: shade.hex }"></div>
              <div class="p-2 bg-default">
                <p class="text-xs font-semibold text-primary">{{ shade.key }}</p>
                <p class="text-xs font-mono text-muted">{{ shade.hex }}</p>
              </div>
            </div>
          </div>
        </section>

        <!-- Typography & Text Section -->
        <section class="space-y-4">
          <div class="border-b border-default pb-2">
            <h3 class="text-lg font-bold text-primary">Typography & Text</h3>
          </div>
          <div class="space-y-3">
            <div>
              <h1 class="text-3xl font-bold text-default">Heading Level 1</h1>
              <h2 class="text-2xl font-semibold text-primary mt-2">Heading Level 2</h2>
              <h3 class="text-xl font-medium text-default mt-2">Heading Level 3</h3>
            </div>
            <p class="text-base text-default">
              This is regular body text. The theme colors affect how text appears throughout your
              application.
              <a href="#" class="text-primary hover:text-theme-600 underline">This is a link</a>
              that uses the theme color.
            </p>
            <p class="text-sm text-muted">
              This is muted text, perfect for descriptions and secondary information.
            </p>
            <div class="bg-default-100 p-3 rounded-lg border border-default">
              <code class="text-xs text-primary font-mono">const theme = 'primary';</code>
            </div>
          </div>
        </section>

        <!-- Buttons & Actions Section -->
        <section class="space-y-4">
          <div class="border-b border-default pb-2">
            <h3 class="text-lg font-bold text-primary">Buttons & Actions</h3>
          </div>
          <div class="space-y-4">
            <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
              <UButton color="primary" variant="solid" size="md" block>Solid</UButton>
              <UButton color="primary" variant="outline" size="md" block>Outline</UButton>
              <UButton color="primary" variant="soft" size="md" block>Soft</UButton>
              <UButton color="primary" variant="ghost" size="md" block>Ghost</UButton>
            </div>
            <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
              <UButton icon="i-lucide-download" color="primary" size="md" block>With Icon</UButton>
              <UButton icon="i-lucide-settings" color="primary" variant="outline" size="md" block
                >Settings</UButton
              >
              <UButton icon="i-lucide-plus" color="primary" size="md" block>Add</UButton>
              <UButton icon="i-lucide-heart" color="primary" variant="soft" size="md" block
                >Favorite</UButton
              >
            </div>
            <div class="grid grid-cols-2 md:grid-cols-4 gap-3 items-center">
              <UButton color="primary" size="xs" block>Extra Small</UButton>
              <UButton color="primary" size="sm" block>Small</UButton>
              <UButton color="primary" size="md" block>Medium</UButton>
              <UButton color="primary" size="lg" block>Large</UButton>
            </div>
          </div>
        </section>

        <!-- Cards & Containers Section -->
        <section class="space-y-4">
          <div class="border-b border-default pb-2">
            <h3 class="text-lg font-bold text-primary">Cards & Images</h3>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <!-- Card 1: Simple with bottom border -->
            <div
              class="rounded-lg border border-default shadow-lg overflow-hidden bg-default flex flex-col h-full"
            >
              <div class="relative h-48">
                <img
                  src="https://picsum.photos/seed/landscape1/400/300"
                  alt="Mountain landscape"
                  class="w-full h-full object-cover"
                />
              </div>
              <div class="border-t-4 border-theme-500"></div>
              <div class="p-4 flex-1 flex flex-col">
                <h4 class="font-semibold text-default mb-2">Border Accent Card</h4>
                <p class="text-sm text-muted flex-1">Simple design with theme-colored top border</p>
                <UButton color="primary" variant="solid" size="sm" class="mt-3">View More</UButton>
              </div>
            </div>

            <!-- Card 2: Badge overlay -->
            <div
              class="rounded-lg border border-default shadow-lg overflow-hidden bg-default flex flex-col h-full"
            >
              <div class="relative h-48">
                <img
                  src="https://picsum.photos/seed/landscape2/400/300"
                  alt="Featured content"
                  class="w-full h-full object-cover"
                />
                <div class="absolute top-3 right-3">
                  <UBadge label="New" color="primary" variant="solid" size="lg" />
                </div>
              </div>
              <div class="p-4 flex-1 flex flex-col">
                <h4 class="font-semibold text-default mb-2">Badge Overlay Card</h4>
                <p class="text-sm text-muted flex-1">Featured content with theme badge overlay</p>
                <UButton color="primary" variant="outline" size="sm" class="mt-3"
                  >Learn More</UButton
                >
              </div>
            </div>

            <!-- Card 3: Colored overlay -->
            <div
              class="rounded-lg border border-default shadow-lg overflow-hidden bg-default flex flex-col h-full"
            >
              <div class="relative h-48">
                <img
                  src="https://picsum.photos/seed/landscape3/400/300"
                  alt="Interactive card"
                  class="w-full h-full object-cover"
                />
                <div class="absolute inset-0 bg-primary/60 flex items-center justify-center">
                  <div class="text-center">
                    <UIcon name="i-lucide-image" class="size-12 text-white" />
                  </div>
                </div>
              </div>
              <div class="p-4 flex-1 flex flex-col">
                <h4 class="font-semibold text-default mb-2">Overlay Card</h4>
                <p class="text-sm text-muted flex-1">Persistent theme color overlay effect</p>
                <UButton color="primary" variant="soft" size="sm" class="mt-3">View More</UButton>
              </div>
            </div>
          </div>
        </section>

        <!-- Cards & Badges Section -->
        <section class="space-y-4">
          <div class="border-b border-default pb-2">
            <h3 class="text-lg font-bold text-primary">Cards & Badges</h3>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <UCard>
              <div class="flex items-center justify-between">
                <div class="flex items-center gap-3">
                  <div
                    class="w-16 h-16 rounded-xl bg-primary/10 border-2 border-primary flex items-center justify-center"
                  >
                    <UIcon name="i-lucide-zap" class="size-8 text-primary" />
                  </div>
                  <div>
                    <p class="text-base font-semibold text-primary">Theme Color in Action</p>
                    <p class="text-sm text-muted">Icon background, border, and text</p>
                  </div>
                </div>
                <div class="flex gap-2">
                  <UBadge label="Active" color="primary" variant="solid" />
                  <UBadge label="Live" color="success" variant="soft" />
                </div>
              </div>

              <template #footer>
                <div class="flex gap-2">
                  <UButton color="primary" variant="soft" size="xs" icon="i-lucide-eye"
                    >View</UButton
                  >
                  <UButton color="primary" variant="outline" size="xs" icon="i-lucide-settings"
                    >Configure</UButton
                  >
                </div>
              </template>
            </UCard>

            <UCard>
              <template #header>
                <h4 class="font-medium text-default">Color Chips</h4>
              </template>

              <div class="flex flex-wrap gap-2">
                <UChip color="primary" :text="5">
                  <UButton icon="i-lucide-bell" color="primary" variant="soft" size="sm" />
                </UChip>
                <UChip color="primary" :text="12">
                  <UButton icon="i-lucide-mail" color="primary" variant="soft" size="sm" />
                </UChip>
                <UChip color="success" :text="3">
                  <UButton icon="i-lucide-check" color="success" variant="soft" size="sm" />
                </UChip>
                <UChip color="primary">
                  <UButton icon="i-lucide-star" color="primary" variant="soft" size="sm" />
                </UChip>
              </div>

              <template #footer>
                <p class="text-xs text-muted">Notification badges with theme colors</p>
              </template>
            </UCard>
          </div>
        </section>

        <!-- Badges, Alerts & Progress Section -->
        <section class="space-y-4">
          <div class="border-b border-default pb-2">
            <h3 class="text-lg font-bold text-primary">Badges, Alerts & Progress</h3>
          </div>

          <div class="flex flex-wrap gap-2">
            <UBadge label="Solid Primary" color="primary" variant="solid" />
            <UBadge label="Soft Primary" color="primary" variant="soft" />
            <UBadge label="Outline Primary" color="primary" variant="outline" />
            <UBadge label="Subtle Primary" color="primary" variant="subtle" />
            <UBadge label="Success" color="success" variant="soft" />
            <UBadge label="Warning" color="warning" variant="soft" />
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <UAlert
              icon="i-lucide-info"
              color="primary"
              variant="subtle"
              title="Theme Color Alert"
              description="This alert uses your primary theme color for the icon and accents."
            />
            <UAlert
              icon="i-lucide-check-circle"
              color="success"
              variant="subtle"
              title="Success Alert"
              description="Success states complement your theme color nicely."
            />
          </div>

          <UCard>
            <template #header>
              <div class="flex items-center justify-between">
                <span class="text-sm font-medium text-primary">Theme Color Progress</span>
                <span class="text-xs font-semibold text-primary">{{ progressValue }}%</span>
              </div>
            </template>

            <UProgress v-model="progressValue" color="primary" size="lg" />

            <template #footer>
              <div class="grid grid-cols-3 gap-2">
                <UProgress :model-value="45" color="primary" size="sm" />
                <UProgress :model-value="78" color="primary" size="sm" />
                <UProgress :model-value="92" color="primary" size="sm" />
              </div>
            </template>
          </UCard>

          <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
            <UCard class="text-center">
              <div class="w-16 h-16 rounded-full bg-primary mx-auto"></div>
              <template #footer>
                <p class="text-xs font-medium text-primary text-center">Primary (500)</p>
              </template>
            </UCard>
            <UCard class="text-center">
              <div class="w-16 h-16 rounded-full mx-auto bg-theme-300"></div>
              <template #footer>
                <p class="text-xs font-medium text-muted text-center">Light (300)</p>
              </template>
            </UCard>
            <UCard class="text-center">
              <div class="w-16 h-16 rounded-full mx-auto bg-theme-700"></div>
              <template #footer>
                <p class="text-xs font-medium text-muted text-center">Dark (700)</p>
              </template>
            </UCard>
            <UCard class="text-center">
              <div
                class="w-16 h-16 rounded-full mx-auto border-2 bg-theme-50 border-theme-500"
              ></div>
              <template #footer>
                <p class="text-xs font-medium text-muted text-center">Subtle (50)</p>
              </template>
            </UCard>
          </div>
        </section>

        <!-- Gradients & Shades Section -->
        <section class="space-y-4">
          <div class="border-b border-default pb-2">
            <h3 class="text-lg font-bold text-primary">Gradients & Shades</h3>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div
              class="h-32 rounded-lg shadow-lg flex items-center justify-center bg-linear-to-br from-theme-400 to-theme-800"
            >
              <p class="text-white font-semibold text-sm">400 → 800</p>
            </div>
            <div
              class="h-32 rounded-lg shadow-lg flex items-center justify-center bg-linear-to-br from-theme-300 to-theme-700"
            >
              <p class="text-white font-semibold text-sm">300 → 700</p>
            </div>
            <div
              class="h-32 rounded-lg shadow-lg flex items-center justify-center bg-linear-to-br from-theme-200 to-theme-600"
            >
              <p class="text-theme-900 font-semibold text-sm">200 → 600</p>
            </div>
          </div>

          <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
            <UButton color="primary" variant="solid" size="md" block class="bg-theme-500!">
              Shade 500
            </UButton>
            <UButton color="primary" variant="solid" size="md" block class="bg-theme-600!">
              Shade 600
            </UButton>
            <UButton color="primary" variant="solid" size="md" block class="bg-theme-700!">
              Shade 700
            </UButton>
            <UButton color="primary" variant="solid" size="md" block class="bg-theme-800!">
              Shade 800
            </UButton>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const { currentShades } = useThemeStore();

// Inject CSS custom properties into document head
useHead(
  computed(() => ({
    style: [
      {
        innerHTML: `:root {
${Object.entries(currentShades.value)
  .map(([k, v]) => `  --color-theme-${k}: ${v};`)
  .join('\n')}
}`,
        id: 'theme-vars'
      }
    ]
  }))
);

// Progress bar animation
const progressValue = ref(67);

// Shade palette for display
const SHADE_KEYS = ['50', '100', '200', '300', '400', '500', '600', '700', '800', '900', '950'];

const shadeList = computed(() =>
  SHADE_KEYS.map(key => ({
    key,
    hex: currentShades.value[key] ?? '#000000'
  }))
);
</script>
