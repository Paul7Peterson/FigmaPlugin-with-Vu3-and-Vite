<script lang="ts" setup>
import { onErrorCaptured } from 'vue';
import { Slider } from '~/components';

interface Value {
  /** */
  value: number;
  /** */
  label?: string;
  /** */
  locked?: boolean;
  /** */
  name?: string;
}

interface Props {
  /** */
  values: Value[];
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
  reverse?: boolean;
  /** */
  ticksGap?: number;
  /** */
  titleBuilder?: (value: number, instance: Value) => string;
  /** */
  tickBuilder?: (value: number, instance: Value) => string;
  /** */
  verticalHeight?: number;
}

const props = withDefaults(defineProps<Props>(), {
  range: () => [0, 100],
  locked: false,
  step: 1,
  showTicks: false,
  ticksGap: 1,
  reverse: false,
});

defineEmits<{
  (e: 'select', index: number): void
}>()

const sortedValues = $computed(() => {
  return [...props.values].sort((a, b) => a.value - b.value)
})

function getLimit(index: number): [number, number] {
  const [lMin, lMax] = [
    props.limit?.[0] || props.range[0],
    props.limit?.[1] || props.range[1],
  ]
  const [prev, next] = [
    sortedValues[index - 1]?.value, 
    sortedValues[index + 1]?.value,
  ]
  return [
    prev ? (prev - props.step) : lMin,
    next ? (next + props.step) : lMax,
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
        :titleBuilder="titleBuilder && ((i) => titleBuilder(i, value))"
        :tickBuilder="titleBuilder && ((i) => tickBuilder(i, value))"
        :verticalHeight="verticalHeight"
        :reverse="reverse"
        clickable
        @select="$emit('select', i)"
      />
    </div>
  </div>
</template>

<style lang="scss">
  @import "./SliderMultiple.scss";
</style>