<script lang="ts" setup>
import { reactive } from 'vue';
import { ColorNameExtended, SolidColor } from "~api/tokens/index.types";
import { Details } from '~ui/components';
import { useColorsStore } from "~ui/store";
import { TokenSection } from "..";
import NewColor from './New.vue';
import ColorToken from './Token.vue';
const store = useColorsStore();

const colors: Record<ColorNameExtended, SolidColor[]> = $computed(() => store.colors);

const data = reactive({
  setNew: false
});

const newColor = $computed(() => store.newColor);

async function onCreate () {
  if (confirm('Are you sure?')) {
    store.setNewColor('#000000');
    data.setNew = true;
    // await store.createOrModifyColor('#000000');
  }
}

</script>

<template>
  <TokenSection title="Colors" description="...">
    <template #header>
      <Button @click="onCreate">Create new</Button>
    </template>
    <section class="color-tokens">
      <Details v-for="(colorGroup, name) in colors" :key="name">
        <template #summary>{{ name }}</template>
        <div class="color-tokens__list">
          <ColorToken v-for="(color, i) in colorGroup" :key="i" :color="color" />
          <NewColor v-model="data.setNew" v-if="newColor" :color="newColor" />
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

  >* {
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
