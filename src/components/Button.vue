<script lang="ts" setup>

</script>

<template>
  <button class="btn">
    <slot></slot>
  </button>
</template>

<style lang="scss">
  button.btn {
    background-color: var(--color-dark);
    color: white;
    cursor: pointer;
    border: none;
    border-radius: 4px;
  }
</style>