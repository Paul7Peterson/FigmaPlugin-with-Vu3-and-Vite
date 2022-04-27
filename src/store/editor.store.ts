import { defineStore } from 'pinia';
import type { NodeInfo } from '~api/nodes/_shared.types';
import { Broker } from '~comm/ui.broker';
import { router } from '../router';

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
    editGap (gap: number) {
      if (!this.selectedNode) throw new Error('No selected node');
      Broker.modifyGap({ nodeId: this.selectedNode.id, gap });
    },
    editPadding (padding: [number, number, number, number]) {
      if (!this.selectedNode) throw new Error('No selected node');
      Broker.modifyPadding({ nodeId: this.selectedNode.id, padding });
    }
  }
});
