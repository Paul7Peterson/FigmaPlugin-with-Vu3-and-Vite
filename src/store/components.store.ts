import { defineStore } from 'pinia';
import type { FigmaComponent } from '../api/components/index.types';

import { Broker } from '../communication/worker.api';

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

