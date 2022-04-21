<script lang="ts" setup>
import { reactive } from 'vue';
import { TokenSection } from '.';
import { useGuttersStore, useSizesStore } from '@/store';
import { SliderMultiple } from '@/components';
import { Gutter, RootSizeName, RootSize } from '@/api/tokens/index.types';

const store = useGuttersStore()
const sizesStore = useSizesStore()

const data = reactive({
  showDetails: false,
  selectedGutter: null as Gutter | null,
  isEditing: false,
})

const gutters = $computed(() => store.gutters)
const rootSizes = $computed(() => sizesStore.rootSizes)
const allowCreateGutters = $computed(() => !!rootSizes.length)

async function onCreate(size: 'smaller' | 'bigger') {
  if (confirm('Do you really want to create a new gutter?')) {
    await store.createGutter(size)
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
          v-if="gutters.length"
          :locked="!allowCreateGutters"
          :title="!allowCreateGutters ? 'Please, create a root size before continuing with gutters.' : ''"
          @click="onCreate('smaller')"
        >Create smaller</Button>
        <Button 
          :locked="!allowCreateGutters"
          :title="!allowCreateGutters ? 'Please, create a root size before continuing with gutters.' : ''"
          @click="onCreate('bigger')"
        >Create {{ gutters.length ? 'bigger' : 'new' }}</Button>
      </template>
    </template>
    <section class="gutter-tokens">
      <div class="gutter-tokens__content">
        <template v-if="gutters.length">
          <Table 
            :rows="gutters" 
            :columns="rootSizes"
            @rowSelected="onDetails($event)"
          >
            <template #header="{ column }: { column: RootSize }">
              {{ column.name }}<br/><small>[{{ column.value }}px]</small>
            </template>
            <template #row-header="{ row: gutter }: { row: Gutter }">{{ gutter.name }}</template> 
            <template #cell="{ row: gutter, column: size }: { row: Gutter, column: RootSize }">
              <div class="gutter-tokens__sample">
                <span class="gutter-tokens__sample__value">{{ gutter.value * size.value }}</span>
                <div 
                  class="gutter-tokens__sample__gutter"
                  :title="`${size.name} - ${gutter.name}\n${gutter.value * size.value} px`"
                  :style="{ 
                    width: gutter.value * size.value, 
                    height: gutter.value * size.value, 
                  }"
                /> 
              </div>
            </template>
          </Table>
          <SliderMultiple
            label="Gutters"
            :values="gutters"
            :range="[0, 10]"
            :limit="[0.25, 10]"
            :ticksGap="4"
            :step="0.25"
            :verticalHeight="600"
            :tickBuilder="(i) => `${i} rem`"
            :titleBuilder="(i, l) => `${l.name}\n${i} rem`"
            @select="(i) => onDetails(gutters[i])"
            reverse
            showTicks
          />
        </template>
        <p v-else>No gutters available.</p>
        <p v-if="!allowCreateGutters">Gutters need to have at least one root size.</p>
      </div>
    </section>
  </TokenSection>
  <Modal v-model="data.selectedGutter">
    {{ data.selectedGutter }}
    <div class="button-group">
      <Button
        btnType="danger"
        @click="onDelete"
      >Delete</Button>
    </div>
  </Modal>
</template>

<style lang="scss">
  $radius: 4px;

  .gutter-tokens {

    &__content {
      display: grid;
      grid-template-columns: 1fr;
      grid-auto-flow: column;
      grid-auto-columns: max-content;
      column-gap: 30px;
    }

    table.table {
      tr th {
        cursor: pointer;
      }
    }

    &__sample {
      display: grid;
      grid-template-columns: 40px 1fr;
      column-gap: 5px;
      align-items: center;

      &__value {
        text-align: right;
        font-size: 11px;
        font-weight: bold;
      }
      &__gutter {
        background-color: var(--color-dark);
        cursor: pointer;
      }
    }
  }
</style>