<script lang="ts" setup>
import { TokenSection, FontToken } from '.';
import { useStylesStore } from '@/store';
import type { ExtendedFontStyleCategory, FontStyle } from '@/api/styles/text.types';
import { Details } from '@/components';

const store = useStylesStore()

const textStyles: Record<ExtendedFontStyleCategory, FontStyle[]> = $computed(() => store.fontStyles)
</script>

<template>
  <TokenSection 
    title="Texts"
    description="..."
    hasCreate
  >
    <section class="font-style-tokens">
      <Details 
        v-for="(categoryTexts, category) in textStyles"
        :key="category"
      >
        <template #summary>{{ category }}</template>
        <div class="font-style-tokens__list">
          <FontToken 
            v-for="(fontStyle, i) in categoryTexts"
            :key="i"
            :fontStyle="fontStyle"
          />
        </div>
      </Details>
    </section>
  </TokenSection>
</template>

<style lang="scss">
  $radius: 4px;

  .font-style-tokens {
    display: flex;
    flex-wrap: wrap;
    justify-content: left;
    gap: 10px;

    > * {
      flex: 1;
      min-width: 200px;
    }

    &__list {
      display: grid;
      grid-auto-flow: row;
      gap: 5px;
      padding: 5px 10px;
    }
  }
</style>