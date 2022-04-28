<script lang="ts" setup>
interface Props {
  /** */
  modelValue: boolean;
}

defineProps<Props>();

defineEmits<{
  (e: 'update:modelValue', modelValue: boolean): void;
}>();
</script>

<template>
  <div id="modal__background" v-if="modelValue" @click.self="$emit('update:modelValue', false)">
    <div id="modal__card">
      <header id="modal__header">
        <slot name="header">&nbsp;</slot>
        <Button hollow @click="$emit('update:modelValue', !modelValue)">X</Button>
      </header>
      <section id="modal__content">
        <slot name="default"></slot>
      </section>
      <footer id="modal__actions" class="button-group">
        <slot name="actions"></slot>
      </footer>
    </div>
  </div>
</template>

<style lang="scss">
#modal {
  &__background {
    z-index: 100;
    position: fixed;
    display: grid;
    align-items: top;
    justify-items: center;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    padding-top: 30px;
    background-color: rgba(0, 0, 0, .5);
    cursor: unset;
  }

  &__card {
    position: relative;
    min-width: 100px;
    min-height: 100px;
    background-color: white;
    height: max-content;
    width: max-content;
    padding: 10px 20px;
    border-radius: 5px;

  }

  &__header {
    display: grid;
    font-weight: bold;
    align-items: center;
    margin-bottom: 10px;
    column-gap: 15px;
    grid-template-columns: 1fr max-content;
  }

  &__actions {
    justify-content: end;
  }
}
</style>
