import {
  UIMessage,
  UIMessageCode,
  UIMessageReturn,
  UIMessageArg,
} from '@/types';
import { v4 as uuidv4 } from 'uuid';


/** */
const REGISTER = new Map<string, (...args: any[]) => void>();

type FigmaMessage = {
  pluginMessage: UIMessage<UIMessageCode>,
  pluginId: string;
};

self.addEventListener('message', ({ data }: MessageEvent<FigmaMessage>) => {
  const resolver = REGISTER.get(data.pluginMessage.id);
  if (data.pluginMessage.type !== 'resize')
    console.log(['💌', data.pluginMessage.type, data.pluginMessage.payload]);
  if (!resolver) throw new Error('No resolver');
  resolver(data.pluginMessage.payload || null);
  REGISTER.delete(data.pluginMessage.id);
});

/** */
export function registerCall<T extends UIMessageCode> (name: T, payload: UIMessageArg<T>): Promise<UIMessageReturn<T>> {
  return new Promise((resolve, reject) => {
    const id = uuidv4();
    parent.postMessage({
      pluginMessage: { payload, type: name, id }
    }, '*');
    REGISTER.set(id, resolve);
  });
}

/** */
export type BrokerType = {
  [K in UIMessageCode]: UIMessageArg<K> extends null
  ? (() => Promise<UIMessageReturn<K>>)
  : ((arg: UIMessageArg<K>) => Promise<UIMessageReturn<K>>)
};

