<script lang="ts" setup>
import type { FontStyle } from '@/api/styles/text.types';

interface Props {
  fontStyle: FontStyle;
}

const props = defineProps<Props>();

const style: Record<string, any> = $computed(() => ({
  'font-family': props.fontStyle.fontFamily,
  'font-size': `${props.fontStyle.fontSize / 14}rem`,
}))

const sampleText = 'Abc'
</script>

<template>
  <div class="font-style-token">
    <label class="font-style-token__label">{{ fontStyle.name }}</label>
    <div 
      class="font-style-token__sample"
      :style="style"
    >{{ sampleText }}</div>
  </div>
</template>

<style lang="scss">
  $sample-size: 20px;

  .font-style-token {
    display: grid;
    grid-template-columns: 1fr max-content;
    align-items: center;
    width: 100%;

    &__label {
      
    }
    &__sample {
      
    }
  }
</style>
