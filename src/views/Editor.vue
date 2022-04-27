<script lang="ts" setup>
import { onBeforeMount, reactive, watch } from 'vue';
import { NodeInfo } from '~api/nodes/_shared.types';
import { useEditorStore } from '../store';
import NodeIcon from './Editor/NodeIcon.vue';

const store = useEditorStore()

const selectedNode = $computed(() => store.selectedNode)

const data = reactive({
  gap: null as number | null,
  padding: null as null | NodeInfo['padding']
})

watch(() => [data.gap] , () => { 
  if (typeof data.gap === 'number') store.editGap(data.gap) 
})

watch(() => [
  data.padding?.top, 
  data.padding?.right, 
  data.padding?.bottom, 
  data.padding?.left
  ] , () => { 
  if (data.padding) {
    console.log('Hey');
    
    const { top, right, bottom, left } = data.padding
    store.editPadding([top, right, bottom, left]) 
  }
})

watch(() => [selectedNode], setValues)

function setValues () {
  if (store.selectedNode) {
    if (typeof store.selectedNode.gap === 'number') data.gap = store.selectedNode.gap;
    if (store.selectedNode.padding) data.padding = store.selectedNode.padding
  }
}

onBeforeMount(() => { 
  setValues()
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
      <NumberInput 
        v-if="typeof data.gap === 'number'" 
        v-model="data.gap" 
        :min="0"
        label="gap"
      />
      <NumberInput 
        v-if="data.padding" 
        v-model="data.padding.top"  
        :min="0"
        label="Padding top"
      />
      <NumberInput 
        v-if="data.padding" 
        v-model="data.padding.right" 
        :min="0" 
        label="Padding right"
      />
      <NumberInput 
        v-if="data.padding" 
        v-model="data.padding.bottom"  
        :min="0"
        label="Padding bottom"
      />
      <NumberInput 
        v-if="data.padding" 
        v-model="data.padding.left" 
        :min="0" 
        label="Padding left"
      />
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
    }
  }
</style>
