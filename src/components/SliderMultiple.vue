<script lang="ts" setup>
import { Slider } from '@/components';

interface Props {
  /** */
  values: {
    /** */
    value: number;
  }[];
  /** */
  label: string;
  /** */
  range: [number, number];
  /** */
  disabled?: boolean;
  /** */
  step?: number;
  /** */
  limit?: [number | null, number | null];
}

const props = withDefaults(defineProps<Props>(), {
  range: () => [0, 100],
  disabled: false,
  step: 1,
});

function getLimit(index: number): [number, number] {
  const [min, max] = [
    props.values[index - 1]?.value || props.limit?.[0], 
    props.values[index + 1]?.value || props.limit?.[1],
  ]
  return [
    min ? min + 1 : props.range[0],
    max ? max - 1 : props.range[1],
  ]
}
</script>

<template>
  <div class="slider-multiple">
    <div class="slider-multiple__container">
      <Slider 
        v-for="(value, i) in values"
        v-model="value.value"
        :key="i"
        :range="range"
        :limit="getLimit(i)"
        :step="step"
        :label="''"
      />
    </div>
  </div>
</template>

<style lang="scss">
  $size: 24px;
  $track-color: #ccc;

  .slider-multiple {
    height: $size;
    
    &__container {
      display: grid;
      position: relative;
      grid-auto-rows: 0;
      margin: calc($size / 2);
    }

    .slider {
      width: 100%;
      pointer-events: none;

      &::-webkit-slider-thumb {
        pointer-events: all;
      }
      &::-moz-range-thumb {
        pointer-events: all;
      }
      &::-webkit-slider-runnable-track {
        background: transparent;
      }
      &::-moz-range-track {
        background: transparent;
      }
      &__label {
        display: none;
      }
      &__reference {
        bottom: auto;
      }
    }
    > .slider__container:first-child .slider {
      &::-webkit-slider-runnable-track {
        background: $track-color;
      }

      &::-moz-range-track {
        background: $track-color;
      }
    }
  }
</style>
