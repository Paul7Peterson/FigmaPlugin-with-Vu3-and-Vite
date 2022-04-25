<script lang="ts" setup>
import { onBeforeMount, reactive } from 'vue';
import { useRoute } from 'vue-router';
import { useComponentsStore } from '~/store';

const route = useRoute()
const store = useComponentsStore()

const data = reactive({
  name: ''
})

onBeforeMount(() => {
  data.name = route.params.id.toString();
})
</script>

<template>
  <router-link to="/components">
    <Button>Back</Button>
  </router-link>
  <h2>Component</h2>
  <span>{{ data.name }}</span>
</template>

<style lang="scss">

</style>