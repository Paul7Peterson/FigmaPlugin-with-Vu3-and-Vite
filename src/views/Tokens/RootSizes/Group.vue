<script lang="ts" setup>
import { reactive } from 'vue';
import type { RootSize } from '~/api/tokens/index.types';
import { SliderMultiple } from '~/components';
import { useSizesStore } from '~/store';
import { TokenSection } from '..';
import RootSizeDetails from './Details.vue';

const store = useSizesStore()

const data = reactive({
  isEditing: false,
})

const rootSizes = $computed(() => store.rootSizes)

const canConfirmChanges = $computed(() => {
  if (!store.selectedRootSize) return false
  const target = rootSizes.find((s) => s.name === store.selectedRootSize?.name)
  if (!target) throw new Error('')
  store.selectedRootSize.value !== target.value
})


async function onCreate() {
  if (confirm('Do you really want to create a new root size?')) {
    await store.createRootSize()
  }
}

function onDetails (size: RootSize) { 
  console.log('💚', size);
  
  store.selectedRootSize = size;
}

function onEdit () {
  store.rootSizes = store.rootSizes
    .map((s) => ({...s, locked: false }))
  data.isEditing = true;
}

async function onConfirmEdit () {
  await store.modifyRootSizes(store.rootSizes);
  data.isEditing = false;
}

async function onCancelEdit () {
  data.isEditing = false;
  await store.fetchRootSizes();
}
</script>

<template>
  <TokenSection 
    title="Root sizes"
    description="..."
  >
    <template #header>
      <template v-if="data.isEditing">
        <Button 
          btnType="danger"
          hollow
          @click="onCancelEdit"
        >Cancel</Button> 
        <Button 
          btnType="info"
          :locked="canConfirmChanges"
          @click="onConfirmEdit"
        >Confirm</Button>
      </template>
      <template v-else>
        <Button 
          hollow 
          :locked="!rootSizes.length"
          @click="onEdit"
        >Edit values</Button>
        <Button 
          @click="onCreate"
        >Create new</Button>
      </template>
    </template>
    <div 
      v-if="rootSizes.length" 
      class="size-tokens__list"
    >
      <SliderMultiple 
        :values="rootSizes"
        :range="[6, 24]"
        label="Root sizes"
        showTicks
        :ticksGap="3"
        :tickBuilder="(i) => `${i} px`"
        :titleBuilder="(i, l) => `${l.name}\n${i} px`"
        @select="(i) => onDetails(rootSizes[i])"
      />
    </div>
    <p v-else>No root sizes available</p>
  </TokenSection>
  <RootSizeDetails/>
</template>

<style lang="scss">

</style>