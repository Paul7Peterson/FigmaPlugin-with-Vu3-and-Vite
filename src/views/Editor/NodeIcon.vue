<script lang="ts" setup>
import capitalize from 'just-capitalize';
import { NodeInfo } from '~api/nodes/_shared.types';
import {
ComponentIcon,
FrameIcon,
InstanceIcon,
TextIcon
} from '~assets';

interface Props {
  /** */
  node: NodeInfo;
}

defineProps<Props>()
</script>

<template>
  <div class="node-icon">
    <FrameIcon v-if="node.type === 'FRAME'"/>
    <InstanceIcon v-else-if="node.type === 'INSTANCE'"/>
    <ComponentIcon v-else-if="['COMPONENT', 'COMPONENT_SET'].includes(node.type)"/>
    <TextIcon v-else-if="node.type === 'TEXT'"/>
    <span>{{ capitalize(node.type.toLowerCase()).replaceAll('_', ' ') }}</span>
  </div>
</template>

<style lang="scss">
  .node-icon {
    display: grid;
    grid-template-columns: max-content max-content;
    column-gap: 10px;
    color: var(--color-purple);
    align-items: center;
  }
</style>