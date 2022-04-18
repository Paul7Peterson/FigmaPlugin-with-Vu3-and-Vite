<script lang="ts" setup>
import { onBeforeMount, reactive, watch } from 'vue';
import { TokenSection } from '.';
import { SliderMultiple, Slider } from '@/components';
import { useStylesStore } from '@/store';
import { RootSize, RootSizeName } from '@/api/styles/space.types';

const store = useStylesStore()

const rootSizes = $computed(() => store.rootSizes)

const data = reactive({
  values: [{ value: 2 }],  
})

watch(() => [store.rootSizes], () => {
  data.values = rootSizes?.map((s) => ({ value: s.size })) || []
})

async function onCreate() {
  
  const amount = data.values.length
  if (amount >= 5) return

  if (!amount || amount % 2) {
    data.values.push({
      value: (data.values.at(-1)?.value || 14) + 2,
      // name: (rootSizes.at(-1)?.name === 'Medium' ? 'Big' : 'Huge') as RootSizeName
    })
  } else {
    data.values.unshift({
      value: data.values[0].value - 2,
      // name: (rootSizes[0].name === 'Medium' ? 'Small' : 'Tiny') as RootSizeName
    })
  }
  console.log(data.values);
}

// const x = $ref(16)

onBeforeMount(() => {
  data.values = store.rootSizes.map((s) => ({ value: s.size }))
})
</script>

<template>
  <TokenSection 
    title="Sizes"
    description="..."
    hasCreate
    @create="onCreate"
  >
    <details class="size-tokens" open>
      <summary>
        <span>Root sizes</span>
      </summary>
      <div 
        v-if="data.values.length" 
        class="size-tokens__list"
      >
        <SliderMultiple 
          :values="data.values"
          :range="[6, 24]"
          label="Root sizes"
          showTicks
          :ticksGap="3"
        />
      </div>
      <p v-else>No root sizes available</p>
      <!-- <Slider :range="[6, 30]" v-model="x" label=""/> -->
    </details>
  </TokenSection>
</template>

<style lang="scss">
  $radius: 4px;

  .size-tokens {
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
      position: relative;
      display: grid;
      gap: 5px;
      padding: 10px;
    }
  }
</style>