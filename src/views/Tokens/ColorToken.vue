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

const title = $computed(() => 
  Object.entries(props.color.colorSpaces)
    .map(([k, v]) => `${k}: ${v};`).join('\n'))

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
      <span class="color-token__sample"></span>
      <span
        class="color-token__label truncate"
        :title="color.alternativeText || `${color.colorName} - ${color.colorShadow}`"
      >
        {{ color.alternativeText || color.colorShadow }}
        <ErrorsBadge :errors="color.errors"/>
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
  }

  &__sample {
    background-color: var(--color);
    width: $sample-size;
    height: $sample-size;
    border-radius: calc($sample-size / 2);
    cursor: pointer;
  }

  &__label {
    width: 20px;
    font-size: 12px;
    font-weight: bold;
  }

  .errors-badge {
    left: calc($sample-size - 6px);
    bottom: -2px;
  }

  .color-picker {
    width: 100%;
    padding: 0;
    margin-bottom: 10px;
  }
}
</style>
