import type {
  ExtendedFontStyleCategory, FontStyle
} from 'api/tokens/index.types';
import { defineStore } from 'pinia';
import { Broker } from '~comm/worker.api';
import { ItemError } from './store.types';



/** */
export const useFontStylesStore = defineStore('fontStyles', {
  state: () => {
    return {
      fontStyles: {} as Record<ExtendedFontStyleCategory, FontStyle[]>,
    };
  },
  getters: {
    allErrors (state): ItemError[] {
      return Object.values(state.fontStyles)
        .flatMap((group) =>
          group
            .filter((n) => n.errors.length)
            .map((c) => ({ itemType: 'Solid color', itemName: c.name, errors: c.errors })));
    }
  },
  actions: {
    async fetchFontStyles (): Promise<void> {
      const fontStyles = await Broker.listFontStyles();
      this.fontStyles = fontStyles.reduce((t, font) => {
        if (!t[font.category]) t[font.category] = [font];
        else t[font.category].push(font);
        return t;
      }, {} as Record<ExtendedFontStyleCategory, FontStyle[]>);
    },
    async createFontStyle () {

    },
  }
});

