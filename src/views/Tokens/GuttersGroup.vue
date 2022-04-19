<script lang="ts" setup>
import { TokenSection } from '.';
import { useGuttersStore } from '@/store';
import { Details, Slider, SliderMultiple } from '@/components';
import { reactive } from 'vue';
import type { Gutter } from '@/api/styles/index.types';

const store = useGuttersStore()

const data = reactive({
  showDetails: false,
  selectedGutter: null as Gutter | null,
  isEditing: false,
})

const gutters = $computed(() => store.gutters)

async function onCreate() {
  if (confirm('Do you really want to create a new root size?')) {
    await store.createGutter()
  }
}

function onDetails (size: Gutter) {
  data.selectedGutter = size;
  data.showDetails = true;
}

// async function onDelete () {
//   if (!data.selectedGutter) throw new Error('');
//   if (confirm('Are you sure?')) {
//     await store.deleteGutter(data.selectedGutter);
//     data.selectedGutter = null;
//     data.showDetails = false;
//   }
// }

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
        <Button hollow @click="onEdit">Edit values</Button>
        <Button @click="onCreate">Create new</Button>
      </template>
    </template>
    <section class="gutter-tokens">
      <div class="gutter-tokens__list">
        <template v-if="gutters.length">
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
            showTicks
          />
        </template>
        <p>No gutters available</p>
      </div>
    </section>
  </TokenSection>
</template>

<style lang="scss">
  $radius: 4px;

  .gutter-tokens {

    &__list {
      height: max-content;
      margin-bottom: 30px;
    }
  }
</style>