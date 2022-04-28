import { defineStore } from 'pinia';
import { RootSize, RootSizeName } from '~api/tokens';
import { DocumentInfo } from '~comm/appData.types';
import { Broker } from '~comm/ui.broker';
import {
  useBordersStore,
  useBoxShadowsStore,
  useColorsStore,
  useComponentsStore,
  useFontStylesStore,
  useGridsStore,
  useGuttersStore,
  useSizesStore
} from '.';

/** */
export const useAppStore = defineStore('app', {
  state: () => {
    return {
      isReady: false,
      hasFatalError: false,
      user: null as User | null,
      documentInfo: {} as DocumentInfo,
      errorMessage: '',
      projectConfig: {
        projectSize: {} as RootSize
      }
    };
  },
  getters: {
    allowTokenActions (state): boolean {
      return state.documentInfo.isDesignTokensProject
        || state.documentInfo.isTestProject;
    },
    allowComponentActions (state): boolean {
      return state.documentInfo.isDesignSystemProject
        || state.documentInfo.isTestProject;
    }
  },
  actions: {
    async fetchStyles (): Promise<void> {
      this.isReady = false;
      try {
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
            : Promise.resolve(),
        ]).catch((e) => {
          this.hasFatalError = true;
          this.errorMessage = (e as Error).name;
        });

        const rootSize = useSizesStore().rootSizes
          .find((rs) => rs.name === 'Small' || rs.name === 'Medium');
        this.projectConfig.projectSize = rootSize || {
          id: '',
          value: 16,
          name: 'Medium' as RootSizeName,
          errors: []
        };

      } catch (e) {
        this.hasFatalError = true;
        this.errorMessage = (e as Error).name;
      }
      this.isReady = true;
    },
  }
});

