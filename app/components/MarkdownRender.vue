<script setup>
import { marked } from 'marked'

const props = defineProps({
  text: {
    type: String,
    default: ''
  }
})

const html = computed(() => marked.parse(props.text))
</script>

<template>
  <div class="markdown-content" v-html="html"></div>
</template>

<style scoped>
.markdown-content {
  color: #d1d5db;
  font-size: 15px;
  line-height: 1.75;
}

/* Paragraphs */
.markdown-content :deep(p) {
  margin: 0 0 1.25rem;
}

.markdown-content :deep(p:last-child) {
  margin-bottom: 0;
}

/* Bold text */
.markdown-content :deep(strong) {
  color: #f3f4f6;
  font-weight: 600;
}

/* Italic text */
.markdown-content :deep(em) {
  color: #e5e7eb;
}

/* Headings */
.markdown-content :deep(h1) {
  color: #f9fafb;
  font-size: 1.75rem;
  font-weight: 700;
  line-height: 1.3;
  margin: 0 0 1.25rem;
}

.markdown-content :deep(h2) {
  color: #f9fafb;
  font-size: 1.4rem;
  font-weight: 700;
  line-height: 1.35;
  margin: 2rem 0 1rem;
}

.markdown-content :deep(h3) {
  color: #f3f4f6;
  font-size: 1.15rem;
  font-weight: 600;
  line-height: 1.4;
  margin: 1.5rem 0 0.75rem;
}

/* Lists */
.markdown-content :deep(ul),
.markdown-content :deep(ol) {
  margin: 0 0 1.25rem;
  padding-left: 1.5rem;
}

.markdown-content :deep(li) {
  margin-bottom: 0.4rem;
  padding-left: 0.25rem;
}

/* Links */
.markdown-content :deep(a) {
  color: #60a5fa;
  text-decoration: none;
}

.markdown-content :deep(a:hover) {
  text-decoration: underline;
}

/* Quotes */
.markdown-content :deep(blockquote) {
  border-left: 3px solid #4b5563;
  color: #9ca3af;
  margin: 1.5rem 0;
  padding-left: 1rem;
}

/* Horizontal rule */
.markdown-content :deep(hr) {
  border: 0;
  border-top: 1px solid #374151;
  margin: 2rem 0;
}

/* Inline code */
.markdown-content :deep(code) {
  background: #1f2937;
  border-radius: 4px;
  color: #e5e7eb;
  font-size: 0.9em;
  padding: 0.15rem 0.35rem;
}

/* Code blocks */
.markdown-content :deep(pre) {
  background: #111827;
  border-radius: 8px;
  margin: 1.5rem 0;
  overflow-x: auto;
  padding: 1rem;
}

.markdown-content :deep(pre code) {
  background: none;
  padding: 0;
}
</style>
