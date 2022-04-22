<script lang="ts" setup>
import { TokenSection } from '..';
import FontToken from './Token.vue';
import { useStylesStore } from '@/store';
import type { ExtendedFontStyleCategory, FontStyle } from '@/api/tokens/index.types';
import { Details } from '@/components';

const store = useStylesStore()

const textStyles: Record<ExtendedFontStyleCategory, FontStyle[]> = $computed(() => store.fontStyles)

async function onCreate () {
  if (confirm('Are you sure?')) {
    await store.createFontStyle()
  }
}
</script>

<template>
  <TokenSection 
    title="Texts"
    description="..."
  >
    <template #header>
      <Button @click="onCreate">Create new</Button>
    </template>
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