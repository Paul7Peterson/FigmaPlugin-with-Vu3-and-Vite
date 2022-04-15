import {
  UIMessage,
  UIMessageCode,
  UIMessageReturn,
  UIMessageArg,
} from '@/types';
import { v4 as uuidv4 } from 'uuid';

type FigmaMessage = {
  pluginMessage: UIMessage<UIMessageCode>,
  pluginId: string;
};

const REGISTER = new Map<string, (...args: any[]) => void>();

self.addEventListener('message', ({ data }: MessageEvent<FigmaMessage>) => {
  const resolver = REGISTER.get(data.pluginMessage.id);
  console.log(['💌', data.pluginMessage.type, data.pluginMessage.payload]);
  if (!resolver) throw new Error('No resolver');
  resolver(data.pluginMessage.payload || null);
  REGISTER.delete(data.pluginMessage.id);
});

function registerCall<T extends UIMessageCode> (name: T, payload: UIMessageArg<T>): Promise<UIMessageReturn<T>> {
  return new Promise((resolve, reject) => {
    const id = uuidv4();
    parent.postMessage({
      pluginMessage: { payload, type: name, id }
    }, '*');
    REGISTER.set(id, resolve);
  });
}

type BrokerType = {
  [K in UIMessageCode]: UIMessageArg<K> extends null
  ? (() => Promise<UIMessageReturn<K>>)
  : ((arg: UIMessageArg<K>) => Promise<UIMessageReturn<K>>)
};

export const Broker: BrokerType = {
  createRectangles: (payload) => registerCall('createRectangles', payload),
  receiveMessage: (payload) => registerCall('receiveMessage', payload),
  closePlugin: () => registerCall('closePlugin', null),
};