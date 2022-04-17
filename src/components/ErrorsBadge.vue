<script lang="ts" setup>
interface Props {
  /** */
  errors: string[]
};

defineProps<Props>()
</script>

<template>
  <span 
    class="errors-badge" 
    v-if="errors.length"
    :title="errors.join('\n')"
  >🟡</span>
</template>

<style lang="scss">
  .errors-badge {
    position: absolute;
    font-size: 8px;
  }
</style>
