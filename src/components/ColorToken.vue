<script lang="ts" setup>
import type { Color } from '@client/figma'

const props = defineProps<{
  /** */
  color: Color;
}>()

const bg = $computed(() =>  {
  if (!props.color.color) return 'black'
  const { r, g, b } = props.color.color
  return `rgb(${r},${g},${b})`
})
</script>

<template>
  <div class="color-token">
    <span 
      class="color-token__sample" 
      :style="{ 'background-color': bg }"></span>
    <span>{{ color.name }}</span>
  </div>
</template>

<style lang="scss">
  .color-token {
    display: grid;
    grid-template-columns: max-content 1fr;
    vertical-align: middle;
    column-gap: 10px;

    &__sample {
      background-color: black;
      width: 20px;
    }
  }
</style>