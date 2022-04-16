import { BrokerType, registerCall } from './worker';

export const Broker: BrokerType = {
  /** */
  createRectangles: (payload) => registerCall('createRectangles', payload),
  /** */
  receiveMessage: (payload) => registerCall('receiveMessage', payload),
  /** */
  getTokens: () => registerCall('getTokens', null),
  /** */
  getColorInfo: (payload) => registerCall('getColorInfo', payload),
  /** */
  listSolidColors: () => registerCall('listSolidColors', null),
  /** */
  deleteSolidColor: (payload) => registerCall('deleteSolidColor', payload),
  /** */
  createSolidColor: (payload) => registerCall('createSolidColor', payload),
  /** */
  modifySolidColor: (payload) => registerCall('modifySolidColor', payload),
  /** */
  resize: (payload) => registerCall('resize', payload),
  /** */
  closePlugin: () => registerCall('closePlugin', null),
};