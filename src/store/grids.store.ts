import { defineStore } from 'pinia';
import type {
  GridStyle
} from '~api/tokens/index.types';
import { Broker } from '~comm/ui.broker';



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

