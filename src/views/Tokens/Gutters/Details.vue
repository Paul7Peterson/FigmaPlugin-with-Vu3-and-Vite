<script lang="ts" setup>
import { useGuttersStore } from '@/store'

const store = useGuttersStore()

const selectedGutter = $computed(() => store.selectedGutter)

async function onDelete () {
  if (!selectedGutter) throw new Error('');
  if (confirm('Are you sure?')) {
    await store.deleteGutter(selectedGutter);
    store.selectedGutter = null;
  }
}

function onClose () {
  store.selectedGutter = null;
}
</script>

<template>
  <Modal 
    :modelValue="!!selectedGutter"
    @update:modelValue="onClose"
  >
    <template #header>{{ selectedGutter.name }}</template>
    <div>
      <DescriptionList 
        :data="{ 
          name: selectedGutter.name, 
          size: `${selectedGutter.value} rem`,
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
