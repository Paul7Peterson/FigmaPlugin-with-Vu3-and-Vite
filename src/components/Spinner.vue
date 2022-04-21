<script lang="ts" setup>

</script>

<template>
  <div class="spinner"/>
</template>

<style lang="scss">
  $size: 1em;

  .spinner {
    display: inline-block;
    width: $size;
    height: $size;
    vertical-align: calc(-1 * ($size / 16));
    border: calc($size / 8) solid currentColor;
    border-right-color: transparent;
    border-radius: 50%;
    -webkit-animation: .75s linear infinite spinner-border;
    animation: .75s linear infinite spinner-border;
  }

  @keyframes spinner-border {
    to { transform: rotate(360deg); }
  }
</style>
