<script lang="ts" setup>

</script>

<template>
  <details class="details">
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
  }
</style>
