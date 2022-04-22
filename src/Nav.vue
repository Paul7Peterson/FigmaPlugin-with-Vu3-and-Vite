<script lang="ts" setup>
import { useAppStore } from './store';

const store = useAppStore()

const allowComponentActions = $computed(() => store.allowComponentActions)
</script>

<template>
  <nav id="nav">
    <router-link 
      to="/"
    >Home</router-link>
    <router-link 
      to="/tokens"
    >Tokens</router-link>
    <router-link 
      to="/semantic"
    >Semantic tokens</router-link>
    <router-link 
      v-if="allowComponentActions"
      to="/components"
    >Components</router-link>
    <router-link 
      to="/debug"
    >Debug</router-link>
  </nav>
</template>

<style lang="scss">
  #nav {
    display: grid;
    grid-auto-flow: column;
    grid-auto-columns: max-content;
    background-color: #b4b4b4;
    padding: 5px 15px 0 15px;

    a {
      color: #828282;
      text-decoration: none;
      padding: 3px 10px;

      &.router-link-active {
        background-color: white;
        color: black;
        border-top-right-radius: 5px;
        border-top-left-radius: 5px;
      }
    }
  }
</style>
