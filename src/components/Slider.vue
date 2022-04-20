<script lang="ts" setup>import { StyleValue } from 'vue';

interface Props {
  /** */
  modelValue: number;
  /** */
  label: string;
  /** */
  range?: [number, number];
  /** */
  locked?: boolean;
  /** */
  step?: number;
  /** */
  limit?: [number | null, number | null];
  /** */
  showTicks?: boolean;
  /** */
  ticksGap?: number;
  /** */
  clickable?: boolean;
  /** */
  reverse?: boolean;
  /** */
  titleBuilder?: (value: number, ...args: any[]) => string;
  /** */
  tickBuilder?: (value: number, ...args: any[]) => string;
  /** */
  verticalHeight?: number;
}

const props = withDefaults(defineProps<Props>(), {
  range: () => [0, 100],
  locked: false,
  step: 1,
  showTicks: false,
  ticksGap: 1,
  clickable: false,
  reverse: false,
});

const id = `slider-${Math.random() * 1_000_000}`

const emits = defineEmits<{
  (e: 'update:modelValue', modelValue: number): void
  (e: 'select'): void
}>()

const min = $computed(() => props.limit?.[0] ?? props.range[0])
const max = $computed(() => props.limit?.[1] ?? props.range[1])
const rangeValue = $computed(() => props.range[1] - props.range[0])

const options = $computed(() => {
  return new Array((rangeValue / props.step) + 1)
    .fill(0)
    .map((_, i) => props.range[0] + (i * props.step))
})

const paddingLimits: StyleValue = $computed(() => {
  if (!props.limit) return {}

  const [pMin, pMax] = [min - props.range[0], props.range[1] - max]

  if (props.verticalHeight) {
    const gap = props.verticalHeight / rangeValue;
    const correction = 1 - (16 / props.verticalHeight) 
    const [pBottom, pTop] = [pMin, pMax]
      .map((x) => x ? `${(x * gap * correction)}px` : '0')

   
    return { 'padding-bottom': pBottom, 'padding-top': pTop }
  }

  const [pLeft, pRight] = [pMin, pMax]
    .map((x) =>  x ? `calc(${x * (100 / rangeValue) * 0.976}%)` : '0')
  return { 'padding-left': pLeft, 'padding-right': pRight }
})
const title = $computed(() => 
  props.titleBuilder?.(props.modelValue) || props.modelValue.toString())


function onInput (e: Event) {
  emits('update:modelValue', (e.target as HTMLInputElement).valueAsNumber)
}
</script>

<template>
  <div 
    class="slider" 
    :class="{ vertical: !!verticalHeight }"
    :style="{ '--height': `${verticalHeight || 0}px` }"
    :data-limit="[min, max]"
  >
    <label 
      class="slider__label" 
      :for="label"
      style="grid-area: label"
    >{{ label }}</label>
     <div 
      class="ticks" 
      v-if="showTicks"
      :style="{ 
        'grid-area': 'ticks',
        'margin': verticalHeight 
          ? `-${(verticalHeight / (options.length * 2)) - 8}px 0` 
          : `0 calc(-${50 / options.length}% + ${8}px)`}"
    >
      <span 
        class="o_txt"
        v-for="(option, i) in options"
        :class="{ long: !(i % ticksGap) }"
        :key="i"
      >{{ i % ticksGap ? '' : (tickBuilder?.(option) || option) }}</span>
    </div>
    <div 
      class="slider__inputs"
      style="grid-area: inputs"
    >
      <div class="slider__reference"/>
      <input 
        type="range" 
        :class="{ limited: !!limit }"
        :style="paddingLimits"
        :title="title"
        :name="label"
        :min="min" 
        :max="max" 
        :value="modelValue" 
        :disabled="locked"
        :step="step"
        :list="id"
        :orient="verticalHeight ? 'vertical' : 'horizontal'"
        @input="onInput"
        @dblclick="$emit('select')"
      >
      <span 
        class="slider__clickable"
        v-if="locked && clickable" 
        :title="title"
        :style="{ left: `${(100 * 0.976 * (modelValue - range[0])) / rangeValue}%` }"
        @dblclick="$emit('select')"/>
    </div>
    <datalist :id="id">
      <option v-for="(_, i) in options" :key="i"/>
    </datalist>
  </div>
</template>

<style lang="scss">
  @import "./Slider.scss";
</style>
