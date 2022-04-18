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

const id = `slider-${Math.random() * 1_000_000}`

const emits = defineEmits<{
  (e: 'update:modelValue', modelValue: number): void
}>()

const min = $computed(() => props.limit?.[0] || props.range[0])
const max = $computed(() => props.limit?.[1] || props.range[1])
const rangeValue = $computed(() => props.range[1] - props.range[0])
const sideGap = $computed(() => `(${50 / options.length}% - ${10}px)`)
const proportionWidth = $computed(() => 100 / options.length / options.length)
const minPadding = $computed(() => ((min - props.range[0]) * 100) / rangeValue)
const maxPadding = $computed(() => ((props.range[1] - max) * 100) / rangeValue)

const options = $computed(() => {
  return new Array((rangeValue / props.step) + 1)
    .fill(0)
    .map((_, i) => props.range[0] + (i * props.step))
})

function onInput (e: Event) {
  let value = (e.target as HTMLInputElement).valueAsNumber
  emits('update:modelValue', value)
}
</script>

<template>
  <div class="slider__container" :data-limit="[min, max]">
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
          'padding-left': `calc(${minPadding}% + ${(sideGap)} - ${(min - range[0]) * (proportionWidth)}%)`, 
          'padding-right': `calc(${maxPadding}% + ${(sideGap)} - ${(range[1] - max) * (proportionWidth)}%)`,
        }"
        :title="`${modelValue}${unit || ''}`"
        :name="label"
        :min="min" 
        :max="max" 
        :value="modelValue" 
        :disabled="disabled"
        :step="step"
        :list="id"
        @input="onInput"
      >
    </div>
    <div class="ticks" v-if="showTicks">
      <span 
        class="o_txt"
        v-for="(option, i) in options"
        :class="{ long: !(i % ticksGap) }"
        :key="i">{{ i % ticksGap ? '' : option }}</span>
    </div>
    <datalist :id="id">
      <option 
        v-for="(option, i) in options"
        :key="i"
      >{{ option }}</option>
    </datalist>
  </div>
</template>

<style lang="scss">
  $thumb-size: 20px;
  $thumb-color: var(--color-dark);
  $track-color: #ccc;
  $track-color-limited: #888;
  $track-height: calc($thumb-size / 3);

  @mixin thumb {
    height: $thumb-size;
    width: $thumb-size;   
    border-radius: 50%; 
    background-color: $thumb-color;
    z-index: 100;
  }

  @mixin thumb-focus {
    border: 1px solid #1aaed3;
    outline: 2px solid #1aaed3;
    outline-offset: 0.1rem;
  }

  @mixin track {
    background: $track-color;
    height: $track-height;
    border-radius: calc($track-height / 2);
    z-index: 50;
  }

  .slider {
    -webkit-appearance: none;
    appearance: none;
    background: transparent;
    width: 100%;
    cursor: pointer;
    margin: 0;

    &::-webkit-slider-runnable-track {
      @include track()
    }

    &::-moz-range-track {
      @include track()
    }

    &::-webkit-slider-thumb {
      -webkit-appearance: none; /* Override default look */
      appearance: none;
      margin-top: calc(-1 * (($thumb-size / 2) - ($track-height / 2))); /* Centers thumb on the track */
      @include thumb()
    }

    &::-moz-range-thumb {
      border: none; /*Removes extra border that FF applies*/
      border-radius: 0; /*Removes default border-radius that FF applies*/
      @include thumb()
    }

    &:focus {
      outline: none;

      &::-webkit-slider-thumb {
        @include thumb-focus()
      }
      &::-moz-range-thumb {
        @include thumb-focus()   
      }
    }

    &__inputs {
      position: relative;
    }

    &__container {
      display: grid;
      width: 100%;
      grid-auto-rows: max-content;
      row-gap: calc($thumb-size * 0.254);

      .ticks {
        display: flex;

        .o_txt {
          flex: 1;
          text-align: center;
          font-size: 12px;
          position: relative;

          &::before {
            content: "|";
            position: absolute;
            top: calc(-1 * ($thumb-size * 1.20));
            left: calc(50% - 0.12em);
          }
          &.long::before {
            font-size: 18px;
            top: calc(-1 * ($thumb-size * 1.25));
            font-weight: bold;
          }
        }
      }
    }

    &__reference {
      width: 100%;
      position: absolute;
      bottom: calc(($thumb-size / 2) - ($track-height / 2)) + 1px;
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
