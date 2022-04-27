import { Frame } from './frame';

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
    modifyGap (gap: number) {
      frame.modify({ autoLayout: { gap } });
      return this;
    },
    /** */
    modifyPadding (padding: [number, number, number, number]) {
      frame.modify({ autoLayout: { padding } });
      return this;
    }
  };
}

