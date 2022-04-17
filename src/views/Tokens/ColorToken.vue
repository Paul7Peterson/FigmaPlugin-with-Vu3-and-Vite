<script lang="ts" setup>
import { reactive } from "vue";

import type { SolidColor } from "@api/styles/index.types";
import ColorDetails from "./ColorDetails.vue";

const props = defineProps<{
  /** */
  color: SolidColor;
}>();

defineEmits<{
  (e: "rerender"): void;
}>();

const data = reactive({
  showModal: false,
  isEditing: false,
});

const title = $computed(
  () => `
  RGB: ${props.color.colorSpaces.RGB}
  HEX: ${props.color.colorSpaces.HEX}
  HSL: ${props.color.colorSpaces.HSL}
`
);
</script>

<template>
  <div 
    class="color-token" 
    :style="{ '--color': color.colorSpaces.HEX }"
  >
    <div 
      class="color-token__slot" 
      :title="title" 
      @click="data.showModal = true"
    >
      <span class="color__sample"></span>
      <span
        class="color-token__label"
        :title="color.alternativeText || `${color.colorName} - ${color.colorShadow}`"
      >
        {{ color.alternativeText || color.colorShadow }}
        <span 
          class="error-warning" 
          v-if="color.errors.length"
          :title="color.errors.join('\n')"
        >🟡</span>
      </span>
    </div>
    <ColorDetails 
      v-model="data.showModal" 
      :color="color" 
      @rerender="$emit('rerender')" 
    />
  </div>
</template>

<style lang="scss">
$sample-size: 20px;

.color-token {
  --color: transparent;

  &__slot {
    display: grid;
    position: relative;
    grid-template-columns: max-content 1fr;
    align-items: center;
    column-gap: 5px;
    cursor: pointer;
  }

  &__sample {
    background-color: var(--color);
    width: $sample-size;
    height: $sample-size;
    border-radius: calc($sample-size / 2);
  }
  &__label {
    width: 20px;
    font-size: 12px;
    font-weight: bold;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;

  }
  .error-warning {
    position: absolute;
    left: calc($sample-size - 6px);
    bottom: -2px;
    font-size: 8px;
  }

  .color-picker {
    width: 100%;
    padding: 0;
    margin-bottom: 10px;
  }
}
</style>
