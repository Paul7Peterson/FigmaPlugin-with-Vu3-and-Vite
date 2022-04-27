<script lang="ts" setup>
import { useAppStore, useEditorStore } from './store';

const appStore = useAppStore()
const editorStore = useEditorStore()

const selectedNode = $computed(() => editorStore.selectedNode)
const allowComponentActions = $computed(() => appStore.allowComponentActions)
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
    >Semantics</router-link>
    <router-link 
      v-if="allowComponentActions"
      to="/components"
    >Components</router-link>
    <router-link 
      v-if="selectedNode"
      to="/editor"
    >Editor</router-link>
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
    padding: 5px 10px 0 10px;
    gap: 5px;
    height: 40px;
    align-items: end;

    a {
      color: #828282;
      text-decoration: none;
      padding: 3px 10px 2px 10px;
      background-color: #d3d3d3;
      border-top-right-radius: 5px;
      border-top-left-radius: 5px;
      transition: padding-bottom .1s ease-in-out;

      &.router-link-active {
        background-color: white;
        color: black;
        padding-bottom: 12px;
      }
    }
  }
</style>
