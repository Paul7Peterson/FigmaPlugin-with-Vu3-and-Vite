import { NodeInfo } from '~api/nodes/_shared.types';
import { sendSocket } from './api';
import { APISocketMessage } from './sockets';

type APISocketsType = {
  [K in keyof APISocketMessage]: (arg: APISocketMessage[K]) => Promise<boolean>
};

export const APISockets: APISocketsType = {
  selectedNode: (node: NodeInfo) => sendSocket('selectedNode', node),
};