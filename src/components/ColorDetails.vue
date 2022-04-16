<script lang="ts" setup>
import { reactive, watch } from 'vue';
import { hex } from 'color-convert';

import { Broker } from '@/worker.api';
import type { SolidColor, SolidColorInfo, Color } from '@client/styles/index.types';
import { Modal, Button } from '.';

const props = defineProps<{
  /** */
  modelValue: boolean;
  /** */
  color: SolidColor;
}>()

const emits = defineEmits<{
  (e: 'update:modelValue', modelValue: boolean): void
}>()

const data = reactive({
  isEditing: false,
  newColor: '',
  newColorInfo: null as SolidColorInfo | null
})

const colorPicked = $computed(() => 
  data.newColor && data.newColorInfo ? data.newColorInfo : props.color)

function hexToRgb (hex: string): Color {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!result) throw new Error('')
  return {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  };
}

async function onDelete () {
  if (window.confirm('Are you sure?')) {
    await Broker.deleteSolidColor({ id: props.color.id })
    onFinish()
  }
}

watch(() => props.modelValue, () => {
  data.newColor = '';
})

async function onEdit () {
  if (!data.isEditing) {
    data.newColor = props.color.colorSpaces.HEX.toString()
    return data.isEditing = true
  }
  if (window.confirm('Are you sure?')) {
    const RGB = hexToRgb(data.newColor)
    await Broker.modifySolidColor({ id: props.color.id, color: RGB })
    onFinish()
  }
}

async function updateColorInfo () { 
  if (data.isEditing && data.newColor) {
    const RGB = hexToRgb(data.newColor)
    data.newColorInfo = await Broker.getColorInfo(RGB)
  }
}

function onFinish() {
  emits('update:modelValue', false)
  data.newColor = '';
}
</script>

<template>
  <Modal 
    :modelValue="props.modelValue"
    @update:modelValue="$emit('update:modelValue', $event)"
    :title="`${colorPicked.colorName}/${colorPicked.colorShadow}`"
  >
    <template #header>
      <span class="color__sample" :style="{ '--color': colorPicked.colorSpaces.HEX }"></span>
    </template>
    <template #default>
      <code class="color-id">{{ color.id }}</code>
      <p>{{ color.description }}</p>
      <dl class="color-info">
        <div><dt>HEX:</dt><dd>{{ colorPicked.colorSpaces.HEX }}</dd></div>
        <div><dt>RGB:</dt><dd>{{ colorPicked.colorSpaces.RGB }}</dd></div>
        <div><dt>HSL:</dt><dd>{{ colorPicked.colorSpaces.HSL }}</dd></div>
        <div><dt>LCH:</dt><dd>{{ colorPicked.colorSpaces.LCH }}</dd></div>
        <div><dt>Lab:</dt><dd>{{ colorPicked.colorSpaces.Lab }}</dd></div>
        <div><dt>Grey:</dt><dd>{{ colorPicked.colorSpaces.Grey }}</dd></div>
      </dl>
      <div v-if="data.isEditing">
        <input 
          class="color-picker" 
          type="color" 
          v-model="data.newColor" 
          @input="updateColorInfo()"
        >
      </div>
      <div class="color-info__actions">
        <Button @click="onEdit()">{{ data.isEditing ? 'Confirm' : 'Edit' }}</Button>
        <Button @click="onDelete()" v-if="!data.isEditing">Delete</Button>
      </div>
    </template>
  </Modal>
</template>

<style lang="scss">
  $sample-size: 20px;
  
  code.color-id {
    font-size: 12px;
  }

  .color-info {
    display: grid;
    row-gap: 5px;

    div {
      display: grid;
      grid-template-columns: 1fr max-content;
    }
    dt {
      font-weight: bold;
      font-size: 14px;
    }
    &__action {
      display: grid;
      justify-items: right;
    }
  }
  .color__sample {
    background-color: var(--color);
    width: $sample-size;
    height: $sample-size;
    border-radius: calc($sample-size / 2);
  }
</style>