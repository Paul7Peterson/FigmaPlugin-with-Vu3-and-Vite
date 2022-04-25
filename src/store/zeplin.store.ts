import { DesignTokens } from '@zeplin/sdk';
import { defineStore } from 'pinia';
import { getDesignTokens } from '~ui/zeplin';
/** */
export const useZeplinStore = defineStore('zeplin', {
  state: () => {
    return {
      colors: {} as DesignTokens['colors'],
      spacing: {} as DesignTokens['spacing'],
      textStyles: {} as DesignTokens['textStyles'],
    };
  },
  getters: {

  },
  actions: {
    async fetchZeplinData (): Promise<void> {
      const { colors, spacing, textStyles } = await getDesignTokens();
      this.colors = colors;
      this.spacing = spacing;
      this.textStyles = textStyles;
    }
  }
});

