<script lang="ts" setup>
interface Props {
  /** */
  modelValue: number;
  /** */
  label: string;
  /** */
  options: { text: string, value: number }[]
  /** */
  locked?: boolean 
  /** */
  lockedOptions?: number[]
}

withDefaults(defineProps<Props>(), {
  locked: false,
  disabledOptions: () => []
})

const emits = defineEmits<{
  (e: 'update:modelValue', modelValue: number): void
}>()

function onChange (e: Event) {
  const value = (e.target as HTMLSelectElement).value
  emits('update:modelValue', parseInt(value))
}
</script>

<template>
  <div class="select">
    <label :for="label">{{ label }}</label>
    <select 
      :name="label"
      :disabled="locked"
      @change="onChange"
    >
      <option 
        v-for="(option, i) in options"
        :key="i"
        :value="option.value"
        :disabled="lockedOptions?.includes(option.value)"
      >{{ option.text }}</option>
    </select>
  </div>
</template>

<style lang="scss">
  .select {
    display: grid;
    grid-template-columns: 1fr max-content;
  }
</style>
