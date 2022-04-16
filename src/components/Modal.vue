<script lang="ts" setup>
import { Button } from '.'

defineProps<{
  /** */
  modelValue: boolean;
  /** */
  title?: string;
}>()

defineEmits<{
  (e: 'update:modelValue', modelValue: boolean): void
}>()
</script>

<template>
  <div id="modal__background" v-if="modelValue" title="">
    <div id="modal__card">
      <header id="modal__header">
        <slot name="header"></slot>
        <span v-if="title">{{ title }}</span>
      </header>
      <Button 
        id="modal__close" 
        @click="$emit('update:modelValue', !modelValue)"
      >X</Button>
      <section id="modal__content">
        <slot name="default"></slot>
      </section>
    </div>
  </div>
</template>

<style lang="scss">
  #modal {
    &__background {
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
      margin-bottom: 10px;
      padding-right: 50px;
    }
    &__close {
      position: absolute;
      top: 15px;
      right: 15;
    }
  }
</style>