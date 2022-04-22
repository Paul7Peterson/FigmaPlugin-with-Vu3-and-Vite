<script lang="ts" setup>

const text = $ref('')
</script>

<template>
  <h2>Semantic</h2>
  <div>
    <TextInput v-model="text" label="test"/>
    {{ text }}
  </div>
</template>

<style lang="scss">

</style>