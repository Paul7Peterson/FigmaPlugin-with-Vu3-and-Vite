<script lang="ts" setup>
import { TokenSection, FontToken } from '.';
import { useStylesStore } from '@/store';
import type { ExtendedFontStyleCategory, FontStyle } from '@/api/styles/text.types';

const store = useStylesStore()

const textStyles: Record<ExtendedFontStyleCategory, FontStyle[]> = $computed(() => store.fontStyles)
</script>

<template>
  <TokenSection 
    title="Texts"
    description="..."
    hasCreate
  >
    <details 
      class="font-style-tokens" open
      v-for="(categoryTexts, category) in textStyles"
      :key="category"
    >
      <summary>
        <span>{{ category }}</span>
      </summary>
      <div class="font-style-tokens__list">
        <FontToken 
          v-for="(fontStyle, i) in categoryTexts"
          :key="i"
          :fontStyle="fontStyle"
        />
      </div>
    </details>
  </TokenSection>
</template>

<style lang="scss">
  $radius: 4px;

  .font-style-tokens {
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
      grid-auto-flow: row;
      gap: 5px;
      padding: 5px 10px;
    }
  }
</style>