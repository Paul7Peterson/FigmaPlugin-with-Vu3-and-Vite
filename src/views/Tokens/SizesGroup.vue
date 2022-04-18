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
    await store.createOrModifyRootSize()
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
  data.showDetails = false;
  if (!data.selectedRootSize) throw new Error('');
  store.rootSizes = store.rootSizes
    .map((s) => ({...s, locked: s.name !== data.selectedRootSize?.name }))
  data.isEditing = true;
}

async function onConfirmEdit () {
  const size = rootSizes.find((s) => !s.locked)
  if (!size) throw new Error('');
  await store.createOrModifyRootSize(size);
  data.selectedRootSize = null;
  data.isEditing = false;
}

async function onCancelEdit () {
  data.selectedRootSize = null;
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
        @select="(i) => onDetails(rootSizes[i])"
      />
    </div>
    <p v-else>No root sizes available</p>
    <template v-if="data.isEditing">
      <Button 
        btnType="info"
        :locked="data.selectedRootSize?.value === rootSizes.find((s) => !s.locked)?.value"
        @click="onConfirmEdit"
      >Confirm</Button>
      <Button 
        btnType="danger"
        hollow
        @click="onCancelEdit"
      >Cancel</Button> 
    </template>
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
    <Button @click="onEdit">Edit</Button>
  </Modal>
</template>

<style lang="scss">

</style>