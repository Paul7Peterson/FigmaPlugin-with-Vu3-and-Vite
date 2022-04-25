import { AppData, DocumentInfo, ProjectFlags } from '~comm/appData.types';
import { ENV } from '~ui/envVariables';
import { FontRef } from './nodes/_shared.types';
import { FigmaStore } from './store';

export async function initApp (): Promise<AppData> {
  await loadFonts();
  await FigmaStore.retrieveData();

  await adjustWindowSize();

  return {
    user: getUser(),
    document: getDocumentInfo(),
  };
}

console.log(figma.fileKey, getProjectsFlags());


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
    isDesignSystemProject: ENV.DESIGN_SYSTEM_FIGMA_PROJECT_ID === figma.fileKey,
    isDesignTokensProject: ENV.DESIGN_TOKENS_FIGMA_PROJECT_ID === figma.fileKey,
    isTestProject: ENV.TEST_FIGMA_PROJECT_ID === figma.fileKey,
  };
}

function getUser (): User {
  const user = figma.currentUser;
  if (!user) throw new Error('No user');
  return user;
}

export function getDocumentInfo (): DocumentInfo {
  return {
    id: figma.root.id,
    name: figma.root.name,
    ...getProjectsFlags(),
  };
}