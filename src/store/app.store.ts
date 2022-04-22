import { defineStore } from 'pinia';

import { Broker } from '@comm/worker.api';
import {
  useBordersStore,
  useSizesStore,
  useGuttersStore,
  useBoxShadowsStore,
  useGridsStore,
  useFontStylesStore,
  useColorsStore,
  useComponentsStore,
} from '.';
import { DocumentInfo } from '../communication/appData.types';


/** */
export const useAppStore = defineStore('app', {
  state: () => {
    return {
      isReady: false,
      hasFatalError: false,
      user: null as User | null,
      documentInfo: {} as DocumentInfo
    };
  },
  getters: {
    allowTokenActions (state): boolean {
      return state.documentInfo.isDesignTokensProject || state.documentInfo.isTestProject;
    },
    allowComponentActions (state): boolean {
      return state.documentInfo.isDesignSystemProject || state.documentInfo.isTestProject;
    }
  },
  actions: {
    async fetchStyles (): Promise<void> {
      this.isReady = false;
      const { user, document } = await Broker.initApp();
      this.user = user;
      this.documentInfo = document;

      await Promise.all([
        useSizesStore().fetchRootSizes(),
        useGuttersStore().fetchGutters(),
        useColorsStore().fetchColorStyles(),
        useFontStylesStore().fetchFontStyles(),
        useBoxShadowsStore().fetchBoxShadows(),
        useGridsStore().fetchGridStyles(),
        useBordersStore().fetchBorderStyles(),
        this.allowComponentActions
          ? useComponentsStore().fetchComponents()
          : Promise.resolve()
      ]).catch((e) => {
        this.hasFatalError = true;
      });
      this.isReady = true;
    },
  }
});

