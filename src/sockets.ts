import { SocketMessage } from '~comm/messages.types';
import { APISocketMessage } from '~comm/sockets';
import { useEditorStore } from './store/editor.store';

export function SocketHandler ({ type, payload }: SocketMessage<keyof APISocketMessage>) {
  switch (type) {
    case 'selectedNode':
      useEditorStore().onSelectedNode(payload); break;
    default:
      throw new Error('Socket not registered');
  }

}