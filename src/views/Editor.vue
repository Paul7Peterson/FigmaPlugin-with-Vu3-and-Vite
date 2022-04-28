<script lang="ts" setup>
import { onBeforeMount, reactive, watch } from 'vue';
import { NodeInfo } from '~api/nodes/_shared.types';
import { Gutter } from '../../api/tokens';
import NumberSelect from '../components/NumberSelect.vue';
import { useAppStore, useEditorStore } from '../store';
import NodeIcon from './Editor/NodeIcon.vue';

const appStore = useAppStore()
const store = useEditorStore()

const selectedNode = $computed(() => store.selectedNode)
const rootSize = $computed(() => appStore.projectConfig.projectSize)
const appliedGutters = $computed(() => store.getAppliedGutters())

const data = reactive({
  gap: null as number | null,
  padding: null as null | NodeInfo['padding']
})

watch(() => [data.gap] , () => { 
  if (typeof data.gap === 'number') {
    const gutter = getGutter(data.gap)
    if (!gutter) return
    store.editGap({ rootSize, gutter }) 
  }
})

watch(() => [
  data.padding?.top, 
  data.padding?.right, 
  data.padding?.bottom, 
  data.padding?.left
  ] , () => { 
  if (data.padding) {
    const { top, right, bottom, left } = data.padding
    const [pT, pR, pB, pL] = [getGutter(top), getGutter(right), getGutter(bottom), getGutter(left)] 
    if (!(pT && pR && pB && pL)) return
    store.editPadding([
      { rootSize, gutter: pT },
      { rootSize, gutter: pR },
      { rootSize, gutter: pB },
      { rootSize, gutter: pL },
    ]) 
  }
})

watch(() => [selectedNode], setValues)

function setValues () {
  if (store.selectedNode) {
    const { gap, padding } = store.selectedNode;
    
    data.gap = gap ?? null;
    data.padding = padding
  }
}

function getGutter (value: number): Gutter | null {
  const gutter = appliedGutters.find((g) => g.value === value)
  if (!gutter) return null
  return gutter
}

onBeforeMount(() => { 
  setValues();
  console.log(appliedGutters);
  
})
</script>

<template>
  <section 
    id="editor"
    v-if="selectedNode"
  >
    <header>
      <NodeIcon :node="selectedNode"/>
      <h3>{{ selectedNode.name }}</h3>
      <code>{{ selectedNode.id }}</code>
      <Button 
        hollow 
        @click="store.onCancelNodeSelection"
      >X</Button>
    </header>
    <main>
      <NumberSelect 
        v-if="data.gap !== null"
        v-model="data.gap" 
        :options="appliedGutters"
        label="gap"
      />
      <template v-if="data.padding">
        <NumberSelect 
          v-model="data.padding.top"  
          :locked="!data.padding" 
          :options="appliedGutters"
          label="Padding top"
        />
        <NumberSelect 
          v-model="data.padding.right" 
          :locked="!data.padding" 
          :options="appliedGutters" 
          label="Padding right"
        />
        <NumberSelect 
          v-model="data.padding.bottom"  
          :locked="!data.padding" 
          :options="appliedGutters"
          label="Padding bottom"
        />
        <NumberSelect 
          v-model="data.padding.left"  
          :locked="!data.padding" 
          :options="appliedGutters"
          label="Padding left"
        />
      </template>
    </main>
  </section>
</template>

<style lang="scss">
  #editor {
    header {
      display: grid;
      grid-template-columns: max-content 1fr max-content max-content;
      column-gap: 10px;
      align-items: center;
    }
    main {
      display: grid;
      row-gap: 5px;
    }
  }
</style>
