import { answer, PostBrokerType } from './postBroker';

import { createRectangles } from './func';
import {
  getAllStyles,
  createSolidColor,
  deleteColor,
  modifySolidColor,
  getSolidColors,
  getSolidColorInfo,
} from './styles';
import { FigmaStore } from './store';

/** */
export const PostBroker: PostBrokerType = {
  /** */
  receiveMessage: (msg) =>
    answer(msg, msg.payload.number * 2),
  /** */
  createRectangles: (msg) => {
    createRectangles(msg.payload.count);
    answer(msg, null);
  },
  /** */
  resize: (msg) => {
    figma.ui.resize(msg.payload.width, msg.payload.height);
    FigmaStore.getInstance.setKey('size', msg.payload)
      .catch((err) => { console.log(err); });
    answer(msg, null);
  },
  /** */
  getTokens: (msg) =>
    answer(msg, getAllStyles()),
  /** */
  getColorInfo: (msg) =>
    answer(msg, getSolidColorInfo(msg.payload)),
  /** */
  listSolidColors: (msg) =>
    answer(msg, getSolidColors()),
  /** */
  deleteSolidColor: async (msg) => {
    await deleteColor(msg.payload.id);
    answer(msg, null);
  },
  /** */
  createSolidColor: (msg) =>
    answer(msg, createSolidColor(msg.payload)),
  /** */
  modifySolidColor: (msg) =>
    answer(msg, modifySolidColor(msg.payload.id, msg.payload.color)),
  /** */
  throwError: (error) =>
    figma.ui.postMessage({ type: 'throwError', id: '', payload: { message: error.message } }),
  /** */
  closePlugin: () =>
    figma.closePlugin(),

};