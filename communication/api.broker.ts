import * as Components from '~api/components';
import { initApp } from '~api/init';
import { FigmaStore } from '~api/store/store';
import * as Tokens from '~api/tokens';
import { FrameAPI } from '../api/nodes/frame.mods';
import { answer, GenericPostBrokerType, PostBrokerType } from './api';
import type {
  BordersUIMessages,
  BoxShadowsUIMessages,
  ColorsUIMessages,
  ComponentsUIMessages,
  EditorUIMessages,
  FontsUIMessages,
  GridsUIMessages,
  GuttersUIMessages,
  RootSizesUIMessages
} from './messages';

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

const ComponentsPostBroker: GenericPostBrokerType<ComponentsUIMessages> = {
  listComponents: async (msg) => {
    return answer(msg, await Components.listAllComponents());
  },
};

const EditorPostBroker: GenericPostBrokerType<EditorUIMessages> = {
  modifyGap: async (msg) => {
    FrameAPI(msg.payload.nodeId).modifyGap(msg.payload.gap);
    return answer(msg, null);
  },
  modifyPadding: async (msg) => {
    FrameAPI(msg.payload.nodeId).modifyPadding(msg.payload.padding);
    return answer(msg, null);
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
  ...ComponentsPostBroker,
  ...EditorPostBroker,
  initApp: async (msg) => {
    return answer(msg, await initApp());
  },
  resize: async (msg) => {
    figma.ui.resize(msg.payload.width, msg.payload.height);
    FigmaStore.getInstance.setKey('windowSize', msg.payload)
      .catch((err) => { console.log(err); });
    return answer(msg, null);
  },
  updateDocumentation: async (msg) => {
    await Tokens.writeDocs();
    return answer(msg, null);
  },
  closePlugin: async () => {
    const notification = figma.notify('Closing...', { timeout: 1_000_000 });
    // await FigmaStore.getInstance.persistData();
    notification.cancel();
    figma.closePlugin();
    return false;
  }
};