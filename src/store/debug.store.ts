import { defineStore } from 'pinia';
import { useColorsStore } from './colors.store';
import { useFontStylesStore } from './fontStyles.store';
import { useGuttersStore } from './gutters.store';
import { useSizesStore } from './sizes.store';
import { ItemError } from './store.types';


/** */
export const useDebugStore = defineStore('debug', {
  state: () => {
    return {

    };
  },
  getters: {
  },
  actions: {
    getAllErrors (): ItemError[] {
      return [
        ...useSizesStore().allErrors,
        ...useGuttersStore().allErrors,
        ...useColorsStore().allErrors,
        ...useFontStylesStore().allErrors,
      ];
    }
  }
});

