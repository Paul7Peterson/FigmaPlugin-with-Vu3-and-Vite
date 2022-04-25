<script lang="ts" setup>
import capitalize from 'just-capitalize';

type BaseType = string | number | boolean | null

interface Props {
  /** */
  data: Record<string, BaseType | BaseType[] | Record<string, BaseType>>;
}

defineProps<Props>();
</script>

<template>
  <dl class="data-list">
    <div
      class="data-list__row"
      :class="{ 'is-object': value && typeof value === 'object'}"
      v-for="([key, value], i) in Object.entries(data)"
      :key="i"
    >
      <dt>{{ capitalize(key) }}:</dt>
      <dd>
        <ul v-if="Array.isArray(value)">
          <li 
            v-for="(item, i) in value"
            :key="i"
          >
            <span>{{ item }}</span>
          </li>
        </ul>
        <DescriptionList 
          v-else-if="typeof value === 'object' && value" 
          :data="value"
        />
        <span v-else>{{ value }}</span>
      </dd>
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

    &.is-object {
      grid-template-columns: 1fr;
      grid-template-rows: max-content max-content;
    }
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
