<script lang="ts" setup>
import { reactive, watch } from 'vue';
import { TokenSection } from '.';
import SizeCreate from './SizeCreate.vue';
import { useStylesStore } from '@/store';

const store = useStylesStore()

const data = reactive({
  showCreateModal: false,
  showEditModal: false,
})

const rootSizes = $computed(() => store.rootSizes)

watch(() => [data.showCreateModal, data.showEditModal], () => {
  store.fetchRootSizes()
})
</script>

<template>
  <TokenSection 
    title="Sizes"
    description="..."
    hasCreate
    @create="data.showCreateModal = true"
  >
    <details 
      class="size-tokens" open
      v-for="(sizes, name) in rootSizes"
      :key="name"
    >
      <summary>
        <span>{{ name }}</span>
      </summary>
      <div class="size-tokens__list">
        <div 
          v-for="(size, name) in sizes"
          :key="name"
        >
          {{ size }}
        </div> 
        <Modal v-model="data.showEditModal">Edit</Modal>
      </div>
    </details>
    <SizeCreate 
      v-model="data.showCreateModal" 
      :existingValues="rootSizes"
    />
  </TokenSection>
</template>

<style lang="scss">
  $radius: 4px;

  .size-tokens {
    border-radius: $radius;
    border: 1px solid rgb(44, 44, 44);

    summary {
      display: grid;
      grid-template-columns: 1fr;
      padding: 5px 10px;
      font-weight: bold;
      align-items: center;
      column-gap: 10px;
      background-color: rgb(44, 44, 44);
      color: white;
      border-top-left-radius: $radius;
      border-top-right-radius: $radius;
    }
    &__list {
      display: grid;
      grid-auto-flow: column;
      grid-template-columns: max-content;
      justify-content: left;
      gap: 5px;
      padding: 5px 10px;
    }
  }
</style>