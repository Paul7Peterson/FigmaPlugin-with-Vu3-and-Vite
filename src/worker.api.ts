import { BrokerType, registerCall } from './worker';

export const Broker: BrokerType = {
  /** */
  createRectangles: (payload) => registerCall('createRectangles', payload),
  /** */
  receiveMessage: (payload) => registerCall('receiveMessage', payload),
  /** */
  getTokens: () => registerCall('getTokens', null),
  /** */
  resize: (payload) => registerCall('resize', payload),
  /** */
  closePlugin: () => registerCall('closePlugin', null),
};