<script lang="ts" setup>
import { useDebugStore } from '../store';

const store = useDebugStore()

const errors = $computed(() => store.getAllErrors())
</script>

<template>
  <h2>Debug</h2>
  <section id="errors-list">
    <div 
      class="item-error"
      v-for="(item, i) in errors"
      :key="i"
    >
      <div class="item-error__item">
        <b>{{ item.itemType }}</b><br/>
        <span>{{ item.itemName }}</span>
      </div>
      <div>
        <ul class="item-error__errors">
          <li 
            v-for="(error, i) in item.errors"
            :key="i"
          >
            <span>{{ error }}</span>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

<style lang="scss">
  #errors-list {
    display: grid;
    row-gap: 5px;
    margin: 10px 0;
  }
  .item-error {
    display: grid;
    grid-template-columns: 100px 4fr;
    align-items: center;
    border: 2px solid var(--color-dark);

    &__item {
      background-color: var(--color-dark);
      color: white;
      padding: 10px;
      align-self: stretch;
    }
    &__errors {
      margin: 0
    }
  }
</style>