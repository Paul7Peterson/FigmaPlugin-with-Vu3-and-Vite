<script lang="ts" setup>
import { reactive } from 'vue';
import { Broker } from '~comm/ui.broker';
import { useAppStore } from '../store';


const store = useAppStore()

const data = reactive({
  isGeneratingDocs: false,
})

const user = $computed(() => store.user)

const singleName = $computed(() => 
  user?.name.split(' ')[0] || '')

function onClose () {
  Broker.closePlugin()
}

async function onDocument () {
  data.isGeneratingDocs = true;
  await Broker.updateDocumentation()
  data.isGeneratingDocs = false;
}
</script>

<template>
  <header id="home__welcome" v-if="user">
    <img class="avatar" :src="user.photoUrl || ''" :alt="singleName">
    <h3>Hello, {{ singleName }}!</h3>
  </header>
  <footer id="home__footer" class="button-group">
    <Button 
      :isLoading="data.isGeneratingDocs" 
      @click="onDocument"
    >Update docs</Button>
    <Button @click="onClose">Save and close</Button>
  </footer>
</template>

<style lang="scss">
  $avatar-size: 30px;

  #home {
    &__welcome {
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
    &__footer {
      position: fixed;
      bottom: 0;
      right: 0;
      left: 0;
      padding: 15px;
    }
  }
</style>