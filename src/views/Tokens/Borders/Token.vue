<script lang="ts" setup>
import type { BorderStyle } from '~api/tokens/index.types';

interface Props {
  border: BorderStyle;
}

defineProps<Props>();
</script>

<template>
  <div class="border-token">
    <div class="border-token__sample"></div>
    <label class="border-token__label">{{ border.name }}</label>
  </div>
</template>

<style lang="scss">
  $sample-size: 20px;

  .border-token {
    &__sample {
      width: $sample-size;
      height: $sample-size;
    }
  }
</style>
