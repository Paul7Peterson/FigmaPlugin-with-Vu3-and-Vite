import { answer, PostBrokerType } from './postBroker';

import {
  createSolidColor,
  deleteColor,
  modifySolidColor,
  getSolidColors,
  getSolidColorInfo,
  getRootSizes,
} from './styles';
import { FigmaStore } from './store/store';
import { getUser } from '@/api/figma';

/** */
export const PostBroker: PostBrokerType = {
  /** */
  getUser: (msg) =>
    answer(msg, getUser()),
  /** */
  resize: (msg) => {
    figma.ui.resize(msg.payload.width, msg.payload.height);
    FigmaStore.getInstance.setKey('windowSize', msg.payload)
      .catch((err) => { console.log(err); });
    answer(msg, null);
  },
  /** */
  getColorInfo: (msg) =>
    answer(msg, getSolidColorInfo(msg.payload)),
  /** */
  listSolidColors: (msg) =>
    answer(msg, getSolidColors()),
  /** */
  listRootSizes: (msg) =>
    answer(msg, getRootSizes()),
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