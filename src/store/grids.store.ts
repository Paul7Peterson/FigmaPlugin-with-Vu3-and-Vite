import { defineStore } from 'pinia';

import type {
  GridStyle,
  BorderStyle,
} from '@/api/tokens/index.types';

import { Broker } from '@comm/worker.api';

/** */
export const useGridsStore = defineStore('grids', {
  state: () => {
    return {
      gridStyles: [] as GridStyle[],
    };
  },
  getters: {

  },
  actions: {
    async fetchGridStyles (): Promise<void> {
      this.gridStyles = await Broker.listGridStyles();
    },
  }
});

