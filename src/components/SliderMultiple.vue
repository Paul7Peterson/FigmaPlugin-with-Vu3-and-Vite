<script lang="ts" setup>
import { onErrorCaptured } from 'vue'
import { Slider } from '@/components';

interface Props {
  /** */
  values: {
    /** */
    value: number;
    /** */
    label?: string;
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
  /** */
  unit?: string;
  /** */
  showTicks?: boolean;
  /** */
  ticksGap?: number;
}

const props = withDefaults(defineProps<Props>(), {
  range: () => [0, 100],
  disabled: false,
  step: 1,
  showTicks: false,
  ticksGap: 1,
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

onErrorCaptured((e) => console.log(e))
</script>

<template>
  <div class="slider-multiple">
    <label>{{ label }}</label>
    <div class="slider-multiple__container">
      <Slider 
        v-for="(value, i) in values"
        v-model="value.value"
        :key="i"
        :range="range"
        :limit="getLimit(i)"
        :step="step"
        :label="value.label || ''"
        :unit="unit"
        :showTicks="showTicks"
        :ticksGap="ticksGap"
      />
    </div>
  </div>
</template>

<style lang="scss">
  $size: 24px;
  $track-color: #ccc;

  .slider-multiple {
    display: grid;
    grid-template-rows: max-content max-content;
    
    &__container {
      display: grid;
      position: relative;
      grid-template-rows: max-content;

      > .slider__container:not(:first-child) {
        position: absolute;
        top: 0;

        .slider {
          &__reference {
            background-color: transparent;
          }
        }
        .ticks {
          display: none;
        }
      }
    }

    .slider {
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
    }
  }
</style>
