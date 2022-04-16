<script lang="ts" setup>
import { ResizeCorner } from './components'
</script>

<template>
  <nav id="nav">
    <router-link to="/">Home</router-link>
    <router-link to="/tokens">Tokens</router-link>
    <router-link to="/semantic">Semantic</router-link>
    <router-link to="/components">Components</router-link>
  </nav>
  <main id="app__main">
    <KeepAlive>
      <router-view></router-view>
    </KeepAlive>
  </main>
  <ResizeCorner/>
</template>

<style lang="scss">
  :root {
    font-size: 14px;
  }

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

  #app__main {
    padding: 10px;
  }
</style>