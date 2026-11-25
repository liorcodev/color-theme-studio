<template>
  <div>
    <section class="relative overflow-hidden border-b border-default">
      <div
        class="dot-grid absolute inset-0 opacity-60 mask-[linear-gradient(to_bottom,black,transparent)]"
      />
      <div class="relative mx-auto w-full max-w-5xl px-4 sm:px-6 lg:px-8 py-14 md:py-20">
        <span
          class="inline-flex items-center gap-1.5 rounded-full border border-default bg-(--ui-bg)/70 px-3 py-1 text-xs font-medium text-muted"
        >
          <NIcon name="i-lucide-book-open" class="size-3.5 text-primary" />
          Documentation
        </span>
        <h1 class="mt-4 text-4xl md:text-5xl font-bold tracking-tight text-highlighted">
          Ship your theme in <span class="text-gradient">minutes</span>
        </h1>
        <p class="mt-4 max-w-2xl text-base md:text-lg text-muted">
          Everything you need to export, install and switch OKLCH-based themes at runtime, with CSS
          variables, a tiny JS API and full TypeScript support.
        </p>
      </div>
    </section>

    <div class="mx-auto w-full max-w-5xl px-4 sm:px-6 lg:px-8 py-10 md:py-14">
      <div class="rounded-2xl border border-default bg-default p-6 sm:p-10 shadow-sm">
        <DocsContent />
      </div>
    </div>
  </div>
</template>
