<script lang="ts" setup>
interface Props {
  /** */
  listId: string;
  /** */
  options: { value: string }[];
}

defineProps<Props>()
</script>

<template>
  <datalist :id="listId">
    <option 
      v-for="(option, i) in options"
      :key="i"
      :value="option.value" />
  </datalist>  
</template>

