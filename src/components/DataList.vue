<script lang="ts" setup>
interface Props {
  /** */
  data: Record<string, string | number | boolean | null>;
}

defineProps<Props>();
</script>

<template>
  <dl class="data-list">
    <div
      class="data-list__row"
      v-for="([key, value], i) in Object.entries(data)"
      :key="i"
    >
      <dt>{{ key }}:</dt>
      <dd>{{ value }}</dd>
    </div>
  </dl>
</template>

<style lang="scss">
.data-list {
  display: grid;
  row-gap: 5px;

  &__row {
    display: grid;
    grid-template-columns: 1fr max-content;
  }
  dt {
    font-weight: bold;
    font-size: 14px;
  }
  &__action {
    display: grid;
    justify-items: right;
  }
}
</style>
