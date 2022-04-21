<script lang="ts" setup>
interface Props {
  /** */
  rows: object[]
  /** */
  columns: string[]
}

defineProps<Props>()

defineEmits<{
  (e: 'rowSelected', row: object): void
}>()
</script>

<template>
  <table class="table">
    <thead class="table__head">
      <th><slot name="corner"></slot></th>
      <th 
        v-for="(column, i) in columns"
        :key="i"
      ><slot name="header" v-bind="{ column }"></slot></th>
    </thead>
    <tbody class="table__body">
      <tr 
        :class="[i % 2 ? 'odd' : 'even']"
        v-for="(row, i) in rows"
        :key="i"
      >
        <th @click="$emit('rowSelected', row)"><slot name="rowHeader" v-bind="{ row }"></slot></th>
        <slot name="default" v-bind="{ row }"></slot>
      </tr>
    </tbody>
  </table>
</template>

<style lang="scss">
  .table {
    &__head {
      background-color: var(--color-dark);
      color: white;

      th {
        font-size: 1rem;
      }
    }
    &__body {
      th, td {
        font-size: 1rem;
      }
      th {
        text-align: left;
      }
      .odd {
        background-color: rgba(0,0,0,.1);
      }
    }
  }
</style>
