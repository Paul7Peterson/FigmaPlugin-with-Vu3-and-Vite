// This plugin will open a window to prompt the user to enter a number, and
// it will then create that many rectangles on the screen.

import { UIMessageCode, UIMessage } from '../types/messages';
import { PostBroker } from '@/client/postBroker';

// This file holds the main code for the plugins. It has access to the *document*.
// You can access browser APIs in the <script> tag inside "ui.html" which has a
// full browser environment (see documentation).

// This shows the HTML page in "ui.html".
figma.showUI(__html__);

figma.viewport.center = { x: 0, y: 0 };

// Calls to "parent.postMessage" from within the HTML page will trigger this
// callback. The callback will be passed the "pluginMessage" property of the
// posted message.
figma.ui.onmessage = (msg: UIMessage<UIMessageCode>) => {
  // One way of distinguishing between different types of messages sent from
  // your HTML page is to use an object with a "type" property like this.

  console.log('📦', msg);

  switch (msg.type) {
    case 'createRectangles':
      return PostBroker.createRectangles?.(msg as UIMessage<'createRectangles'>);
    case 'receiveMessage':
      return PostBroker.receiveMessage?.(msg as UIMessage<'receiveMessage'>);
    case 'closePlugin': return figma.closePlugin();
    default: throw new Error();
  }

  // Make sure to close the plugin when you're done. Otherwise the plugin will
  // keep running, which shows the cancel button at the bottom of the screen.
};
