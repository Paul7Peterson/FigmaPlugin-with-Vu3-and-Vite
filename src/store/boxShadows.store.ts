import { defineStore } from 'pinia';
import type {
  BoxShadowStyle,
  ExtendedBoxShadowType
} from '~api/tokens/index.types';
import { Broker } from '~comm/ui.broker';



/** */
export const useBoxShadowsStore = defineStore('boxShadows', {
  state: () => {
    return {
      boxShadows: {} as Record<ExtendedBoxShadowType, BoxShadowStyle[]>,
    };
  },
  getters: {

  },
  actions: {
    async fetchBoxShadows (): Promise<void> {
      const boxShadows = await Broker.listBoxShadowsStyles();
      this.boxShadows = boxShadows.reduce((t, shadow) => {
        if (!t[shadow.type]) t[shadow.type] = [shadow];
        else t[shadow.type].push(shadow);
        return t;
      }, {} as Record<ExtendedBoxShadowType, BoxShadowStyle[]>);
    },
  }
});

