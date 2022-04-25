import { defineStore } from 'pinia';
//
import type { Gutter } from '~api/tokens/index.types';
import { Broker } from '~comm/ui.broker';
import { ItemError } from './store.types';

type ModifiedGutter = Gutter & { locked: boolean; };

/** */
export const useGuttersStore = defineStore('gutters', {
  state: () => {
    return {
      gutters: [] as ModifiedGutter[],
      selectedGutter: null as Gutter | null,
    };
  },
  getters: {
    allErrors (state): ItemError[] {
      return state.gutters
        .filter((n) => n.errors.length)
        .map((g) => ({ itemType: 'Gutter', itemName: g.name, errors: [] }));
    }
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

