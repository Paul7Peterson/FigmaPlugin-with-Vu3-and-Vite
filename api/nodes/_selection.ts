import { APISockets } from '~comm/api.sockets';
import { NodeInfo } from './_shared.types';



export function onNodeSelection () {
  if (figma.currentPage.selection.length === 1) {
    const selection = figma.currentPage.selection[0];
    const nodeInfo: NodeInfo = {
      id: selection.id,
      type: selection.type,
      name: selection.name,
      gap: 'itemSpacing' in selection ? selection.itemSpacing : null,
      padding: 'paddingLeft' in selection
        ? {
          top: selection.paddingTop,
          right: selection.paddingRight,
          bottom: selection.paddingBottom,
          left: selection.paddingLeft,
        }
        : null
    };
    console.log('🔵 Select:', selection, nodeInfo);
    APISockets.selectedNode(nodeInfo);
  }
}