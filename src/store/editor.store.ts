import { defineStore } from 'pinia';
import type { NodeInfo, Space } from '~api/nodes/_shared.types';
import { Broker } from '~comm/ui.broker';
import { Gutter } from '../../api/tokens';
import { router } from '../router';
import { useAppStore } from './app.store';
import { useGuttersStore } from './gutters.store';

/** */
export const useEditorStore = defineStore('editor', {
  state: () => {
    return {
      selectedNode: null as NodeInfo | null,
    };
  },
  getters: {

  },
  actions: {
    onSelectedNode (node: NodeInfo) {
      this.selectedNode = node;
      router.push('/editor');
    },
    onCancelNodeSelection () {
      this.selectedNode = null;
      router.push('/');
    },
    editGap (gap: Space) {
      if (!this.selectedNode) throw new Error('No selected node');
      Broker.modifyGap({ nodeId: this.selectedNode.id, gap });
    },
    editPadding (padding: [Space, Space, Space, Space]) {
      if (!this.selectedNode) throw new Error('No selected node');
      Broker.modifyPadding({ nodeId: this.selectedNode.id, padding });
    },
    getAppliedGutters (): (Gutter & { text: string; })[] {
      const rs = useAppStore().projectConfig.projectSize;
      console.log('gutters', useGuttersStore().gutters);

      return useGuttersStore().gutters.map((g) => {
        const value = g.value * rs.value;
        return { ...g, text: `${g.name} - ${value}px` };
      });
    }
  }
});
