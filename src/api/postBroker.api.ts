import { answer, PostBrokerType } from './postBroker';

import * as Styles from './styles';
import { FigmaStore } from './store/store';
import { getUser } from '@/api/figma';

/** */
export const PostBroker: PostBrokerType = {
  initApp: async (msg) => {
    await FigmaStore.getInstance.retrieveData();
    answer(msg, null);
  },
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
    answer(msg, Styles.getSolidColorInfo(msg.payload)),
  /** */
  listSolidColors: (msg) =>
    answer(msg, Styles.getSolidColors()),
  /** */
  listRootSizes: async (msg) =>
    answer(msg, await Styles.listRootSizes()),
  /** */
  listFontStyles: (msg) =>
    answer(msg, Styles.listFontStyles()),
  /** */
  listBoxShadowStyles: (msg) =>
    answer(msg, Styles.listBoxShadows()),
  /** */
  listBorderStyles: (msg) =>
    answer(msg, Styles.listBorderStyles()),
  /** */
  listGridStyles: (msg) =>
    answer(msg, Styles.listGridStyles()),
  /** */
  listGutters: async (msg) =>
    answer(msg, await Styles.listGutters()),
  /** */
  deleteSolidColor: async (msg) => {
    await Styles.deleteColor(msg.payload.id);
    answer(msg, null);
  },
  deleteRootSize: async (msg) => {
    await Styles.deleteRootSize(msg.payload);
    answer(msg, null);
  },
  /** */
  createSolidColor: (msg) =>
    answer(msg, Styles.createOrModifySolidColor(msg.payload)),
  /** */
  createOrModifyRootSize: async (msg) => {
    const result = msg.payload
      ? await Styles.editRootSize(msg.payload)
      : await Styles.createRootSize();
    answer(msg, result);
  },
  /** */
  modifySolidColor: (msg) =>
    answer(msg, Styles.createOrModifySolidColor(msg.payload.color, msg.payload.id)),
  /** */
  throwError: (error) =>
    figma.ui.postMessage({ type: 'throwError', id: '', payload: { message: error.message } }),
  /** */
  closePlugin: async () => {
    const notification = figma.notify('Closing...', { timeout: 1_000_000 });
    await FigmaStore.getInstance.persistData();
    notification.cancel();
    figma.closePlugin();
  }
};