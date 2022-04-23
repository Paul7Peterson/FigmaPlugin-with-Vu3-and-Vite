<script lang="ts" setup>
import capitalize from 'just-capitalize'

interface Props {
  /** */
  modelValue: number
  /** */
  label: string
  /** */
  locked?: boolean;
}

withDefaults(defineProps<Props>(), {
  locked: false
})

const emits = defineEmits<{
  (e: 'update:modelValue', modelValue: number): void
}>()

function onInput (e: Event) {
  emits('update:modelValue', (e.target as HTMLInputElement).valueAsNumber)
}
</script>

<template>
  <label :for="label">
    {{ capitalize(label) }}
    <input 
      type="number"
      :name="label"
      :value="modelValue"
      @input="onInput"
    />
  </label>
</template>

<style lang="scss">

</style>
