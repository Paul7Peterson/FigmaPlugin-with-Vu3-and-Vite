<script lang="ts" setup>
import { ColorToken, TokenSection } from ".";
import { useStylesStore } from "@/store";
import { ColorNameExtended, SolidColor } from "@/api/styles/color.types";
import { Details } from '@/components';

const store = useStylesStore();

const colors: Record<ColorNameExtended, SolidColor[]> = $computed(() => store.colors);
</script>

<template>
  <TokenSection title="Colors" description="...">
    <section class="color-tokens">
      <Details
        v-for="(colorGroup, name) in colors" 
        :key="name"
      >
        <template #summary>{{ name }}</template>
        <div class="color-tokens__list">
          <ColorToken v-for="(color, i) in colorGroup" :key="i" :color="color" />
        </div>
      </Details>
    </section>
  </TokenSection>
</template>

<style lang="scss">
$radius: 4px;

.color-tokens {
  display: flex;
  flex-wrap: wrap;
  justify-content: left;
  gap: 10px;

  > * {
    flex: 1;
    min-width: 200px;
  }

  &__list {
    display: flex;
    flex-wrap: wrap;
    justify-content: left;
    gap: 5px;
  }
}
</style>
