import { defineStore } from 'pinia';
import { Broker } from '~comm/worker.api';
import type { FigmaComponent } from '../../api/components/index.types';


/** */
export const useComponentsStore = defineStore('components', {
  state: () => {
    return {
      components: [] as FigmaComponent[]
    };
  },
  getters: {

  },
  actions: {
    async fetchComponents (): Promise<void> {
      const components = await Broker.listComponents();
      this.components = components;
    },
  }
});

