import type {
  BordersUIMessages,
  BoxShadowsUIMessages,
  ColorsUIMessages,
  FontsUIMessages,
  GridsUIMessages,
  GuttersUIMessages,
  RootSizesUIMessages,
} from './messages';
import { answer, GenericPostBrokerType, PostBrokerType } from './apiBroker';

import * as Styles from '../api/styles';
import { FigmaStore } from '../api/store/store';
import { getUser } from '../api/figma';


const RootSizesPostBroker: GenericPostBrokerType<RootSizesUIMessages> = {
  listRootSizes: async (msg) =>
    answer(msg, await Styles.listRootSizes()),
  createRootSize: async (msg) => {
    answer(msg, await Styles.createRootSize());
  },
  modifyRootSizes: async (msg) => {
    await Styles.editRootSizes(msg.payload);
    answer(msg, null);
  },
  deleteRootSize: async (msg) => {
    await Styles.deleteRootSize(msg.payload);
    answer(msg, null);
  },
};

const GuttersPostBroker: GenericPostBrokerType<GuttersUIMessages> = {
  listGutters: async (msg) =>
    answer(msg, await Styles.listGutters()),
  createGutter: async (msg) => {
    answer(msg, await Styles.createGutter());
  },
  modifyGutters: async (msg) => {
    await Styles.editGutters(msg.payload);
    answer(msg, null);
  },
  deleteGutter: async (msg) => {
    await Styles.deleteGutter(msg.payload);
    answer(msg, null);
  },
};

const ColorsPostBroker: GenericPostBrokerType<ColorsUIMessages> = {
  listSolidColors: (msg) =>
    answer(msg, Styles.getSolidColors()),
  getColorInfo: (msg) =>
    answer(msg, Styles.getSolidColorInfo(msg.payload)),
  createSolidColor: (msg) =>
    answer(msg, Styles.createOrModifySolidColor(msg.payload)),
  modifySolidColor: (msg) =>
    answer(msg, Styles.createOrModifySolidColor(msg.payload.color, msg.payload.id)),
  deleteSolidColor: async (msg) => {
    await Styles.deleteColor(msg.payload.id);
    answer(msg, null);
  },
};

const FontsPostBroker: GenericPostBrokerType<FontsUIMessages> = {
  listFontStyles: (msg) =>
    answer(msg, Styles.listFontStyles()),
};

const BoxShadowsPostBroker: GenericPostBrokerType<BoxShadowsUIMessages> = {
  listBoxShadowsStyles: (msg) =>
    answer(msg, Styles.listBoxShadows()),
};

const BordersPostBroker: GenericPostBrokerType<BordersUIMessages> = {
  listBorderStyles: (msg) =>
    answer(msg, Styles.listBorderStyles()),
};

const GridsPostBroker: GenericPostBrokerType<GridsUIMessages> = {
  listGridStyles: (msg) =>
    answer(msg, Styles.listGridStyles()),
};

/** */
export const PostBroker: PostBrokerType = {
  ...RootSizesPostBroker,
  ...GuttersPostBroker,
  ...ColorsPostBroker,
  ...FontsPostBroker,
  ...BoxShadowsPostBroker,
  ...BordersPostBroker,
  ...GridsPostBroker,
  initApp: async (msg) => {
    await FigmaStore.getInstance.retrieveData();
    answer(msg, null);
  },
  getUser: (msg) =>
    answer(msg, getUser()),
  resize: (msg) => {
    figma.ui.resize(msg.payload.width, msg.payload.height);
    FigmaStore.getInstance.setKey('windowSize', msg.payload)
      .catch((err) => { console.log(err); });
    answer(msg, null);
  },
  throwError: ({ message }) =>
    figma.ui.postMessage({ type: 'throwError', id: '', payload: { message } }),
  closePlugin: async () => {
    const notification = figma.notify('Closing...', { timeout: 1_000_000 });
    await FigmaStore.getInstance.persistData();
    notification.cancel();
    figma.closePlugin();
  }
};