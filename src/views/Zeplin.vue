<script lang="ts" setup>
import { useZeplinStore } from '~ui/store';
const store = useZeplinStore()

const colors = $computed(() => store.colors)
</script>

<template>
  <h2>Zeplin</h2>
  <div 
    v-for="(color, colorName) in colors"
    :key="colorName"
  >{{ colorName }}: {{ color?.value }}</div>
</template>

<style lang="scss">

</style>
