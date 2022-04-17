<script lang="ts" setup>
import type { BoxShadowStyle } from '@/api/styles/effect.types';

interface Props {
  boxShadow: BoxShadowStyle;
}

defineProps<Props>();
</script>

<template>
  <div class="box-show-token">
    <div class="box-show-token__sample"></div>
    <label class="box-show-token__label">{{ boxShadow.level }}</label>
  </div>
</template>

<style lang="scss">
  $sample-size: 20px;

  .box-show-token {
    &__sample {
      width: $sample-size;
      height: $sample-size;
    }
  }
</style>
