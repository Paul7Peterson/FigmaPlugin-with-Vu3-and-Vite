import { PostBroker } from '~comm/apiBroker.api';
import { AnyUIMessage } from '~comm/messages.types';
import { UI } from './config';


figma.showUI(__html__, {
  height: UI.HEIGHT,
  width: UI.WIDTH,
  position: { x: -UI.WIDTH, y: -(UI.HEIGHT / 2) },
  title: 'PohlCon Plugin',
  visible: true,
});

// For retrieving the previous size

figma.ui.onmessage = (message: string) => {
  const msg: AnyUIMessage = JSON.parse(message);
  console.log('📦', msg.type, msg.payload);
  PostBroker[msg.type]?.(msg as any)
    .catch((e: Error) => {
      console.error('❌', e.message);
      console.trace(e);
      const errorMessage = { type: 'error', id: msg.id, payload: { message: e.message } };
      figma.ui.postMessage(JSON.stringify(errorMessage));
      figma.notify(e.message, { error: true, timeout: 3 });
    });
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