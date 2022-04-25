<script lang="ts" setup>
import { FigmaComponent } from "~api/components/index.types";

interface Props {
  /** */
  figmaComponent: FigmaComponent;
}

defineProps<Props>();
</script>

<template>
  <router-link :to="`/components/${encodeURIComponent(figmaComponent.name)}`">
    <article class="figma-component">
      <span>{{ figmaComponent.name }}</span>
    </article>
  </router-link>
</template>

<style lang="scss">
  .figma-component {
    border: 2px solid var(--color-dark);
    padding: 5px;
    color: var(--color-dark)
  }
</style>
