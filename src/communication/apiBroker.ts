import { UIMessagePayload } from './messages';
import type {
  UIAnswer,
  GenericMessageCollection,
  GenericUIMessage,
  MessageInfo,
} from './messages.types';

export type GenericPostBrokerType<T extends GenericMessageCollection> = {
  [K in keyof T]: ((msg: GenericUIMessage<T, K>) => void)
};

export type PostBrokerType =
  & GenericPostBrokerType<UIMessagePayload>
  & { throwError: (arg: Error) => void; };

export function answer<T extends keyof UIMessagePayload> (
  { type, id }: MessageInfo<T>,
  payload: UIAnswer<T>['payload']
): void {
  return figma.ui.postMessage(JSON.stringify({ type, id, payload }));
}
