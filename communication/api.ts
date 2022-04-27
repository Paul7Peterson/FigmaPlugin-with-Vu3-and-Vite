import { UIMessagePayload } from './messages';
import type {
  GenericMessageCollection,
  GenericUIMessage,
  MessageInfo, UIAnswer
} from './messages.types';
import { APISocketMessage } from './sockets';

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

export function sendSocket<T extends keyof APISocketMessage> (
  type: T,
  payload: APISocketMessage[T]
): Promise<boolean> {
  figma.ui.postMessage(JSON.stringify({ type, payload, isSocket: true }));
  return Promise.resolve(true);
}