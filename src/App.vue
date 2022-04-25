<script lang="ts" setup>
import { onBeforeMount } from 'vue';
import { useAppStore } from '~ui/store';
import { ResizeCorner } from './components';
import Nav from './Nav.vue';


const store = useAppStore()

const isReady = $computed(() => store.isReady)
const hasFatalError = $computed(() => store.hasFatalError)

onBeforeMount(async() => await store.fetchStyles())
</script>

<template>
  <template v-if="!hasFatalError">
    <Nav/>
    <main id="app__main" v-if="isReady">
      <KeepAlive>
        <router-view></router-view>
      </KeepAlive>
    </main>
    <main v-else id="app__loading">
      <Spinner/>
    </main>
  </template>
  <main v-else id="app__loading">
    <p>Ups!</p>
  </main>
  <ResizeCorner/>
</template>

<style lang="scss">
  #app{
    &__main {
      padding: 15px;
    }
    &__loading {
      display: grid;
      align-items: center;
      justify-content: center;
      height: 100%;
      font-size: 50px;
    }
  }
</style>