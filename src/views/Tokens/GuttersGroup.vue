<script lang="ts" setup>
import { reactive } from 'vue';
import { TokenSection } from '.';
import { useGuttersStore, useSizesStore } from '@/store';
import { SliderMultiple } from '@/components';
import { Gutter, RootSizeName } from '@/api/styles/index.types';

const store = useGuttersStore()
const sizesStore = useSizesStore()

const data = reactive({
  showDetails: false,
  selectedGutter: null as Gutter | null,
  isEditing: false,
})

const gutters = $computed(() => store.gutters)
const allowCreateGutters = $computed(() => !!sizesStore.rootSizes.length)
const baseSize = $computed(() => {
  const reference: RootSizeName = 'Medium' as RootSizeName
  const mediumSize = sizesStore.rootSizes.find((x) => x.name === reference)?.value
  return mediumSize || 14
})

async function onCreate() {
  if (confirm('Do you really want to create a new root size?')) {
    await store.createGutter()
  }
}

function onDetails (size: Gutter) {
  data.selectedGutter = size;
  data.showDetails = true;
}

async function onDelete () {
  if (!data.selectedGutter) throw new Error('');
  if (confirm('Are you sure?')) {
    await store.deleteGutter(data.selectedGutter);
    data.selectedGutter = null;
    data.showDetails = false;
  }
}

function onEdit () {
  store.gutters = gutters
    .map((s) => ({...s, locked: false }))
  data.isEditing = true;
}

async function onConfirmEdit () {
  await store.modifyGutters(gutters);
  data.isEditing = false;
}

async function onCancelEdit () {
  data.isEditing = false;
  await store.fetchGutters();
}
const x = $ref([{ value: 5, name: 'XXX', locked: false },{ value: 7, name: 'XXX', locked: false }])
const test = $ref(5)
</script>

<template>
  <TokenSection 
    title="Gutters"
    description="..."
  >
    <template #header>
      <template v-if="data.isEditing">
        <Button 
          btnType="danger"
          hollow
          @click="onCancelEdit"
        >Cancel</Button> 
        <Button 
          btnType="info"
          @click="onConfirmEdit"
        >Confirm</Button>
      </template>
      <template v-else>
        <Button 
          hollow 
          :locked="!gutters.length"
          @click="onEdit"
        >Edit values</Button>
        <Button 
          :locked="!allowCreateGutters"
          :title="!allowCreateGutters ? 'Please, create a root size before continuing with gutters.' : ''"
          @click="onCreate"
        >Create new</Button>
      </template>
    </template>
    <section class="gutter-tokens">
      <div class="gutter-tokens__content">
        <template v-if="gutters.length">
          <div class="gutter-tokens__list">
            <article 
              class="gutter-tokens__token"
              v-for="(gutter, i) in gutters"
              :key="i"
            >
              <span>{{ gutter.name }}</span>  
              <div 
                class="gutter-tokens__sample"
                :style="{ 
                  width: gutter.value * baseSize, 
                  height: gutter.value * baseSize, 
                }"
              /> 
            </article>
          </div>
          <SliderMultiple
            label="Gutters"
            :values="gutters"
            :range="[0, 10]"
            :ticksGap="4"
            :step="0.25"
            :verticalHeight="450"
            :tickBuilder="(i) => `${i}px`"
            :titleBuilder="(i, l) => `${l.name}\n${i}px`"
            @select="(i) => onDetails(gutters[i])"
            reverse
            showTicks
          />
        </template>
        <p v-else>No gutters available</p>
      </div>
    </section>
  </TokenSection>
</template>

<style lang="scss">
  $radius: 4px;

  .gutter-tokens {

    &__content {
      display: grid;
      grid-template-columns: 1fr;
      grid-auto-flow: column;
      grid-auto-columns: max-content;
    }
    &__list {
      display: grid;
      row-gap: 10px;
    }
    &__token {
      display: grid;
      align-items: center;
      grid-template-columns: 1fr 3fr;
    }
    &__sample {
      background-color: var(--color-dark);
    }
  }
</style>