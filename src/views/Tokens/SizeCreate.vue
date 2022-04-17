<script lang="ts" setup>
import { reactive } from 'vue';
import { RootSizeName, SizesMap } from '@api/styles/index.types';
import { Broker } from '@/worker.api';

defineProps<{
  modelValue: boolean;
  existingValues: SizesMap;
}>()

const emits = defineEmits<{
  (e: 'update:modelValue', modelValue: boolean): void
}>()

const data = reactive({
  size: 16,
  name: '' as RootSizeName,
})

const availableSizes: Record<'text'|'value', string>[] = [
  'Tiny',
  'Small',
  'Medium',
  'Big',
  'Huge',
].map((text) => ({ text, value: text }))

async function create () {
  await Broker.createOrModifyRootSize({ 
    size: data.size,
    name: data.name,
  })
  emits('update:modelValue', false)
}
</script>

<template>
  <Modal 
    :modelValue="modelValue"
    @update:modalValue="$emit('update:modelValue', $event)"
  >
    <Select 
      v-model="data.name" 
      label="Name" 
      :options="availableSizes"
      :disabledOption="Object.keys(existingValues)"
    />
    <InputNumber 
      v-model="data.size" 
      :range="[6, 40]" 
      label="Size"
    />
    <Button @click="create()">Create</Button>
  </Modal>
</template>

<style lang="scss">

</style>