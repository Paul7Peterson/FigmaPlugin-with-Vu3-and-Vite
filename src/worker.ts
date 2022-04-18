import {
  UIMessage,
  UIMessageCode,
  UIMessageReturn,
  UIMessageArg,
  ErrorMessage,
} from '@/types';
import { v4 as uuidv4 } from 'uuid';

type VoidFunc = (...args: any[]) => void;

/** */
const REGISTER = new Map<string, { resolve: VoidFunc; reject: VoidFunc; }>();

type FigmaMessage = {
  pluginMessage: string,
  pluginId: string;
};

self.addEventListener('message', ({ data }: MessageEvent<FigmaMessage>) => {
  const pluginMessage: UIMessage<UIMessageCode> | ErrorMessage = JSON.parse(data.pluginMessage);
  if (pluginMessage.type === 'error') {
    console.error(pluginMessage.payload.message);
  } else {
    const { id, type, payload } = pluginMessage;
    const result = REGISTER.get(id);
    console.log('💌', type, payload);
    if (!result) throw new Error('No resolver');
    result.resolve(payload || null);
    REGISTER.delete(id);
  }
});

/** */
export function registerCall<T extends UIMessageCode> (type: T, payload: UIMessageArg<T>): Promise<UIMessageReturn<T>> {
  return new Promise((resolve, reject) => {
    const id = uuidv4();
    parent.postMessage({ pluginMessage: JSON.stringify({ payload, type, id }) }, '*');
    REGISTER.set(id, { resolve, reject });
  });
}

/** */
export type BrokerType = {
  [K in UIMessageCode]: UIMessageArg<K> extends null
  ? (() => Promise<UIMessageReturn<K>>)
  : ((arg: UIMessageArg<K>) => Promise<UIMessageReturn<K>>)
};

