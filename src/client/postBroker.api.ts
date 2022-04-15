import { answer, PostBrokerType } from './postBroker';

import { createRectangles } from './func';
import { getAllStyles } from './figma/styles';

/** */
export const PostBroker: PostBrokerType = {
  /** */
  receiveMessage: (msg) => answer(msg, msg.payload.number * 2),
  /** */
  createRectangles: (msg) => {
    createRectangles(msg.payload.count);
    answer(msg, null);
  },
  resize: (msg) => {
    figma.ui.resize(msg.payload.width, msg.payload.height);
    figma.clientStorage.setAsync('size', msg.payload).catch(err => { });
    answer(msg, null);
  },
  getTokens: (mgs) => answer(mgs, getAllStyles()),
  /** */
  closePlugin: () => figma.closePlugin()
};