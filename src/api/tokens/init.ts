import { ENV } from '@/envVariables';
import { AppData, ProjectFlags } from '@comm/appData.types';
import { FontRef } from '../nodes/_shared.types';
import { FigmaStore } from '../store';

export async function initApp (): Promise<AppData> {
  await loadFonts();
  await adjustWindowSize();
  await FigmaStore.retrieveData();

  return {
    ...getProjectsFlags()
  };
}

function adjustWindowSize () {
  FigmaStore.getInstance.getKey('windowSize').then((size) => {
    if (size) figma.ui.resize(size.width, size.height);
  }).catch(err => { console.error(err); });
}

async function loadFonts (): Promise<void> {
  const fonts: FontRef[] = [
    { family: "Fabriga", style: "Regular" },
    { family: "Fabriga", style: "Medium" },
    { family: "MT Extra", style: "Regular" },
    { family: "Consolas", style: "Regular" },
  ];
  await Promise.all(fonts.map((f) => figma.loadFontAsync(f)));
}


function getProjectsFlags (): ProjectFlags {
  return {
    isDesignSystemProject: ENV.DESIGN_TOKENS_FIGMA_PROJECT_ID === figma.root.id,
    isDesignTokensProject: ENV.DESIGN_SYSTEM_FIGMA_PROJECT_ID === figma.root.id,
    isTestProject: ENV.TEST_FIGMA_PROJECT_ID === figma.root.id,
  };
}