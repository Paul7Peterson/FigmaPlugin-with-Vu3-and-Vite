<script lang="ts" setup>
import { onBeforeMount, reactive } from 'vue';
import { useRoute } from 'vue-router';
import { useComponentsStore } from '~ui/store';

const route = useRoute()
const store = useComponentsStore()

const data = reactive({
  name: ''
})

const component = $computed(() => 
  store.components.find((x) => x.name === data.name))

const modifiedVariants = $computed(() => {
  if (!component) return {}
  const variants: Record<string, string[]> = {}
  Object.entries(component.variants).forEach(([key, values]) => {
    variants[key] = values.map(({ value, isDefault }) => 
      `${value}${isDefault ? '  (default)' : ''}`)
  })
  return variants
})

const dataToShow = $computed(() => ({
  key: component?.key,
  id: component?.id,
  description: component?.description,
  variants: modifiedVariants,
  errors: component?.errors.length ? component?.errors : 'No errors',
}))

onBeforeMount(() => {
  data.name = route.params.id.toString();
})
</script>

<template>
  <section id="component-detail">
    <header>
      <router-link to="/components">
        <Button>&lt;</Button>
      </router-link>
      <h2>
        <span class="breadcrumb">Component / </span>
        <span>{{ data.name }}</span>
      </h2>
    </header>
    <DescriptionList :data="dataToShow"/>
  </section>
</template>

<style lang="scss">
  #component-detail {
    header {
      display: grid;
      align-items: center;
      grid-template-columns: max-content 1fr;
      column-gap: 15px;

      h2 .breadcrumb {
        color: #a9a9a9;
      }
    }
  }
</style>