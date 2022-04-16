<script lang="ts" setup>
import { onBeforeMount, reactive } from 'vue';
import { SolidColor } from '@api/styles/color.types';
import { Broker } from '@/worker.api';
import { ColorToken, TokenSection } from '.';

const data = reactive({
  colors: {} as Record<string, SolidColor[]>
})

async function getColors () {
  const colors = await Broker.listSolidColors();
  data.colors = colors.reduce((t, color) => {
    if (!t[color.colorName]) t[color.colorName] = []
    t[color.colorName].push(color)
    return t
  }, {} as Record<string, SolidColor[]>);
}

onBeforeMount(() => {
  getColors()
})
</script>

<template>
  <TokenSection 
    title="Colors"
    description="..."
    hasCreate
  >
    <details 
      class="color-tokens" open
      v-for="(colors, name) in data.colors"
      :key="name"
      :name="name"
      :colors="colors"
    >
      <summary>
        <span>{{ name }}</span>
      </summary>
      <div class="color-tokens__list">
        <ColorToken 
          v-for="(color, i) in colors"
          :key="i"
          :color="color"
          @rerender="getColors()"
        />
      </div>
    </details>
  </TokenSection>
</template>

<style lang="scss">
  $radius: 4px;

  .color-tokens {
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