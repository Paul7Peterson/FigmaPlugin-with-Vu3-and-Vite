<script lang="ts" setup>
import type { FontStyle } from '~api/tokens/index.types';

interface Props {
  /** */
  fontStyle: FontStyle;
}

const props = defineProps<Props>();

const rootFontSize = $computed(() => {
  const value = document.documentElement.style
    .getPropertyValue('font-size')?.replace('px','')
  return value ? parseInt(value) : 14;
})

const style: Record<string, any> = $computed(() => {
  const f = props.fontStyle
  let fontStyle = 'not evaluated';
  switch (f.fontWeight) {
    case 300: fontStyle = 'light';
      break;
    case 500: fontStyle = 'medium';
      break;
    case 700: fontStyle = 'bold';
      break;
    default: fontStyle = 'regular';
      break;
  }

  const result = {
    'font-family': f.fontFamily,
    'font-weight': f.fontWeight,
    'font-style': fontStyle,
    'font-size': `${(f.fontSize / rootFontSize).toFixed(1)}rem`,
    'text-decoration': f.textDecorationCSS,
    'line-height': f.lineHeightCSS,
    'letter-spacing': f.letterSpacingCSS,
  }
  if (f.isItalic) result['font-style'] = 'italic';
  return result
})

const title = $computed(() =>
  Object.entries(style)
    .map(([k, v]) => `${k}: ${v};`).join('\n'))
const sampleText = 'Abc'
</script>

<template>
  <div class="font-style-token">
    <label class="font-style-token__label">
      {{ fontStyle.name }}
      <ErrorsBadge :errors="fontStyle.errors"/>
    </label>
    <div
      class="font-style-token__sample"
      :style="style"
      :title="title"
    ><span>{{ sampleText }}</span></div>
  </div>
</template>

<style lang="scss">
  $sample-size: 20px;
  $padding-left: 14px;

  .font-style-token {
    display: grid;
    grid-template-columns: 1fr max-content;
    align-items: center;
    width: 100%;

    &__label {
      position: relative;
      padding-left: $padding-left;
      font-weight: bold;;
    }
    &__sample {
      cursor: pointer;

      span {
        border: 1px solid #888
      }
    }
    .errors-badge {
      left: 0;
    }
  }

</style>
