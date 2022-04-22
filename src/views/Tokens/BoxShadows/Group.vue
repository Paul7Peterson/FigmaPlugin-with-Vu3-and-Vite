<script lang="ts" setup>
import { TokenSection } from '..';
import BoxShadowToken from './Token.vue'
import { useStylesStore } from '@/store';
import { BoxShadowStyle, BoxShadowType } from '@/api/tokens/index.types';
import { Details } from '@/components';

const store = useStylesStore()

const boxShadowStyles: Record<BoxShadowType, BoxShadowStyle[]> = $computed(() => store.boxShadows)
</script>

<template>
  <TokenSection 
    title="Box shadows"
    description="..."
  >
    <section class="box-shadow-tokens">
      <Details 
        v-for="(typeGroup, type) in boxShadowStyles"
        :key="type"
      >
        <template #summary>{{ type }}</template>
        <div class="box-shadow-tokens__list">
          <BoxShadowToken 
            v-for="(shadow, i) in typeGroup"
            :key="i"
            :boxShadow="shadow"
          />
        </div>
      </Details>
    </section>
  </TokenSection>
</template>

<style lang="scss">
  $radius: 4px;

  .box-shadow-tokens {
    display: flex;
    flex-wrap: wrap;
    justify-content: left;
    gap: 10px;

    > * {
      flex: 1;
      min-width: 300px;
    }

    &__list {
      display: flex;
      flex-wrap: wrap;
      gap: 5px;
    }
  }
</style>