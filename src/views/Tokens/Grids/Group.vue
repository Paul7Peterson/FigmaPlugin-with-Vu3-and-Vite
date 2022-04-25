<script lang="ts" setup>
import { useGridsStore } from '~/store';
import { TokenSection } from '..';

const store = useGridsStore()

const gridStyles = $computed(() => store.gridStyles)
</script>

<template>
  <TokenSection 
    title="Grids"
    description="..."
  >
    <details 
      class="grids-tokens" open
      v-for="(grid, name) in gridStyles"
      :key="name"
    >
      <summary>
        <span>{{ name }}</span>
      </summary>
      <div class="grids-tokens__list">{{ grid }}</div>
    </details>
  </TokenSection>
</template>

<style lang="scss">
  $radius: 4px;

  .grids-tokens {
    border-radius: $radius;
    border: 1px solid rgb(44, 44, 44);

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