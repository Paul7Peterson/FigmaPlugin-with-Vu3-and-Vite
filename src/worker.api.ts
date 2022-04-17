import { BrokerType, registerCall } from './worker';

export const Broker: BrokerType = {
  /** */
  getUser: () => registerCall('getUser', null),
  /** */
  getColorInfo: (payload) => registerCall('getColorInfo', payload),
  /** */
  listSolidColors: () => registerCall('listSolidColors', null),
  /** */
  deleteSolidColor: (payload) => registerCall('deleteSolidColor', payload),
  /** */
  createSolidColor: (payload) => registerCall('createSolidColor', payload),
  /** */
  createOrModifyRootSize: (payload) => registerCall('createOrModifyRootSize', payload),
  /** */
  modifySolidColor: (payload) => registerCall('modifySolidColor', payload),
  /** */
  resize: (payload) => registerCall('resize', payload),
  /** */
  closePlugin: () => registerCall('closePlugin', null),
  /** */
  listRootSizes: () => registerCall('listRootSizes', null),
  /** */
  listFontStyles: () => registerCall('listFontStyles', null),
  /** */
  listBoxShadowStyles: () => registerCall('listBoxShadowStyles', null),
  /** */
  listBorderStyles: () => registerCall('listBorderStyles', null),
  /** */
  listGridStyles: () => registerCall('listGridStyles', null),
  /** */
  listGutters: () => registerCall('listGutters', null),
};