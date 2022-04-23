<script lang="ts" setup>
import capitalize from 'just-capitalize'

interface Props {
  /** */
  modelValue: string
  /** */
  label: string
  /** */
  locked?: boolean;
}

withDefaults(defineProps<Props>(), {
  locked: false
})

const emits = defineEmits<{
  (e: 'update:modelValue', modelValue: string): void
}>()

function onInput (e: Event) {
  emits('update:modelValue', (e.target as HTMLInputElement).value)
}
</script>

<template>
  <label :for="label">
    {{ capitalize(label) }}
    <input 
      type="week"
      :name="label"
      :value="modelValue"
      @input="onInput"
    />
  </label>
</template>

<style lang="scss">

</style>
