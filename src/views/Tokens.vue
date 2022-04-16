<script lang="ts" setup>
import { reactive, onBeforeMount } from 'vue';
import type { Text, Grid, Effect } from '@client/styles/index.types'

import { Broker } from '../worker.api';
import { ColorGroup } from '../components';

const tokens = reactive({
  texts:[] as Text[],
  effects:[] as Effect[],
  grids:[] as Grid[],
})

onBeforeMount(async () => {
  const sourceTokens = await Broker.getTokens();
  tokens.texts = sourceTokens.texts;
  tokens.grids = sourceTokens.grids;
  tokens.effects = sourceTokens.effects;

  console.log(tokens);
})
</script>

<template>
  <section class="token-section">
    <header>Sizes</header>
    <div class="token-section__list">

    </div>
  </section>
  <ColorGroup />
  <section class="token-section">
    <header>Texts</header>
    <div class="token-section__list">
      <div 
        v-for="(token, i) in tokens.texts"
        :key="i"
      >
        <span>{{ token.name }}</span>
      </div>
    </div>
  </section>
  <section class="token-section">
    <header>Grids</header>
    <div class="token-section__list">
      <div 
        v-for="(token, i) in tokens.grids"
        :key="i"
      >
        <span>{{ token.name }}</span>
      </div>
    </div>
  </section>
  <section class="token-section">
    <header>Effects</header>
    <div class="token-section__list">
      <div 
        v-for="(token, i) in tokens.effects"
        :key="i"
      >
        <span>{{ token.name }}</span>
      </div>
    </div>
  </section>
</template>

<style lang="scss">
  .token-section {
    header {
      font-size: 20px;
      font-weight: bold;
      padding: 5px 0;
    }

    &__list {
      display: grid;
      row-gap: 5px;
    }
  }
</style>

