<script lang="ts" setup>
const props = defineProps<{
  message: string;
}>()

function onClick(e: Event) {
  parent.postMessage({ pluginMessage: { type: props.message, count: 6 } }, '*')
}
</script>

<template>
  <button
    @click="onClick($event)"
  >
    <slot></slot>
  </button>
</template>