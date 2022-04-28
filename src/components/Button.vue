<script lang="ts" setup>
interface Props {
  /** */
  locked?: boolean;
  /** */
  btnType?: 'primary' | 'info' | 'danger',
  /** */
  hollow?: boolean;
  /** ... */
  isLoading?: boolean;
}

withDefaults(defineProps<Props>(), {
  locked: false,
  type: 'primary',
  hollow: false,
  isLoading: false,
})
</script>

<template>
  <button 
    class="btn"
    :class="[btnType, hollow ? 'hollow' : '']"
    :disabled="locked || isLoading"
  >
    <Spinner v-if="isLoading"/>
    <slot v-else></slot>
  </button>
</template>

<style lang="scss">
  $btn-color--primary: var(--color-dark);
  $btn-color--danger: crimson;
  $btn-color--info: darkcyan;
  $btn-color--locked: #888;
  $btn-border-width: 2px;

  button.btn {
    padding: calc(5px - $btn-border-width) calc(10px - $btn-border-width);
    font-size: 1rem;
    color: white;
    background-color: $btn-color--primary;
    border: $btn-border-width solid $btn-color--primary;
    border-radius: 4px;
    cursor: pointer;
    user-select: none;

    &.danger {
      background-color: $btn-color--danger;
      border-color: $btn-color--danger;
    }
    &.info {
      background-color: $btn-color--info;
      border-color: $btn-color--info;
    }
    &.hollow {
      background-color: transparent;
      color: $btn-color--primary;

      &.danger {
        color: $btn-color--danger;
      }
      &.info {
        color: $btn-color--info;
      }
    }
    &[disabled] {
      background-color: $btn-color--locked;
      border-color: $btn-color--locked;

      &.hollow {
        background-color: transparent;
        color: $btn-color--locked;
      }
    }
  }
</style>
