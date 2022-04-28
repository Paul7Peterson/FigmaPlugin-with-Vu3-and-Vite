import { Frame } from './frame';
import { NAMESPACE } from './_shared';
import { spaceToNumber } from './_shared.mods';
import { Space } from './_shared.types';

function getFrame (id: string): Frame {
  const node = figma.getNodeById(id);
  if (!node) throw new Error(`Node "${id}" not found.`);
  if (node.type === 'FRAME') return Frame.from(node);
  if (node.type === 'INSTANCE' || node.type === 'COMPONENT')
    return Frame.fromComponent(node);
  throw new Error(`Node "${id}" is not a FRAME.`);
}

export function FrameAPI (id: string) {
  const frame = getFrame(id);

  return {
    /** */
    modifyGap (space: Space) {
      const gap = spaceToNumber(space);
      frame.modify({ autoLayout: { gap } });
      frame.node.setSharedPluginData(NAMESPACE, 'gap', gap.toString());
      return this;
    },
    /** */
    modifyPadding (paddingSpace: [Space, Space, Space, Space]) {
      const padding = paddingSpace.map((s) => spaceToNumber(s)) as [number, number, number, number];
      frame.modify({ autoLayout: { padding } });
      frame.node.setSharedPluginData(NAMESPACE, 'padding', padding.toString());
      return this;
    }
  };
}

