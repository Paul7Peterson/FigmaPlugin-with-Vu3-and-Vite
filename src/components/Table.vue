<script lang="ts" setup>
import kebabCase from 'just-kebab-case'

interface Props {
  /** */
  rows: { name?: string }[]
  /** */
  columns: string[] | { name: string }[]
}

const props = defineProps<Props>()

defineEmits<{
  (e: 'rowSelected', row: object): void
  (e: 'cellSelected', cell: { row: object, column: object }): void
}>()

const columnNames = $computed(() => 
  typeof props.columns[0] === 'string' 
    ? props.columns as string[]
    : (props.columns as { name: string }[]).map(({ name }) => name)) 

const columnParsedNames = $computed(() => 
  columnNames.map((n) => kebabCase(n))) 
</script>

<template>
  <table class="table">
    <thead class="table__head">
      <th><slot name="corner"/></th>
      <th 
        v-for="(column, i) in columns"
        :key="i"
      >
        <slot name="header" v-bind="{ column }">{{ columnNames[i] }}</slot>
      </th>
    </thead>
    <tbody class="table__body">
      <tr 
        :class="[i % 2 ? 'odd' : 'even']"
        v-for="(row, i) in rows"
        :key="i"
      >
        <th @click="$emit('rowSelected', row)">
          <slot name="row-header" v-bind="{ row }">{{ row.name || '' }}</slot>
        </th>
        <td
         v-for="(column, i) in columns"
         :key="i"
        >
          <slot name="cell" v-bind="{ row, column }">
            <slot :name="columnParsedNames[i]" v-bind="{ row, column }"/>
          </slot>
        </td>
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
