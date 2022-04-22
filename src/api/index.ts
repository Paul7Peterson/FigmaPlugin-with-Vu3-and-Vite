import { AnyUIMessage } from '@comm/messages.types';
import { PostBroker } from '@comm/apiBroker.api';

const WIDTH = 500;
const HEIGHT = 600;

figma.showUI(__html__, {
  height: HEIGHT,
  width: WIDTH,
  position: { x: -WIDTH, y: -(HEIGHT / 2) },
  title: 'PohlCon Plugin',
  visible: true,
});

// For retrieving the previous size

figma.ui.onmessage = (message: string) => {
  const msg: AnyUIMessage = JSON.parse(message);
  console.log('📦', msg.type, msg.payload);
  try {
    PostBroker[msg.type]?.(msg as any)
      .catch((e) => console.error('❌❌', e.message));
  } catch (error: any) {
    console.error('❌', error.message);
    const errorMessage = { type: 'error', id: msg.id, payload: { message } };
    figma.ui.postMessage(JSON.stringify(errorMessage));
    figma.notify(error.message, { error: true, timeout: 3 });
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