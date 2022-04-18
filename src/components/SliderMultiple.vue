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
    /** */
    locked?: boolean
  }[];
  /** */
  label: string;
  /** */
  range: [number, number];
  /** */
  locked?: boolean;
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
  locked: false,
  step: 1,
  showTicks: false,
  ticksGap: 1,
});

defineEmits<{
  (e: 'select', index: number): void
}>()

const sortedValues = $computed(() => 
  [...props.values].sort((a, b) => a.value - b.value))

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
        v-for="(value, i) in sortedValues"
        v-model="value.value"
        :key="i"
        :range="range"
        :limit="getLimit(i)"
        :step="step"
        :label="value.label || ''"
        :unit="unit"
        :showTicks="showTicks"
        :ticksGap="ticksGap"
        :locked="locked || value.locked"
        clickable
        @select="$emit('select', i)"
      />
    </div>
  </div>
</template>

<style lang="scss">
  @import "./SliderMultiple.scss";
</style>