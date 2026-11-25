<template>
  <section class="overflow-hidden rounded-2xl border border-default bg-default shadow-sm">
    <header
      class="flex items-center justify-between gap-3 border-b border-default bg-muted px-4 py-2.5"
    >
      <h3 class="text-sm font-semibold text-highlighted">{{ title }}</h3>
      <code class="rounded-md bg-elevated px-1.5 py-0.5 font-mono text-[0.65rem] text-muted">{{
        tag
      }}</code>
    </header>
    <div class="space-y-4 p-4">
      <slot />
    </div>
  </section>
</template>

<script setup lang="ts">
defineProps<{ title: string; tag: string }>();
</script>
