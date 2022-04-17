import { defineStore } from 'pinia';

import type {
  SizesMap,
  Gutter,
  FontStyle,
  GridStyle,
  BorderStyle,
  SolidColor,
  ColorNameExtended,
  BoxShadowStyle,
  SolidColorInfo,
  BoxShadowType,
  ExtendedFontStyleCategory,
} from '@/api/styles/index.types';
import { Broker } from '@/worker.api';
import { hexToRgb } from './styles.store.helpers';

/** */
export const useStylesStore = defineStore('styles', {
  state: () => {
    return {
      rootSizes: {} as SizesMap,
      gutters: [] as Gutter[],
      colors: {} as Record<ColorNameExtended, SolidColor[]>,
      fontStyles: {} as Record<ExtendedFontStyleCategory, FontStyle[]>,
      boxShadows: {} as Record<BoxShadowType, BoxShadowStyle[]>,
      gridStyles: [] as GridStyle[],
      borderStyles: [] as BorderStyle[],
    };
  },
  getters: {

  },
  actions: {
    async fetchRootSizes (): Promise<void> {
      this.rootSizes = await Broker.listRootSizes();
    },
    async fetchGutters (): Promise<void> {
      this.gutters = await Broker.listGutters();
    },
    async fetchColorStyles (): Promise<void> {
      const colors = await Broker.listSolidColors();
      this.colors = colors.reduce((t, color) => {
        if (!t[color.colorName]) t[color.colorName] = [color];
        else t[color.colorName].push(color);
        return t;
      }, {} as Record<ColorNameExtended, SolidColor[]>);
    },
    async getColorInfo (hexColor: string): Promise<SolidColorInfo> {
      return Broker.getColorInfo(hexToRgb(hexColor));
    },
    async createOrModifyColor (hexColor: string, id?: string): Promise<SolidColor> {
      const color = hexToRgb(hexColor);
      if (!id) return Broker.createSolidColor(color);
      return Broker.modifySolidColor({ id, color });
    },
    async fetchTextStyles (): Promise<void> {
      const fontStyles = await Broker.listFontStyles();
      this.fontStyles = fontStyles.reduce((t, font) => {
        if (!t[font.category]) t[font.category] = [font];
        else t[font.category].push(font);
        return t;
      }, {} as Record<ExtendedFontStyleCategory, FontStyle[]>);
    },
    async fetchBoxShadows (): Promise<void> {
      const boxShadows = await Broker.listBoxShadowStyles();
      this.boxShadows = boxShadows.reduce((t, shadow) => {
        if (!t[shadow.type]) t[shadow.type] = [shadow];
        else t[shadow.type].push(shadow);
        return t;
      }, {} as Record<BoxShadowType, BoxShadowStyle[]>);
    },
    async fetchGridStyles (): Promise<void> {
      this.gridStyles = await Broker.listGridStyles();
    },
    async fetchBorderStyles (): Promise<void> {
      this.borderStyles = await Broker.listBorderStyles();
    },
    async fetchStyles (): Promise<void> {
      Promise.all([
        this.fetchRootSizes(),
        this.fetchGutters(),
        this.fetchColorStyles(),
        this.fetchTextStyles(),
        this.fetchBoxShadows(),
        this.fetchGridStyles(),
        this.fetchBorderStyles(),
      ]);
    },
  }
});

