<script lang="ts" setup>
import { onBeforeMount, reactive } from 'vue';
import { useAppStore, useSizesStore } from '../../store';

const store = useAppStore()
const sizeStore = useSizesStore()

const data = reactive({
  isEditing: false,
  projectSize: '',
})

const projectSize = $computed(() => store.projectConfig.projectSize)
const rootSizes = $computed(() => 
  sizeStore.rootSizes.map(({ value, name }) => ({ value, text: name })))

function onEditConfig () {
  data.isEditing = true
}

function onConfirmConfig () {
  if (confirm(`Are you sure?`)) {
    data.isEditing = false
  }
}

function onCancelConfig () {
  data.isEditing = false
}

onBeforeMount(() => {
  data.projectSize = projectSize.value.toString()
})
</script>

<template>
  <section id="project-config">
    <header>
      <h3>Project configuration</h3>
      <div class="button-group" v-if="data.isEditing">
        <Button 
          btnType="danger"
          hollow
          @click="onCancelConfig"
        >Cancel</Button>
        <Button 
          btnType="info"
          @click="onConfirmConfig"
        >Confirm</Button>
      </div>
      <Button 
        v-else 
        @click="onEditConfig"
      >Edit</Button>
    </header>
    <div id="project-config__options">
      <Select 
        label="Project size"
        v-model="data.projectSize" 
        :locked="!data.isEditing"
        :options="rootSizes"
      />
    </div>
  </section>
</template>

<style lang="scss">
  #project-config {
    header {
      display: grid;
      grid-template-columns: 1fr max-content;
      align-items: center;
    }
    &__options {
      display: grid;
      margin: 10px 0;
    }
  }
</style>