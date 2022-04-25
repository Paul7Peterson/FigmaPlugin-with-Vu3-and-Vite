import {
  TextStyleDesignTokenValue
} from '@zeplin/sdk';
import { defineStore } from 'pinia';
import { getDesignTokens } from '~ui/zeplin';

/** */
export const useZeplinStore = defineStore('zeplin', {
  state: () => {
    return {
      colors: {} as Record<string, string>,
      spacing: {} as Record<string, number>,
      textStyles: {} as Record<string, TextStyleDesignTokenValue>,
    };
  },
  getters: {

  },
  actions: {
    async fetchZeplinData (): Promise<void> {
      const { colors, spacing, textStyles } = await getDesignTokens();
      this.colors = Object.entries(colors).reduce((t, [name, { value }]) => {
        const [from, to] = [value.indexOf('(') + 1, value.length - 2];
        const HEX = '#' + value.substring(from, to).split(',')
          .map((x) => parseInt(x).toString(16))
          .join('');

        t[name] = HEX;
        return t;
      }, {} as Record<string, string>);
      this.spacing = Object.entries(spacing).reduce((t, [name, { value }]) => {
        t[name] = value;
        return t;
      }, {} as Record<string, number>);
      this.textStyles = Object.entries(textStyles).reduce((t, [name, value]) => {
        t[name] = value.value;
        return t;
      }, {} as Record<string, TextStyleDesignTokenValue>);
    }
  }
});

