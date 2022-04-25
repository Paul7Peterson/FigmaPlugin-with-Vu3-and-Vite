import type { RootSize } from 'api/tokens/index.types';
import { defineStore } from 'pinia';
import { Broker } from '~comm/worker.api';
import { ItemError } from './store.types';



type ModifiedRootSize = RootSize & { locked: boolean; };

/** */
export const useSizesStore = defineStore('sizes', {
  state: () => {
    return {
      rootSizes: [] as ModifiedRootSize[],
      selectedRootSize: null as RootSize | null,
    };
  },
  getters: {
    allErrors (state): ItemError[] {
      return state.rootSizes
        .filter((n) => n.errors.length)
        .map((g) => ({ itemType: 'Root size', itemName: g.name, errors: [] }));
    }
  },
  actions: {
    async fetchRootSizes (): Promise<void> {
      const rootSizes = await Broker.listRootSizes();
      this.rootSizes = rootSizes
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

