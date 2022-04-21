<script lang="ts" setup>
import { onBeforeMount } from 'vue';
import { useAppStore } from '@/store';

import { ResizeCorner } from './components'

const store = useAppStore()

const isReady = $computed(() => store.isReady)
const hasFatalError = $computed(() => store.hasFatalError)

onBeforeMount(async() => await store.fetchStyles())
</script>

<template>
  <template v-if="!hasFatalError">
    <nav id="nav">
      <router-link to="/">Home</router-link>
      <router-link to="/tokens">Tokens</router-link>
      <router-link to="/semantic">Semantic</router-link>
      <router-link to="/components">Components</router-link>
    </nav>
    <main id="app__main" v-if="isReady">
      <KeepAlive>
        <router-view></router-view>
      </KeepAlive>
    </main>
    <main v-else id="app_loading">
      <Spinner/>
    </main>
  </template>
  <main v-else id="app_loading">
    <p>Ups!</p>
  </main>
  <ResizeCorner/>
</template>

<style lang="scss">
  body {
    margin: 0;
    font-family: Inter, Arial, Helvetica, sans-serif;
  }

  h1, h2, h3, h4 {
    margin: 0
  }

  #nav {
    display: grid;
    grid-auto-flow: column;
    grid-auto-columns: max-content;
    gap: 5px;
    background-color: #b4b4b4;

    a {
      color: #828282;
      text-decoration: none;
      padding: 2px 5px;

      &.router-link-active {
        background-color: white;
        color: black;
      }
    }
  }
  .warning-icon {
    cursor: help;
  }

  #app{
    &__main {
       padding: 10px;
    }
    &__loading {
      display: grid;
      align-items: center;
      justify-content: center;
      font-size: 50px;
    }
  }
</style>