<script lang="ts" setup>
import { onBeforeMount, reactive } from 'vue';
import { RootSize } from '@api/styles/index.types';
import { Broker } from '@/worker.api';
import { ColorToken, TokenSection } from '.';

const data = reactive({
  gutters: {} as Record<string, RootSize>
})

async function getColors () {
  const colors = await Broker.listRootSizes();
  data.gutters = colors.reduce((t, size) => {
    t[size.name] = size
    return t
  }, {} as Record<string, RootSize>);
}

onBeforeMount(() => {
  getColors()
})
</script>

<template>
  <TokenSection 
    title="Gutters"
    description="..."
    hasCreate
  >
    <details 
      class="spacing-tokens" open
      v-for="(colors, name) in data.gutters"
      :key="name"
      :name="name"
      :colors="colors"
    >
      <summary>
        <span>{{ name }}</span>
      </summary>
      <div class="spacing-tokens__list">
        <!-- <ColorToken 
          v-for="(color, i) in colors"
          :key="i"
          :color="color"
          @rerender="getColors()"
        /> -->
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