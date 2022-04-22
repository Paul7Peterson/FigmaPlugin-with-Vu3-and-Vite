<script lang="ts" setup>
import { useComponentsStore } from '@/store';
import { FigmaComponent } from './Components'

const store = useComponentsStore()

const components = $computed(() => store.components)
</script>

<template>
  <h2>Components</h2>
  <section id="components__list">
    <FigmaComponent 
      v-for="(component, i) in components"
      :key="i"
      :figmaComponent="component"
    />
  </section>
</template>

<style lang="scss">
  #components__list {
    display: grid;
    row-gap: 5px;
  }
</style>