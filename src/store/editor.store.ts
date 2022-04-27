import { defineStore } from 'pinia';
import { router } from '../router';

/** */
export const useEditorStore = defineStore('editor', {
  state: () => {
    return {
      selectedNode: null as SceneNode | null,
    };
  },
  getters: {

  },
  actions: {
    onSelectedNode (node: SceneNode) {
      this.selectedNode = node;
      router.push('/editor');
    },
    onCancelNodeSelection () {
      this.selectedNode = null;
      router.push('/');
    }
  }
});
