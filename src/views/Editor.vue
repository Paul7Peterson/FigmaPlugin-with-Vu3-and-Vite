<script lang="ts" setup>
import { useEditorStore } from '../store';

const store = useEditorStore()

const selectedNode = $computed(() => store.selectedNode)
</script>

<template>
  <section 
    id="editor"
    v-if="selectedNode"
  >
    <header>
      <h2>{{ selectedNode.id }}</h2>
      <Button 
        hollow 
        @click="store.onCancelNodeSelection"
      >X</Button>
    </header>
  </section>
</template>

<style lang="scss">
  #editor {
    header {
      display: grid;
      grid-template-columns: 1fr max-content;
      align-items: center;
    }
  }
</style>
