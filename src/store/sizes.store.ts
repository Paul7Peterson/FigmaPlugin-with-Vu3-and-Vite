import { defineStore } from 'pinia';

import type {
  Gutter,
  RootSize,
} from '@/api/styles/index.types';

import { Broker } from '@/worker.api';

type ModifiedRootSize = RootSize & { locked: boolean; };

/** */
export const useSizesStore = defineStore('sizes', {
  state: () => {
    return {
      rootSizes: [] as ModifiedRootSize[],
      gutters: [] as Gutter[],
    };
  },
  getters: {

  },
  actions: {
    async fetchRootSizes (): Promise<void> {
      const rootSizes = await Broker.listRootSizes();
      this.rootSizes = Object.values(rootSizes)
        .sort((a, b) => a.value - b.value)
        .map((s) => ({ ...s, locked: true }));
    },
    async createOrModifyRootSize (size?: RootSize): Promise<ModifiedRootSize> {
      const rootSize = await Broker.createOrModifyRootSize(size);
      await this.fetchRootSizes();
      return { ...rootSize, locked: true };
    },
    async deleteRootSize (size: RootSize): Promise<void> {
      await Broker.deleteRootSize(size);
      await this.fetchRootSizes();
    },
    async fetchGutters (): Promise<void> {
      this.gutters = await Broker.listGutters();
    },
  }
});

