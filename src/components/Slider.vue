<script lang="ts" setup>
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
  titleBuilder?: (value: number) => string;
  /** */
  tickBuilder?: (value: number) => string;
}

const props = withDefaults(defineProps<Props>(), {
  range: () => [0, 100],
  locked: false,
  step: 1,
  showTicks: false,
  ticksGap: 1,
  clickable: false,
});

const id = `slider-${Math.random() * 1_000_000}`

const emits = defineEmits<{
  (e: 'update:modelValue', modelValue: number): void
  (e: 'select'): void
}>()

const min = $computed(() => props.limit?.[0] || props.range[0])
const max = $computed(() => props.limit?.[1] || props.range[1])
const rangeValue = $computed(() => props.range[1] - props.range[0])
const sideGap = $computed(() => `(${50 / (rangeValue + 1)}% - ${8}px)`)
const minPadding = $computed(() => ((min - props.range[0]) * 100) / (rangeValue + 1))
const maxPadding = $computed(() => ((props.range[1] - max) * 100) / (rangeValue + 1))

const title = $computed(() => props.titleBuilder?.(props.modelValue) || props.modelValue.toString())

const options = $computed(() => {
  return new Array((rangeValue / props.step) + 1)
    .fill(0)
    .map((_, i) => props.range[0] + (i * props.step))
})

function onInput (e: Event) {
  emits('update:modelValue', (e.target as HTMLInputElement).valueAsNumber)
}
</script>

<template>
  <div 
    class="slider__container" 
    :data-limit="[min, max]"
  >
    <label 
      class="slider__label" 
      :for="label"
    >{{ label }}</label>
    <div class="slider__inputs" >
      <div class="slider__reference"/>
      <input 
        type="range" 
        class="slider"
        :class="{ limited: !!limit }"
        :style="{ 
          'padding-left': `calc(${sideGap} + ${minPadding}%)`, 
          'padding-right': `calc(${sideGap} + ${maxPadding}%)`, 
        }"
        :title="title"
        :name="label"
        :min="min" 
        :max="max" 
        :value="modelValue" 
        :disabled="locked"
        :step="step"
        :list="id"
        @input="onInput"
        @dblclick="$emit('select')"
      >
      <span 
        class="slider__clickable"
        v-if="locked && clickable" 
        :title="title"
        :style="{ 
          left: `calc(${sideGap} + ${((modelValue - props.range[0]) * 100) / (rangeValue + 1)}%)`, 
        }"
        @dblclick="$emit('select')"/>
    </div>
    <div class="ticks" v-if="showTicks">
      <span 
        class="o_txt"
        v-for="(option, i) in options"
        :class="{ long: !(i % ticksGap) }"
        :key="i">{{ i % ticksGap ? '' : (tickBuilder?.(option) || option) }}</span>
    </div>
    <datalist :id="id">
      <option 
        v-for="(option, i) in options"
        :key="i"
      >{{ option }}</option>
    </datalist>
  </div>
</template>
