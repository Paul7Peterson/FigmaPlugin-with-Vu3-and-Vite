import { defineStore } from 'pinia';
import type {
  BorderStyle
} from '~api/tokens/index.types';
import { Broker } from '~comm/ui.broker';



/** */
export const useBordersStore = defineStore('borders', {
  state: () => {
    return {
      borderStyles: [] as BorderStyle[],
    };
  },
  getters: {

  },
  actions: {
    async fetchBorderStyles (): Promise<void> {
      this.borderStyles = await Broker.listBorderStyles();
    },
  }
});

