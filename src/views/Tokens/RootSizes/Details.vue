<script lang="ts" setup>
import { useSizesStore } from '~/store';

const store = useSizesStore()

const selectedRootSize = $computed(() => store.selectedRootSize)

async function onDelete () {
  if (!selectedRootSize) throw new Error('');
  if (confirm('Are you sure?')) {
    await store.deleteRootSize(selectedRootSize);
    store.selectedRootSize = null;
  }
}

function onClose () {
  store.selectedRootSize = null;
}

</script>

<template>
  <Modal 
    :modelValue="!!selectedRootSize"
    @update:modelValue="onClose"
  >
    <template #header>{{ selectedRootSize.name }}</template>
    <div>
      <DescriptionList 
        :data="{ 
          name: selectedRootSize.name, 
          size: `${selectedRootSize.value} px`,
        }"
      />
    </div>
    <template #actions>
      <Button 
        btnType="danger"
        @click="onDelete"
      >Delete</Button>
    </template>
  </Modal>
</template>

<style lang="scss">

</style>
