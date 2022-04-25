<script lang="ts" setup>
import { useBordersStore } from '~/store';
import { TokenSection } from '..';
import BorderToken from './Token.vue';

const store = useBordersStore()

const borderStyles = $computed(() => store.borderStyles) 
</script>

<template>
  <TokenSection 
    title="Borders"
    description="..."
  >
    <details 
      class="spacing-tokens" open
      v-for="(border, name) in borderStyles"
      :key="name"
    >
      <summary>
        <span>{{ name }}</span>
      </summary>
      <div class="spacing-tokens__list">
        <BorderToken :border="border"/>
      </div>
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