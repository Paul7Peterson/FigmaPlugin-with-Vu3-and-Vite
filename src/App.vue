<script lang="ts" setup>
import { onBeforeMount } from 'vue';
import { useRouter } from 'vue-router';
import { useAppStore } from '~ui/store';
import { ResizeCorner } from './components';
import Nav from './Nav.vue';

const router = useRouter()
const store = useAppStore()

const isReady = $computed(() => store.isReady)
const hasFatalError = $computed(() => store.hasFatalError)
const errorMessage = $computed(() => store.errorMessage)

window.onmousedown = function (e: MouseEvent) {
  if (e.button === 3 && e.buttons === 8) { // Custom back
    router.back()   
  }
  if (e.button === 4 && e.buttons === 16) { // Custom forward
    router.forward()   
  }
}

onBeforeMount(async() => await store.fetchStyles())
</script>

<template>
  <template v-if="!hasFatalError">
    <Nav/>
    <main id="app__main" v-if="isReady">
      <router-view></router-view>
    </main>
    <main v-else id="app__loading">
      <Spinner/>
    </main>
  </template>
  <main v-else id="app__loading">
    <div>
      <p>Ups!</p>
      <small>{{ errorMessage }}</small>
    </div>
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
      
      small {
        font-size: 16px;
      }
    }
  }
</style>