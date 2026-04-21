<template>
  <ClientOnly>
    <div class="docs-content" v-html="renderedHtml" />
  </ClientOnly>
</template>

<script setup lang="ts">
import { Marked } from 'marked';
import { markedHighlight } from 'marked-highlight';
import hljs from 'highlight.js';

import quickStart from '~/assets/docs/quick-start.md?raw';
import htmlIntegration from '~/assets/docs/html-integration.md?raw';
import cssVariables from '~/assets/docs/css-variables.md?raw';
import jsApi from '~/assets/docs/js-api.md?raw';
import examples from '~/assets/docs/examples.md?raw';
import typescriptTailwind from '~/assets/docs/typescript-tailwind.md?raw';

// Use a local Marked instance (not the global singleton) to avoid SSR/module reuse issues
const markedInstance = new Marked(
  markedHighlight({
    langPrefix: 'hljs language-',
    highlight(code, lang) {
      const language = hljs.getLanguage(lang) ? lang : 'plaintext';
      return hljs.highlight(code, { language }).value;
    }
  })
);

const sections = [quickStart, htmlIntegration, cssVariables, jsApi, examples, typescriptTailwind];
const renderedHtml = computed(() => sections.map(md => markedInstance.parse(md)).join(''));
</script>
