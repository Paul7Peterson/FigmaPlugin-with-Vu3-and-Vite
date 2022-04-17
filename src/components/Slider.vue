<script lang="ts" setup>
interface Props {
  /** */
  modelValue: number;
  /** */
  label: string;
  /** */
  range?: [number, number];
  /** */
  disabled?: boolean;
  /** */
  step?: number;
  /** */
  limit?: [number | null, number | null];
  /** */
  unit?: string;
}

const props = withDefaults(defineProps<Props>(), {
  range: () => [0, 100],
  disabled: false,
  step: 1,
});

const id = `s-${(Math.random() * 1_000_000).toFixed()}`

const emits = defineEmits<{
  (e: 'update:modelValue', modelValue: number): void
}>()

const min = $computed(() => props.limit?.[0] || props.range[0])
const max = $computed(() => props.limit?.[1] || props.range[1])
const rangeValue = $computed(() => props.range[1] - props.range[0])
const minPadding = $computed(() => ((min - props.range[0]) * 100) / rangeValue)
const maxPadding = $computed(() => ((props.range[1] - max) * 100) / rangeValue)

function onInput (e: Event) {
  let value = (e.target as HTMLInputElement).valueAsNumber
  emits('update:modelValue', value)
}
</script>

<template>
  <div class="slider__container" :data-limit="[min, max]">
    <div class="slider__reference"/>
    <label 
      class="slider__label" 
      :for="label"
    >"{{ label }}</label>
    <input 
      type="range" 
      class="slider"
      :class="{ limited: !!limit }"
      :style="{ 
        'padding-left': `${minPadding}%`, 
        'padding-right': `${maxPadding}%`,
      }"
      :title="modelValue.toString()"
      :name="label"
      :min="min" 
      :max="max" 
      :value="modelValue" 
      :disabled="disabled"
      :step="step"
      @input="onInput"
    />
  </div>
</template>

<style lang="scss">
  $thumb-size: 20px;
  $thumb-color: var(--color-dark);
  $track-color: #ccc;
  $track-color-limited: #888;
  $track-height: calc($thumb-size / 3);

  .slider {
    -webkit-appearance: none;
    appearance: none;
    background: transparent;
    width: 100%;
    cursor: pointer;
    margin: 0;

    &::-webkit-slider-runnable-track {
      background: $track-color;
      height: $track-height;
      border-radius: calc($track-height / 2);
      z-index: 50;
    }

    &::-moz-range-track {
      background: $track-color;
      height: $track-height;
      border-radius: calc($track-height / 2);
      z-index: 50;
    }

    &::-webkit-slider-thumb {
      -webkit-appearance: none; /* Override default look */
      appearance: none;
      margin-top: calc(-1 * (($thumb-size / 2) - ($track-height / 2))); /* Centers thumb on the track */
      background-color: #5cd5eb;
      height: $thumb-size;
      width: $thumb-size;   
      border-radius: 50%; 
      background-color: $thumb-color;
      z-index: 100;
    }

    &::-moz-range-thumb {
      border: none; /*Removes extra border that FF applies*/
      border-radius: 0; /*Removes default border-radius that FF applies*/
      background-color: #5cd5eb;
      height: $thumb-size;
      width: $thumb-size;
      border-radius: 50%;
      background-color: $thumb-color;
      z-index: 100;
    }

    &:focus {
      outline: none;

      &::-webkit-slider-thumb {
        border: 1px solid #053a5f;
        outline: 3px solid #053a5f;
        outline-offset: 0.125rem;
      }
      &::-moz-range-thumb {
        border: 1px solid #053a5f;
        outline: 3px solid #053a5f;
        outline-offset: 0.125rem;     
      }
    }

    &__container {
      position: relative;
      display: grid;
      width: 100%;
      grid-template-rows: max-content $track-height;
    }
    &__reference {
      width: 100%;
      position: absolute;
      bottom: 0;
      background-color: $track-color;
      height: $track-height;
      border-radius: calc($track-height / 2);
      z-index: 0;
    }

    &.limited {
      &::-webkit-slider-runnable-track {
        background: $track-color-limited;
      }

      &::-moz-range-track {
        background: $track-color-limited;
      }
    }
  }
</style>
