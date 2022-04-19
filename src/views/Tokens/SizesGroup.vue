<script lang="ts" setup>
import { reactive } from 'vue';
import { TokenSection } from '.';
import { SliderMultiple } from '@/components';
import { useSizesStore } from '@/store';
import type { RootSize } from '@/api/styles/space.types';

const store = useSizesStore()

const data = reactive({
  showDetails: false,
  selectedRootSize: null as RootSize | null,
  isEditing: false,
})

const rootSizes = $computed(() => store.rootSizes)

async function onCreate() {
  if (confirm('Do you really want to create a new root size?')) {
    await store.createRootSize()
  }
}

function onDetails (size: RootSize) {
  data.selectedRootSize = size;
  data.showDetails = true;
}

async function onDelete () {
  if (!data.selectedRootSize) throw new Error('');
  if (confirm('Are you sure?')) {
    await store.deleteRootSize(data.selectedRootSize);
    data.selectedRootSize = null;
    data.showDetails = false;
  }
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
    title="Sizes"
    description="..."
    hasCreate
    @create="onCreate"
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
          :locked="data.selectedRootSize?.value === rootSizes.find((s) => !s.locked)?.value"
          @click="onConfirmEdit"
        >Confirm</Button>
      </template>
      <template v-else>
        <Button hollow @click="onEdit">Edit values</Button>
        <Button @click="onCreate">Create new</Button>
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
        :tickBuilder="(i) => `${i}px`"
        :titleBuilder="(i, l) => `${l.name}\n${i}px`"
        @select="(i) => onDetails(rootSizes[i])"
      />
    </div>
    <p v-else>No root sizes available</p>
  </TokenSection>
  <Modal v-model="data.showDetails">
    <dl>
      <dt>Name:</dt><dd>{{ data.selectedRootSize?.name }}</dd>
      <dt>Size:</dt><dd>{{ data.selectedRootSize?.value }}px</dd>
    </dl>
    <Button 
      btnType="danger"
      @click="onDelete"
    >Delete</Button>
  </Modal>
</template>

<style lang="scss">

</style>