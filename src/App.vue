<script lang="ts" setup>
import { reactive } from 'vue';

import { Button } from './components'
import { Broker } from '@/worker'

const data = reactive({
  result: 0,
})

async function onResponse () {
  data.result = await Broker.receiveMessage(4)
}
</script>

<template>
  <h1>Hello</h1>
  <Button @click="onResponse()">Receive</Button>
  <Action @message="Broker.closePlugin()">Close</Action>

  <div>
    <span>Result: {{ data.result }}</span>
  </div>
</template>