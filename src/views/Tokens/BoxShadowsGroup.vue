<script lang="ts" setup>
import { TokenSection, BoxShadowToken } from '.';
import { useStylesStore } from '@/store';
import { BoxShadowStyle, BoxShadowType } from '@/api/styles/index.types';

const store = useStylesStore()

const boxShadowStyles: Record<BoxShadowType, BoxShadowStyle[]> = $computed(() => store.boxShadows)
</script>

<template>
  <TokenSection 
    title="Box shadows"
    description="..."
    hasCreate
  >
    <details 
      class="spacing-tokens" open
      v-for="(typeGroup, type) in boxShadowStyles"
      :key="type"
    >
      <summary>
        <span>{{ type }}</span>
      </summary>
      <div class="spacing-tokens__list">
        <BoxShadowToken 
          v-for="(shadow, i) in typeGroup"
          :key="i"
          :boxShadow="shadow"
        />
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