import { defineStore } from 'pinia';

import type {
  FontStyle,
  GridStyle,
  BorderStyle,
  SolidColor,
  ColorNameExtended,
  BoxShadowStyle,
  SolidColorInfo,
  ExtendedBoxShadowType,
  ExtendedFontStyleCategory,
} from '@/api/styles/index.types';

import { Broker } from '@/worker.api';

import { hexToRgb } from './styles.store.helpers';

/** */
export const useStylesStore = defineStore('styles', {
  state: () => {
    return {
      colors: {} as Record<ColorNameExtended, SolidColor[]>,
      fontStyles: {} as Record<ExtendedFontStyleCategory, FontStyle[]>,
      boxShadows: {} as Record<ExtendedBoxShadowType, BoxShadowStyle[]>,
      gridStyles: [] as GridStyle[],
      borderStyles: [] as BorderStyle[],
    };
  },
  getters: {

  },
  actions: {
    async fetchColorStyles (): Promise<void> {
      const colors = await Broker.listSolidColors();
      const colorsObject = colors.reduce((t, color) => {
        if (!t[color.colorName]) t[color.colorName] = [color];
        else t[color.colorName].push(color);
        return t;
      }, {} as Record<ColorNameExtended, SolidColor[]>);
      Object.keys(colorsObject).forEach((k) => {
        this.colors[k as ColorNameExtended] =
          [...colorsObject[k as ColorNameExtended]].sort((a, b) => a.colorShadow - b.colorShadow);
      });
    },
    async getColorInfo (hexColor: string): Promise<SolidColorInfo> {
      return Broker.getColorInfo(hexToRgb(hexColor));
    },
    async createOrModifyColor (hexColor: string, id?: string): Promise<SolidColor> {
      const color = hexToRgb(hexColor);
      const newColor = id
        ? await Broker.modifySolidColor({ id, color })
        : await Broker.createSolidColor(color);
      await this.fetchColorStyles();
      return newColor;
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
      }, {} as Record<ExtendedBoxShadowType, BoxShadowStyle[]>);
    },
    async fetchGridStyles (): Promise<void> {
      this.gridStyles = await Broker.listGridStyles();
    },
    async fetchBorderStyles (): Promise<void> {
      this.borderStyles = await Broker.listBorderStyles();
    },
  }
});

