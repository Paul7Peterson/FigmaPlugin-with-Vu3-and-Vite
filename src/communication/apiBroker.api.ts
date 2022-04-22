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

import * as Tokens from '../api/tokens';
import { FigmaStore } from '../api/store/store';
import { getUser } from '../api/figma';
import { writeDocs } from '../api/data';
import { initApp } from '../api/tokens/init';


const RootSizesPostBroker: GenericPostBrokerType<RootSizesUIMessages> = {
  listRootSizes: async (msg) => {
    return answer(msg, await Tokens.listRootSizes());
  },
  createRootSize: async (msg) => {
    return answer(msg, await Tokens.createRootSize());
  },
  modifyRootSizes: async (msg) => {
    await Tokens.editRootSizes(msg.payload);
    return answer(msg, null);
  },
  deleteRootSize: async (msg) => {
    await Tokens.deleteRootSize(msg.payload);
    return answer(msg, null);
  },
};

const GuttersPostBroker: GenericPostBrokerType<GuttersUIMessages> = {
  listGutters: async (msg) => {
    return answer(msg, await Tokens.listGutters());
  },
  createGutter: async (msg) => {
    return answer(msg, await Tokens.createGutter(msg.payload));
  },
  modifyGutters: async (msg) => {
    await Tokens.editGutters(msg.payload);
    return answer(msg, null);
  },
  deleteGutter: async (msg) => {
    await Tokens.deleteGutter(msg.payload);
    return answer(msg, null);
  },
};

const ColorsPostBroker: GenericPostBrokerType<ColorsUIMessages> = {
  listSolidColors: async (msg) => {
    return answer(msg, await Tokens.listSolidColors());
  },
  getColorInfo: (msg) => {
    return answer(msg, Tokens.getSolidColorInfo(msg.payload));
  },
  createSolidColor: async (msg) => {
    return answer(msg, await Tokens.createOrModifySolidColor(msg.payload));
  },
  modifySolidColor: async (msg) => {
    return answer(msg, await Tokens.createOrModifySolidColor(msg.payload.color, msg.payload.id));
  },
  deleteSolidColor: async (msg) => {
    await Tokens.deleteColor(msg.payload.id);
    return answer(msg, null);
  },
};

const FontsPostBroker: GenericPostBrokerType<FontsUIMessages> = {
  listFontStyles: async (msg) => {
    return answer(msg, await Tokens.listFontStyles());
  },
};

const BoxShadowsPostBroker: GenericPostBrokerType<BoxShadowsUIMessages> = {
  listBoxShadowsStyles: async (msg) => {
    return answer(msg, await Tokens.listBoxShadows());
  },
};

const BordersPostBroker: GenericPostBrokerType<BordersUIMessages> = {
  listBorderStyles: async (msg) => {
    return answer(msg, await Tokens.listBorderStyles());
  },
};

const GridsPostBroker: GenericPostBrokerType<GridsUIMessages> = {
  listGridStyles: async (msg) => {
    return answer(msg, await Tokens.listGridStyles());
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
    return answer(msg, await initApp());
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