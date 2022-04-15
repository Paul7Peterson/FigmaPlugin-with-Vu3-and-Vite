<script lang="ts" setup>
import { reactive } from 'vue';

import { Button } from './components'
import { Broker } from '@/worker'

const data = reactive({
  input: 0,
  result: 0,
})

async function onResponse () {
  data.result = await Broker.receiveMessage(data.input)
}
</script>

<template>
  <h1>Hello</h1>
  <Button @click="onResponse()">Receive</Button>
  <Action @message="Broker.closePlugin()">Close</Action>

  <input type="number" v-model="data.input">

  <div>
    <span>Result: {{ data.result }}</span>
  </div>
</template>