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

import * as Styles from '../api/tokens';
import { FigmaStore } from '../api/store/store';
import { getUser } from '../api/figma';
import { writeDocs } from '../api/data';


const RootSizesPostBroker: GenericPostBrokerType<RootSizesUIMessages> = {
  listRootSizes: async (msg) => {
    return answer(msg, await Styles.listRootSizes());
  },
  createRootSize: async (msg) => {
    return answer(msg, await Styles.createRootSize());
  },
  modifyRootSizes: async (msg) => {
    await Styles.editRootSizes(msg.payload);
    return answer(msg, null);
  },
  deleteRootSize: async (msg) => {
    await Styles.deleteRootSize(msg.payload);
    return answer(msg, null);
  },
};

const GuttersPostBroker: GenericPostBrokerType<GuttersUIMessages> = {
  listGutters: async (msg) => {
    return answer(msg, await Styles.listGutters());
  },
  createGutter: async (msg) => {
    return answer(msg, await Styles.createGutter(msg.payload));
  },
  modifyGutters: async (msg) => {
    await Styles.editGutters(msg.payload);
    return answer(msg, null);
  },
  deleteGutter: async (msg) => {
    await Styles.deleteGutter(msg.payload);
    return answer(msg, null);
  },
};

const ColorsPostBroker: GenericPostBrokerType<ColorsUIMessages> = {
  listSolidColors: async (msg) => {
    return answer(msg, await Styles.listSolidColors());
  },
  getColorInfo: (msg) => {
    return answer(msg, Styles.getSolidColorInfo(msg.payload));
  },
  createSolidColor: async (msg) => {
    return answer(msg, await Styles.createOrModifySolidColor(msg.payload));
  },
  modifySolidColor: async (msg) => {
    return answer(msg, await Styles.createOrModifySolidColor(msg.payload.color, msg.payload.id));
  },
  deleteSolidColor: async (msg) => {
    await Styles.deleteColor(msg.payload.id);
    return answer(msg, null);
  },
};

const FontsPostBroker: GenericPostBrokerType<FontsUIMessages> = {
  listFontStyles: async (msg) => {
    return answer(msg, await Styles.listFontStyles());
  },
};

const BoxShadowsPostBroker: GenericPostBrokerType<BoxShadowsUIMessages> = {
  listBoxShadowsStyles: async (msg) => {
    return answer(msg, await Styles.listBoxShadows());
  },
};

const BordersPostBroker: GenericPostBrokerType<BordersUIMessages> = {
  listBorderStyles: async (msg) => {
    return answer(msg, await Styles.listBorderStyles());
  },
};

const GridsPostBroker: GenericPostBrokerType<GridsUIMessages> = {
  listGridStyles: async (msg) => {
    return answer(msg, await Styles.listGridStyles());
  },
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
    return answer(msg, null);
  },
  getUser: async (msg) => {
    return answer(msg, getUser());
  },
  resize: async (msg) => {
    figma.ui.resize(msg.payload.width, msg.payload.height);
    FigmaStore.getInstance.setKey('windowSize', msg.payload)
      .catch((err) => { console.log(err); });
    return answer(msg, null);
  },
  updateDocumentation: async (msg) => {
    await writeDocs();
    return answer(msg, null);
  },
  closePlugin: async () => {
    const notification = figma.notify('Closing...', { timeout: 1_000_000 });
    await FigmaStore.getInstance.persistData();
    notification.cancel();
    figma.closePlugin();
    return false;
  }
};