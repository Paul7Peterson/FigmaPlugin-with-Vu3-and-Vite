import {
  RootSizesUIMessages,
  GuttersUIMessages,
  UIMessagePayload,
  ColorsUIMessages,
  FontsUIMessages,
  BoxShadowsUIMessages,
  BordersUIMessages,
  GridsUIMessages,
} from './messages';
import { BrokerGenericType } from './messages.types';
import { registerCall } from './worker';


const RootSizesBroker: BrokerGenericType<RootSizesUIMessages> = {
  listRootSizes: () => registerCall('listRootSizes', null),
  createRootSize: () => registerCall('createRootSize', null),
  modifyRootSizes: (payload) => registerCall('modifyRootSizes', payload),
  deleteRootSize: (payload) => registerCall('deleteRootSize', payload),
};

const GuttersBroker: BrokerGenericType<GuttersUIMessages> = {
  listGutters: () => registerCall('listGutters', null),
  createGutter: (payload) => registerCall('createGutter', payload),
  modifyGutters: (payload) => registerCall('modifyGutters', payload),
  deleteGutter: (payload) => registerCall('deleteGutter', payload),
};

const ColorsBroker: BrokerGenericType<ColorsUIMessages> = {
  listSolidColors: () => registerCall('listSolidColors', null),
  getColorInfo: (payload) => registerCall('getColorInfo', payload),
  createSolidColor: (payload) => registerCall('createSolidColor', payload),
  modifySolidColor: (payload) => registerCall('modifySolidColor', payload),
  deleteSolidColor: (payload) => registerCall('deleteSolidColor', payload),
};

const FontsBroker: BrokerGenericType<FontsUIMessages> = {
  listFontStyles: () => registerCall('listFontStyles', null),
};

const BoxShadowsBroker: BrokerGenericType<BoxShadowsUIMessages> = {
  listBoxShadowsStyles: () => registerCall('listBoxShadowsStyles', null),
};

const BordersBroker: BrokerGenericType<BordersUIMessages> = {
  listBorderStyles: () => registerCall('listBorderStyles', null),
};

const GridsBroker: BrokerGenericType<GridsUIMessages> = {
  listGridStyles: () => registerCall('listGridStyles', null),
};

export const Broker: BrokerGenericType<UIMessagePayload> = {
  ...RootSizesBroker,
  ...GuttersBroker,
  ...ColorsBroker,
  ...FontsBroker,
  ...BoxShadowsBroker,
  ...BordersBroker,
  ...GridsBroker,
  initApp: () => registerCall('initApp', null),
  resize: (payload) => registerCall('resize', payload),
  updateDocumentation: () => registerCall('updateDocumentation', null),
  closePlugin: () => registerCall('closePlugin', null),
};