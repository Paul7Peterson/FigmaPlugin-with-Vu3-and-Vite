import { defineStore } from 'pinia';

import { Broker } from '@comm/worker.api';
import { useGuttersStore } from './gutters.store';
import { useSizesStore } from './sizes.store';
import { useStylesStore } from './styles.store';


/** */
export const useAppStore = defineStore('app', {
  state: () => {
    return {
      isReady: false,
      hasFatalError: false,
    };
  },
  getters: {

  },
  actions: {
    async fetchStyles (): Promise<void> {
      this.isReady = false;
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
      ]).catch((e) => {
        this.hasFatalError = true;
      });
      this.isReady = true;
    },
  }
});

