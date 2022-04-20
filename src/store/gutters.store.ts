import { defineStore } from 'pinia';

import type { Gutter } from '@/api/styles/index.types';

import { Broker } from '@comm/worker.api';

type ModifiedGutter = Gutter & { locked: boolean; };

/** */
export const useGuttersStore = defineStore('gutters', {
  state: () => {
    return {
      gutters: [] as ModifiedGutter[],
    };
  },
  getters: {

  },
  actions: {
    async fetchGutters (): Promise<void> {
      const gutters = await Broker.listGutters();
      this.gutters = Object.values(gutters)
        .sort((a, b) => a.value - b.value)
        .map((s) => ({ ...s, locked: true }));
    },
    async createGutter (): Promise<ModifiedGutter> {
      const gutter = await Broker.createGutter();
      await this.fetchGutters();
      return { ...gutter, locked: true };
    },
    async modifyGutters (gutters: Gutter[]): Promise<void> {
      await Broker.modifyGutters(gutters);
      await this.fetchGutters();
    },
    async deleteGutter (gutter: Gutter): Promise<void> {
      // await Broker.deleteRootSize(size);
      await this.fetchGutters();
    },
  }
});

