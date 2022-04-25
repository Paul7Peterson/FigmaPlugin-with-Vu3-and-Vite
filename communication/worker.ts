import type {
  ErrorMessage,
  AnyUIMessage,
} from './messages.types';
import { v4 as uuidv4 } from 'uuid';
import { UIMessagePayload } from './messages';

type VoidFunc = (...args: any[]) => void;

/** */
const REGISTER = new Map<string, { resolve: VoidFunc; reject: VoidFunc; }>();

type FigmaMessage = {
  pluginMessage: string,
  pluginId: string;
};

self.addEventListener('message', ({ data }: MessageEvent<FigmaMessage>) => {
  const pluginMessage: AnyUIMessage | ErrorMessage = JSON.parse(data.pluginMessage);
  const { id, type, payload } = pluginMessage;
  const result = REGISTER.get(id);
  if (!result) throw new Error('No resolver');

  if (pluginMessage.type === 'error') {
    console.error(pluginMessage.payload.message);
    result.reject(new Error(pluginMessage.payload.message));
  } else {
    console.log('💌', type, payload);
    result.resolve(payload || null);
    REGISTER.delete(id);
  }
});

/** */
export function registerCall<T extends keyof UIMessagePayload> (
  type: T,
  payload: Parameters<UIMessagePayload[T]>[0]
): Promise<ReturnType<UIMessagePayload[T]>> {
  return new Promise((resolve, reject) => {
    const id = uuidv4();
    parent.postMessage({ pluginMessage: JSON.stringify({ payload, type, id }) }, '*');
    REGISTER.set(id, { resolve, reject });
  });
}


