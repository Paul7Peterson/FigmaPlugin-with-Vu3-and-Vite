<script lang="ts" setup>
import { reactive, watch } from 'vue';

import { Broker } from '@/worker.api';
import type { SolidColor, SolidColorInfo, Color } from '@api/styles/index.types';
import { useStylesStore } from '@/store';

const store = useStylesStore()

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
    await store.createOrModifyColor(data.newColor, props.color.id)
    onFinish()
  }
}

async function updateColorInfo () { 
  if (data.isEditing && data.newColor) {
    data.newColorInfo = await store.getColorInfo(data.newColor)
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
  >
    <template #header>
      <header id="color-details__header">
        <span class="color__sample" :style="{ '--color': colorPicked.colorSpaces.HEX }"></span>
        <h3>{{ `${colorPicked.colorName}/${colorPicked.colorShadow}` }}</h3>
        <span 
          v-if="color.errors.length" 
          class="warning-icon"
          :title="color.errors.join('\n')"
        >⚠</span>
      </header>
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

  #color-details__header {
    display: grid;
    grid-template-columns: max-content 1fr max-content;
    column-gap: 10px;
    align-items: center;
  }
  
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