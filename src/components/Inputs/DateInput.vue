<script lang="ts" setup>
import capitalize from 'just-capitalize';

interface Props {
  /** */
  modelValue: Date | null
  /** */
  label: string
  /** */
  locked?: boolean;
}

withDefaults(defineProps<Props>(), {
  locked: false
})

const emits = defineEmits<{
  (e: 'update:modelValue', modelValue: Date | null): void
}>()

function onInput (e: Event) {
  emits('update:modelValue', (e.target as HTMLInputElement).valueAsDate)
}
</script>

<template>
  <label :for="label">
    {{ capitalize(label) }}
    <input 
      type="date"
      :name="label"
      :value="modelValue?.toUTCString()"
      @input="onInput"
    />
  </label>
</template>

<style lang="scss">

</style>
