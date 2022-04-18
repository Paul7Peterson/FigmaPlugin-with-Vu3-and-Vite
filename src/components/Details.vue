<script lang="ts" setup>
interface Props {
  /** */
  modelValue?: boolean;
  /** */
  constrained?: boolean;
}

withDefaults(defineProps<Props>(), {
  constrained: true,
})

defineEmits<{
  (e: 'update:modelValue', modelValue: Props['modelValue']): void
}>()

</script>

<template>
  <details class="details" 
    :open="modelValue || true"
    :class="{ constrained: constrained }"
    @click="$emit('update:modelValue', !modelValue)">
    <summary>
      <slot name="summary"></slot>
    </summary>
    <article>
      <slot name="default"></slot>
    </article>
  </details>
</template>

<style lang="scss">
  $radius: 4px;

  details.details {
    border-radius: $radius;
    border: 1px solid var(--color-dark);

    & > summary {
      padding: 5px 15px;
      font-weight: bold;
      background-color: var(--color-dark);
      color: white;
      border-top-left-radius: $radius;
      border-top-right-radius: $radius;
      cursor: pointer;

      &:focus {
        border-color: red;
      }
    }
    & > article {
      padding: 10px;
    }
     & :not([open]) {
      & > summary {
        display: none;
        border-radius: $radius;
      }
    }
    &.constrained {
      height: max-content;
    }
  }
</style>
