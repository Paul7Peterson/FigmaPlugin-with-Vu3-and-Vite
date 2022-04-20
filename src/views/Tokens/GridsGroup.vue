<script lang="ts" setup>
import { TokenSection } from '.';
import { useStylesStore } from '@/store';

const store = useStylesStore()

const gridStyles = $computed(() => store.gridStyles)
</script>

<template>
  <TokenSection 
    title="Grids"
    description="..."
  >
    <details 
      class="spacing-tokens" open
      v-for="(grid, name) in gridStyles"
      :key="name"
    >
      <summary>
        <span>{{ name }}</span>
      </summary>
      <div class="spacing-tokens__list">{{ grid }}</div>
    </details>
  </TokenSection>
</template>

<style lang="scss">
  $radius: 4px;

  .spacing-tokens {
    border-radius: $radius;
    border: 1px solid rgb(44, 44, 44);

    summary {
      display: grid;
      grid-template-columns: 1fr;
      padding: 5px 10px;
      font-weight: bold;
      align-items: center;
      column-gap: 10px;
      background-color: rgb(44, 44, 44);
      color: white;
      border-top-left-radius: $radius;
      border-top-right-radius: $radius;
    }
    &__list {
      display: grid;
      grid-auto-flow: column;
      grid-template-columns: max-content;
      justify-content: left;
      gap: 5px;
      padding: 5px 10px;
    }
  }
</style>