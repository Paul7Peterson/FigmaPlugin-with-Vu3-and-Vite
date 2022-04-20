import { defineStore } from 'pinia';

import { Broker } from '@comm/worker.api';
import { useGuttersStore } from './gutters.store';
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
      const styles = useStylesStore();
      await Broker.initApp();
      await Promise.all([
        useSizesStore().fetchRootSizes(),
        useGuttersStore().fetchGutters(),
        styles.fetchColorStyles(),
        styles.fetchTextStyles(),
        styles.fetchBoxShadows(),
        styles.fetchGridStyles(),
        styles.fetchBorderStyles(),
      ]);
    },
  }
});

