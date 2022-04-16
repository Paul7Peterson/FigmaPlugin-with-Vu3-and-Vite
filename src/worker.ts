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
  pluginMessage: UIMessage<UIMessageCode> | ErrorMessage,
  pluginId: string;
};

self.addEventListener('message', ({ data }: MessageEvent<FigmaMessage>) => {
  if (data.pluginMessage.type === 'error') {
    console.error(data.pluginMessage.payload.message);
  } else {
    const result = REGISTER.get(data.pluginMessage.id);
    // console.log(['💌', data.pluginMessage.type, data.pluginMessage.payload]);
    if (!result) throw new Error('No resolver');
    result.resolve(data.pluginMessage.payload || null);
    REGISTER.delete(data.pluginMessage.id);
  }
});

/** */
export function registerCall<T extends UIMessageCode> (name: T, payload: UIMessageArg<T>): Promise<UIMessageReturn<T>> {
  return new Promise((resolve, reject) => {
    const id = uuidv4();
    parent.postMessage({
      pluginMessage: { payload, type: name, id }
    }, '*');
    REGISTER.set(id, { resolve, reject });
  });
}

/** */
export type BrokerType = {
  [K in UIMessageCode]: UIMessageArg<K> extends null
  ? (() => Promise<UIMessageReturn<K>>)
  : ((arg: UIMessageArg<K>) => Promise<UIMessageReturn<K>>)
};

