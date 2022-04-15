<script lang="ts" setup>
import { reactive } from 'vue';

import { Broker } from '../worker.api';
import { Button } from '../components';

const data = reactive({
  input: 0,
  result: 0,
})

async function onResponse () {
  data.result = await Broker.receiveMessage({ number: data.input })
}
</script>

<template>
  <div>
    <input type="number" v-model="data.input">
    <Button @click="onResponse()">Multiply</Button>
  </div>

  <div>
    <span>Result: {{ data.result }}</span>
  </div>
</template>