// This plugin will open a window to prompt the user to enter a number, and
// it will then create that many rectangles on the screen.

import { FigmaStore } from './store/store';
import { UIMessageCode, UIMessage } from '../types/messages';
import { PostBroker } from './postBroker.api';

// This file holds the main code for the plugins. It has access to the *document*.
// You can access browser APIs in the <script> tag inside "ui.html" which has a
// full browser environment (see documentation).

// This shows the HTML page in "ui.html".

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

figma.ui.onmessage = (msg: UIMessage<UIMessageCode>) => {
  // if (msg.type !== 'resize') console.log('📦', msg);
  try {
    PostBroker[msg.type]?.(msg as any);
  } catch (error) {
    console.trace(error);
    // console.error({ msg });
    figma.notify((error as Error).message, { error: true, timeout: 3 });
    PostBroker.throwError(error as any);
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