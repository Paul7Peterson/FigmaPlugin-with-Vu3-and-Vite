<script lang="ts" setup>
withDefaults(defineProps<{
  /** */
  title: string;
  /** */
  description: string;
  /** */
  hasCreate?: boolean;
}>(), {
  hasCreate: false
})

defineEmits<{
  (e: 'create'): void
}>()
</script>

<template>
  <section class="token-section">
    <header>
      <h3>{{ title }}</h3>
      <slot name="header">
        <Button 
          v-if="hasCreate" 
          @click="$emit('create')"
        >Create new</Button>
      </slot>
    </header>
    <p>{{ description }}</p>
    <div class="token-section__list">
      <slot></slot>
    </div>
  </section>
</template>

<style lang="scss">
  .token-section {
    margin: 20px 0;

    header {
      display: grid;
      grid-template-columns: 1fr max-content;
      align-items: center;
      font-size: 20px;
      font-weight: bold;
      padding: 5px 0;
    }

    &__list {
      display: grid;
      row-gap: 5px;
    }
  }
</style>