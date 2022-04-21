import { defineStore } from 'pinia';

import type { Gutter } from '@/api/tokens/index.types';

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
      this.gutters = gutters
        .map((s) => ({ ...s, locked: true }));
    },
    async createGutter (size: 'smaller' | 'bigger'): Promise<ModifiedGutter> {
      const gutter = await Broker.createGutter(size);
      await this.fetchGutters();
      return { ...gutter, locked: true };
    },
    async modifyGutters (gutters: Gutter[]): Promise<void> {
      await Broker.modifyGutters(gutters);
      await this.fetchGutters();
    },
    async deleteGutter (gutter: Gutter): Promise<void> {
      await Broker.deleteGutter(gutter);
      await this.fetchGutters();
    },
  }
});
