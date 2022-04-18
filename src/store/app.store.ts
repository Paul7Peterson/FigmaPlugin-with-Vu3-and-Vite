import { defineStore } from 'pinia';

import { Broker } from '@/worker.api';
import { useSizesStore } from './sizes.store';
import { useStylesStore } from './styles.store';


/** */
export const useAppStore = defineStore('app', {
  state: () => {
    return {
    };
  },
  getters: {

  },
  actions: {
    async fetchStyles (): Promise<void> {
      const [sizes, styles] = [useSizesStore(), useStylesStore()];
      await Broker.initApp();
      await Promise.all([
        sizes.fetchRootSizes(),
        sizes.fetchGutters(),
        styles.fetchColorStyles(),
        styles.fetchTextStyles(),
        styles.fetchBoxShadows(),
        styles.fetchGridStyles(),
        styles.fetchBorderStyles(),
      ]);
    },
  }
});

