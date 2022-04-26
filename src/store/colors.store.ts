import { defineStore } from 'pinia';
import type {
  ColorNameExtended, SolidColor, SolidColorInfo
} from '~api/tokens/index.types';
import { Broker } from '~comm/ui.broker';
import { hexToRgb } from './colors.store.helpers';
import { ItemError } from './store.types';

type ModifiedSolidColor = SolidColor;

/** */
export const useColorsStore = defineStore('colors', {
  state: () => {
    return {
      colors: {} as Record<ColorNameExtended, ModifiedSolidColor[]>,
    };
  },
  getters: {
    allErrors (state): ItemError[] {
      return Object.values(state.colors)
        .flatMap((group) =>
          group
            .filter((n) => n.errors.length)
            .map((c) => ({ itemType: 'Solid color', itemName: c.name, errors: c.errors })));
    }
  },
  actions: {
    async fetchColorStyles (): Promise<void> {
      const colors = await Broker.listSolidColors();
      const colorsObject = colors.reduce((t, color) => {
        const convertedColor: ModifiedSolidColor = color;

        if (!t[color.colorName]) t[color.colorName] = [convertedColor];
        else t[color.colorName].push(convertedColor);
        return t;
      }, {} as Record<ColorNameExtended, ModifiedSolidColor[]>);
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
    async deleteSolidColor ({ id }: SolidColor): Promise<void> {
      await Broker.deleteSolidColor({ id });
    }
  }
});

