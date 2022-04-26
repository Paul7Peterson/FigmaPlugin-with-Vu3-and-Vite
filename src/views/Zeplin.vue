<script lang="ts" setup>
import { useZeplinStore } from '~ui/store';
import ColorSample from './Zeplin/ColorSample.vue';

const store = useZeplinStore()

const colors: Record<string, string> = $computed(() => store.colors)
const spacing: Record<string, number> = $computed(() => store.spacing)
const textStyles = $computed(() => store.textStyles)
</script>

<template>
  <h2>Colors</h2>
  <section id="zeplin__colors">
    <ColorSample 
      v-for="(color, colorName) in colors"
      :key="colorName"
      :name="colorName"
      :color="color"
    />
  </section>
  <h2>Spacing</h2>
  <section id="zeplin__spacing">
    <div 
      v-for="(space, spaceName) in spacing"
      :key="spaceName"
    >{{ spaceName }}: {{ space }}</div>
  </section>
  <h2>Text style</h2>
  <section id="zeplin__text-styles">
    <div 
      v-for="(text, textName) in textStyles"
      :key="textName"
    >{{ textName }}: {{ text }}</div>
  </section>
  <h2>Components</h2>
  <section id="zeplin__components"></section>
</template>

<style lang="scss">
  #zeplin {
    &__colors {
      display: flex;
      flex-wrap: wrap;
      gap: 10px;
      justify-content: space-between;
    }
    &__spacing {
      display: flex;
      flex-wrap: wrap;
    }
    &__text-styles {
      display: flex;
      flex-wrap: wrap;
    }
    &__components {
      display: flex;
      flex-wrap: wrap;
    }
  }
</style>
