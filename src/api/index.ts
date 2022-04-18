import { FigmaStore } from './store/store';
import { UIMessageCode, UIMessage } from '../types/messages';
import { PostBroker } from './postBroker.api';

const WIDTH = 400;
const HEIGHT = 600;

figma.showUI(__html__, {
  height: HEIGHT,
  width: WIDTH,
  position: { x: -WIDTH, y: -(HEIGHT / 2) },
  title: 'PohlCon Plugin',
  visible: true,
});

// For retrieving the previous size
FigmaStore.getInstance.getKey('windowSize').then((size) => {
  if (size) figma.ui.resize(size.width, size.height);
}).catch(err => { console.error(err); });

figma.ui.onmessage = (message: string) => {
  const msg: UIMessage<UIMessageCode> = JSON.parse(message);
  console.log('📦', msg.type, msg.payload);
  try {
    PostBroker[msg.type]?.(msg as any);
  } catch (error) {
    console.trace(error);
    figma.notify((error as Error).message, { error: true, timeout: 3 });
    PostBroker.throwError(error as Error);
  }
};

figma.on('selectionchange', () => {
  console.log('🔵 Select:', figma.currentPage.selection);
});

figma.on('currentpagechange', () => {
  console.log('📃 Page:', figma.currentPage);
});

figma.on('close', () => {
  console.log('❌ Close');
});

console.info(`
  PluginId: ${figma.pluginId} 
`);