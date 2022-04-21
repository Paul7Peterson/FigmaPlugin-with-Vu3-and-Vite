import { UIMessagePayload } from './messages';
import type {
  UIAnswer,
  GenericMessageCollection,
  GenericUIMessage,
  MessageInfo,
} from './messages.types';

export type GenericPostBrokerType<T extends GenericMessageCollection> = {
  [K in keyof T]: ((msg: GenericUIMessage<T, K>) => Promise<boolean>)
};

export type PostBrokerType = GenericPostBrokerType<UIMessagePayload>;

export function answer<T extends keyof UIMessagePayload> (
  { type, id }: MessageInfo<T>,
  payload: UIAnswer<T>['payload']
): Promise<boolean> {
  figma.ui.postMessage(JSON.stringify({ type, id, payload }));
  return Promise.resolve(true);
}
