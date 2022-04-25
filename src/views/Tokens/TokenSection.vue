<script lang="ts" setup>
import { useAppStore } from '~ui/store';

const store = useAppStore()

interface Props {
  /** */
  title: string;
  /** */
  description: string;
}

defineProps<Props>()

const allowTokenActions = $computed(() => 
  store.allowTokenActions)
</script>

<template>
  <section class="token-section">
    <header>
      <h3>{{ title }}</h3>
      <div class="button-group">
        <slot name="header" v-if="allowTokenActions"></slot>
      </div>
    </header>
    <p>{{ description }}</p>
    <div class="token-section__list">
      <slot name="default"></slot>
    </div>
  </section>
</template>

<style lang="scss">
  .token-section {
    margin-bottom: 20px;

    header {
      display: grid;
      grid-template-columns: 1fr max-content;
      align-items: center;
      font-size: 20px;
      font-weight: bold;
    }

    &__list {
      display: grid;
      row-gap: 5px;
    }
  }
</style>