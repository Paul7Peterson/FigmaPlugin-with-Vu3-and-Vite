<script lang="ts" setup>
import { ResizeCorner } from './components'
</script>

<template>
  <nav id="nav">
    <router-link to="/">Home</router-link>
    <router-link to="/tokens">Tokens</router-link>
  </nav>
  <main id="app__main">
    <router-view></router-view>
  </main>
  <ResizeCorner/>
</template>

<style lang="scss">
  body {
    margin: 0;
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

  #app__main {
    padding: 5px;
  }
</style>