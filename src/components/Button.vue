<script lang="ts" setup>
interface Props {
  /** */
  locked?: boolean;
  /** */
  btnType?: 'primary' | 'info' | 'danger',
  /** */
  hollow?: boolean;
}

withDefaults(defineProps<Props>(), {
  locked: false,
  type: 'primary',
  hollow: false,
})
</script>

<template>
  <button 
    class="btn"
    :class="[btnType, hollow ? 'hollow' : '']"
    :disabled="locked"
  >
    <slot></slot>
  </button>
</template>

<style lang="scss">
  $btn-color--primary: var(--color-dark);
  $btn-color--danger: crimson;
  $btn-color--info: darkcyan;
  $btn-border-width: 2px;

  button.btn {
    padding: calc(5px - $btn-border-width) calc(10px - $btn-border-width);
    font-size: 1rem;
    color: white;
    background-color: $btn-color--primary;
    border: $btn-border-width solid $btn-color--primary;
    border-radius: 4px;
    cursor: pointer;

    &.danger {
      background-color: $btn-color--danger;
      border-color: $btn-color--danger;
    }
    &.info {
      background-color: $btn-color--info;
      border-color: $btn-color--info;
    }
    &.hollow {
      background-color: white;
      color: $btn-color--primary;

      &.danger {
        color: $btn-color--danger;
      }
      &.info {
        color: $btn-color--info;
      }
    }
  }
</style>
