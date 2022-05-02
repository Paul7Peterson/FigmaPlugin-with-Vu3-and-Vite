<script lang="ts" setup>
import { reactive, watch } from 'vue';
import type { SolidColorInfo } from '~api/tokens/index.types';
import { useColorsStore } from '~ui/store';

const store = useColorsStore();

interface Props {
  /** */
  modelValue: boolean;
  /** */
  color: SolidColorInfo;
}

const props = defineProps<Props>();

const emits = defineEmits<{
  (e: 'update:modelValue', modelValue: boolean): void;
}>();

const newColor: SolidColorInfo | null = $computed(() => store.newColor);

const data = reactive({
  colorToCreate: props.color.colorSpaces.HEX,
  // newColorInfo: null as SolidColorInfo | null
});

watch(() => data.colorToCreate, () => {
  store.setNewColor(data.colorToCreate);
});

async function onConfirm () {
  // data.newColor = props.color.colorSpaces.HEX;
  if (window.confirm('Are you sure to create this color token?')) {
    newColor
      ? await store.createOrModifyColor(newColor?.colorSpaces.HEX)
      : console.error(`no new Color selected.`);
    onFinish();
  }
}

async function updateColorInfo () {
  await store.setNewColor(data.colorToCreate);
}

function onFinish () {
  emits('update:modelValue', false);
  store.setNewColor(null);
}
</script>

<template>
  <Modal v-if="newColor" :modelValue="props.modelValue" @update:modelValue="onFinish()">
    <template #header>
      <header id="color-details__header">
        <span class="color__sample" :style="{ '--color': newColor.colorSpaces.HEX }"></span>
        <h3>{{ `${newColor.colorName}/${newColor.colorShadow}` }}</h3>
      </header>
    </template>
    <DescriptionList :data="newColor.colorSpaces" />
    <input class="color-picker" type="color" v-model="data.colorToCreate" @input="updateColorInfo()">

    <template #actions>
      <Button btnType="info" @click="onConfirm()">Confirm</Button>
      <Button btnType="danger" @click="onFinish()">Cancel</Button>
    </template>
  </Modal>
</template>

<style lang="scss">
$sample-size: 20px;

.color-token {
  --color: transparent;
}

#color-details__header {
  display: grid;
  grid-template-columns: max-content 1fr max-content;
  column-gap: 10px;
  align-items: center;
  min-width: 200px;
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

.color-picker {
  width: 100%;
  padding: 0;
  margin-bottom: 10px;
}
</style>
