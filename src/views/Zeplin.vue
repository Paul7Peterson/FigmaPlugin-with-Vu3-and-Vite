<script lang="ts" setup>
import { useZeplinStore } from '~ui/store';

const store = useZeplinStore()

const colors = $computed(() => store.colors)
const spacing = $computed(() => store.spacing)
const textStyles = $computed(() => store.textStyles)
</script>

<template>
  <h2>Zeplin</h2>
  <div 
    v-for="(color, colorName) in colors"
    :key="colorName"
  >{{ colorName }}: {{ color }}</div>
  <div 
    v-for="(space, spaceName) in spacing"
    :key="spaceName"
  >{{ spaceName }}: {{ space }}</div>
  <div 
    v-for="(text, textName) in textStyles"
    :key="textName"
  >{{ textName }}: {{ text }}</div>
</template>

<style lang="scss">

</style>
