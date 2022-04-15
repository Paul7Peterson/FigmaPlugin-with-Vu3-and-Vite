// This plugin will open a window to prompt the user to enter a number, and
// it will then create that many rectangles on the screen.

import { UIMessageCode, UIMessage } from '../types/messages';
import { PostBroker } from './postBroker.api';

// This file holds the main code for the plugins. It has access to the *document*.
// You can access browser APIs in the <script> tag inside "ui.html" which has a
// full browser environment (see documentation).

// This shows the HTML page in "ui.html".
figma.showUI(__html__, {
  height: 600,
  width: 300,
  position: { x: -300, y: -300 },
  title: 'PohlCon Plugin',
  visible: true,
});

// For retrieving the previous size
figma.clientStorage.getAsync('size').then((size) => {
  if (size) figma.ui.resize(size.width, size.height);
}).catch(err => { console.error(err); });

figma.ui.onmessage = (msg: UIMessage<UIMessageCode>) => {
  if (msg.type !== 'resize') console.log('📦', msg);
  PostBroker[msg.type]?.(msg as any);
};

figma.on('selectionchange', () => {
  console.log('🔵 Select:', figma.currentPage.selection);
});

figma.on('currentpagechange', () => {
  console.log('📃 Page:', figma.currentPage);
});

figma.on('close', () => {
  figma.notify('Closing...', {});
  console.log('❌ Close');
});