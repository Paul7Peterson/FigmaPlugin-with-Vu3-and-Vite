<script lang="ts" setup>
interface Props {
  name: string;
  color: string;
}

defineProps<Props>()
</script>

<template>
  <div class="zeplin-color-sample">
    <div 
      class="zeplin-color-sample__sample" 
      :style="{ 'background-color': color }"
    />
    <div class="zeplin-color-sample__text">
      <b>{{ name }}</b><br/>
      <span>{{ color }}</span>
    </div>
  </div>
</template>

<style lang="scss">
  $sample-size: 40px;

  .zeplin-color-sample {
    display: grid;
    grid-template-columns: max-content 1fr;
    column-gap: 10px;
    align-items: center;
    width: calc(110px + $sample-size);

    &__sample {
      width: $sample-size;
      height: $sample-size;
    }

    &__text {
      font-size: 14px;

      span {
        color: grey;
        font-size: 12px;
      }
    }
  }
</style>
