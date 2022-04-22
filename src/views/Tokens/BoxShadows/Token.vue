<script lang="ts" setup>
import type { BoxShadowStyle, Shadow } from '@/api/tokens/index.types';

interface Props {
  boxShadow: BoxShadowStyle;
}

const props = defineProps<Props>();

const shadow = $computed(() => {
  const s = props.boxShadow;
  if (!s.dropShadows.length && !s.innerShadows.length) return {}
  return {
    'box-shadow': [
      ...s.dropShadows.map((s) => shadowToValue(s)),
      ...s.innerShadows.map((s) => `inset ${shadowToValue(s)}`),
    ].join(',')
  }
})

const title = $computed(() => 
  Object.entries(shadow).map(([k, v]) => 
      `${k}: ${v.includes(',') ? '\n  ' : ''}${v.replaceAll(',', ',\n  ')};`
    ).join('\n'))

function shadowToValue (s: Shadow) {
  const values = [s.x, s.y, s.blur, s.spread]
    .map((x) => x ? `${x.toFixed(1)}px` : 0).join(' ')
  return `${values} ${s.color.HEX}`;
}
</script>

<template>
  <div class="box-show-token">
    <div 
      class="box-show-token__sample"
      :style="shadow"
      :title="title"
    >
      <ErrorsBadge :errors="boxShadow.errors"/>
    </div>
    <label 
      class="box-show-token__label truncate"
      :title="boxShadow.alternativeText || boxShadow.level.toString()"
    >{{ boxShadow.alternativeText || boxShadow.level }}</label>
  </div>
</template>

<style lang="scss">
  $sample-size: 36px;

  .box-show-token {
    display: grid;
    justify-items: center;
    width: min-content;
    row-gap: 5px;

    &__sample {
      position: relative;
      width: $sample-size;
      height: $sample-size;
      margin: 12px;
      border-top-right-radius: 4px;
      cursor: pointer;
    }

    &__label {
      width: 100%;
      text-align: center;
      font-weight: bold;;
    }

    .errors-badge {
      bottom: -5px;
      right: -5px;
    }
  }

</style>
