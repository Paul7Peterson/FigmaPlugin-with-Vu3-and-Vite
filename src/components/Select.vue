<script lang="ts" setup>
interface Props {
  /** */
  modelValue: string;
  /** */
  label: string;
  /** */
  options: { text: string, value: string }[]
  /** */
  locked?: boolean 
  /** */
  disabledOptions?: string[]
}

withDefaults(defineProps<Props>(), {
  locked: false,
  disabledOptions: () => []
})

defineEmits<{
  (e: 'update:modelValue', modelValue: string): void
}>()
</script>

<template>
  <div class="select">
    <label :for="label">{{ label }}</label>
    <select 
      :name="label"
      :disabled="locked"
    >
      <option 
        v-for="(option, i) in options"
        :key="i"
        :value="option.value"
        :disabled="disabledOptions.includes(option.value)"
      >{{ option.value }}</option>
    </select>
  </div>
</template>

<style lang="scss">
  .select {
    display: grid;
    grid-template-columns: 1fr max-content;
  }
</style>
