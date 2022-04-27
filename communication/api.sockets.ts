import { sendSocket } from './api';
import { APISocketMessage } from './sockets';

type APISocketsType = {
  [K in keyof APISocketMessage]: (arg: APISocketMessage[K]) => Promise<boolean>
};

export const APISockets: APISocketsType = {
  selectedNode: (node: SceneNode) => sendSocket('selectedNode', node),
};