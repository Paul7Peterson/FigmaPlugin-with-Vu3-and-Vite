<script lang="ts" setup>
import { onBeforeMount, reactive } from 'vue';

import { Broker } from '../worker.api';

const data = reactive({
  user: null as User | null,
})

const singleName = $computed(() => 
  data.user?.name.split(' ')[0] || '')

onBeforeMount(async () => {
  data.user = await Broker.getUser()
})
</script>

<template>
  <header id="welcome" v-if="data.user">
    <img class="avatar" :src="data.user.photoUrl || ''" :alt="singleName">
    <h3>Hello, {{ singleName }}!</h3>
  </header>
</template>

<style lang="scss">
  $avatar-size: 30px;

  #welcome {
    display: grid;
    grid-template-columns: max-content 1fr;
    column-gap: 20px;
    justify-content: center;
    align-items: center;

    .avatar {
      width: $avatar-size;
      height: $avatar-size;
      border-radius: calc($avatar-size / 2);
    }
  }
</style>