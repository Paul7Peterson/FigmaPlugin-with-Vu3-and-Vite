import { UIMessageCode } from '@/types';
import { v4 as uuidv4 } from 'uuid';

type FigmaMessage = {
  pluginMessage: {
    type: UIMessageCode;
    id: string;
    payload: any;
  },
  pluginId: string;
};

const REGISTER = new Map<string, (...args: any[]) => void>();

self.addEventListener('message', ({ data }: MessageEvent<FigmaMessage>) => {
  const resolver = REGISTER.get(data.pluginMessage.id);
  console.log(['💌', data.pluginMessage.type, data.pluginMessage.payload]);
  if (!resolver) throw new Error('No resolver');
  resolver(data.pluginMessage.payload);
  REGISTER.delete(data.pluginMessage.id);
});

function registerCall<T> (name: UIMessageCode, payload: any): Promise<T> {
  return new Promise((resolve, reject) => {
    const id = uuidv4();
    parent.postMessage({
      pluginMessage: { ...payload, type: name, id }
    }, '*');
    REGISTER.set(id, resolve);
  });
}

export const Broker: Record<UIMessageCode, Function> = {
  createRectangles: function (count: number): Promise<number> {
    return registerCall<number>('createRectangles', { count });
  },
  receiveMessage: function (number: number): Promise<number> {
    return registerCall<number>('receiveMessage', number);
  },
  closePlugin: function () {
    return registerCall<number>('closePlugin', null);
  }
};