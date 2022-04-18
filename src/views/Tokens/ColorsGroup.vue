<script lang="ts" setup>
import { ColorToken, TokenSection } from ".";
import { useStylesStore } from "@/store";
import { ColorNameExtended, SolidColor } from "@/api/styles/color.types";

const store = useStylesStore();

const colors: Record<ColorNameExtended, SolidColor[]> = $computed(() => store.colors);
</script>

<template>
  <TokenSection title="Colors" description="..." hasCreate>
    <details class="color-tokens" open v-for="(colorGroup, name) in colors" :key="name">
      <template v-if="colorGroup">
        <summary>
          <span>{{ name }}</span>
        </summary>
        <div class="color-tokens__list">
          <ColorToken v-for="(color, i) in colorGroup" :key="i" :color="color" />
        </div>
      </template>
    </details>
  </TokenSection>
</template>

<style lang="scss">
$radius: 4px;

.color-tokens {
  border-radius: $radius;
  border: 1px solid rgb(44, 44, 44);

  summary {
    display: grid;
    grid-template-columns: 1fr;
    padding: 5px 10px;
    font-weight: bold;
    align-items: center;
    column-gap: 10px;
    background-color: rgb(44, 44, 44);
    color: white;
    border-top-left-radius: $radius;
    border-top-right-radius: $radius;
  }
  &__list {
    display: flex;
    flex-wrap: wrap;
    justify-content: left;
    gap: 5px;
    padding: 5px 10px;
  }
}
</style>
