<script lang="ts" setup>
interface Props {
  /** */
  modelValue: number;
  /** */
  label: string;
  /** */
  range?: [number, number];
  /** */
  disabled?: boolean
}

withDefaults(defineProps<Props>(), {
  range: () => [0, 100],
  disabled: false
});

const emits = defineEmits<{
  (e: 'update:modelValue', modelValue: number): void
}>()

function onInput (e: Event) {
  const value = (e.target as HTMLInputElement).valueAsNumber
  emits('update:modelValue', value)
}
</script>

<template>
  <div class="input-number">
    <label :for="label">{{ label }}:</label>
    <input 
      type="number" 
      :name="label"
      :min="range[0]"
      :max="range[1]"
      :disabled="disabled"
      @input="onInput"
    />
  </div>
</template>

<style lang="scss">
  .input-number {
    display: grid;
    grid-template-columns: 1fr max-content;
  }
</style>

