import { defineStore } from 'pinia';

import type { RootSize } from '@/api/styles/index.types';

import { Broker } from '@/worker.api';

type ModifiedRootSize = RootSize & { locked: boolean; };

/** */
export const useSizesStore = defineStore('sizes', {
  state: () => {
    return {
      rootSizes: [] as ModifiedRootSize[],
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
    async createRootSize (): Promise<ModifiedRootSize> {
      const rootSize = await Broker.createRootSize();
      await this.fetchRootSizes();
      return { ...rootSize, locked: true };
    },
    async modifyRootSizes (sizes: RootSize[]): Promise<void> {
      await Broker.modifyRootSizes(sizes);
      await this.fetchRootSizes();
    },
    async deleteRootSize (size: RootSize): Promise<void> {
      await Broker.deleteRootSize(size);
      await this.fetchRootSizes();
    },
  }
});

