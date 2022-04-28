<script lang="ts" setup>
import { reactive, watch } from 'vue';
import type { SolidColor, SolidColorInfo } from '~api/tokens/index.types';
import { useColorsStore } from '~ui/store';

const store = useColorsStore();

interface Props {
  /** */
  modelValue: boolean;
  /** */
  color: SolidColor;
}

const props = defineProps<Props>();

const emits = defineEmits<{
  (e: 'update:modelValue', modelValue: boolean): void;
}>();

const data = reactive({
  isEditing: false,
  newColor: '',
  newColorInfo: null as SolidColorInfo | null
});

const colorPicked = $computed(() =>
  data.newColor && data.newColorInfo ? data.newColorInfo : props.color);


async function onDelete () {
  if (window.confirm('Are you sure?')) {
    await store.deleteSolidColor(props.color);
    onFinish();
  }
}

watch(() => props.modelValue, () => {
  data.newColor = '';
});

function onCancel () {
  data.newColor = props.color.colorSpaces.HEX;
  updateColorInfo();
  data.isEditing = false;
  onFinish();
}

async function onEdit () {
  if (!data.isEditing) {
    data.newColor = props.color.colorSpaces.HEX;
    return data.isEditing = true;
  }
  if (window.confirm('Are you sure?')) {
    await store.createOrModifyColor(data.newColor, props.color.id);
    onFinish();
  }
}

async function updateColorInfo () {
  if (data.isEditing && data.newColor) {
    data.newColorInfo = await store.getColorInfo(data.newColor);
  }
}

function onFinish () {
  emits('update:modelValue', false);
  data.newColor = '';
}
</script>

<template>
  <Modal :modelValue="props.modelValue" @update:modelValue="$emit('update:modelValue', $event)">
    <template #header>
      <header id="color-details__header">
        <span class="color__sample" :style="{ '--color': colorPicked.colorSpaces.HEX }"></span>
        <h3>{{ `${colorPicked.colorName}/${colorPicked.colorShadow}` }}</h3>
        <span v-if="color.errors.length" class="warning-icon" :title="color.errors.join('\n')">⚠</span>
      </header>
    </template>

    <code class="color-id">{{ color.id }}</code>
    <p>{{ color.description }}</p>
    <DescriptionList :data="colorPicked.colorSpaces" />
    <div v-if="data.isEditing">
      <input class="color-picker" type="color" v-model="data.newColor" @input="updateColorInfo()">
    </div>

    <template #actions>
      <Button btnType="info" @click="onEdit()">{{ data.isEditing ? 'Confirm' : 'Edit' }}</Button>
      <Button v-if="data.isEditing" btnType="danger" @click="onCancel()">Cancel</Button>
      <Button v-if="!data.isEditing" btnType="danger" @click="onDelete()">Delete</Button>
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
