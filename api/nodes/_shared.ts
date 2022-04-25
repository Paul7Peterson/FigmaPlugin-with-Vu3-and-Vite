import { colorToPaint } from '../tokens';
import { AutoLayoutDirection, AutoLayoutOptions, ResizingOptions, DirectionalAssign, NodeFill, DefaultColor } from './_shared.types';

type AxisMode =
  | 'primaryAxisSizingMode'
  | 'counterAxisSizingMode';

type FigmaNode = FrameNode;

export function setResizing (
  node: FigmaNode,
  { width, height }: ResizingOptions,
  direction: AutoLayoutDirection = 'horizontal'
): void {
  if (width) {
    const axis: AxisMode = direction === 'horizontal'
      ? 'primaryAxisSizingMode' : 'counterAxisSizingMode';
    switch (width) {
      case 'fixed width': node[axis] = 'FIXED';
      case 'fill container': node.layoutAlign = 'STRETCH'; break;
      case 'hug contents': node[axis] = 'AUTO'; break;
    }
  }
  if (height) {
    const axis: AxisMode = direction === 'horizontal'
      ? 'counterAxisSizingMode' : 'primaryAxisSizingMode';
    switch (height) {
      case 'fixed height': node[axis] = 'FIXED';
      case 'fill container': node.layoutAlign = 'STRETCH'; break;
      case 'hug contents': node[axis] = 'AUTO'; break;
    }
  }
}

export function setAutoLayout (node: FigmaNode, autoLayoutOptions: AutoLayoutOptions): void {
  const { direction = 'horizontal', padding, gap, distribution, align } = autoLayoutOptions;
  node.layoutMode = direction === 'horizontal' ? 'HORIZONTAL' : 'VERTICAL';
  if (gap) node.itemSpacing = gap;
  if (padding) assignPadding(node, padding);
  if (align) {
    const [y, x] = align;
    const Y: 'MIN' | 'MAX' | 'CENTER' =
      y === 'top' ? 'MIN' : (y === 'bottom' ? 'MAX' : 'CENTER');
    const X: 'MIN' | 'MAX' | 'CENTER' =
      x === 'left' ? 'MIN' : (x === 'right' ? 'MAX' : 'CENTER');
    node.primaryAxisAlignItems = direction === 'horizontal' ? X : Y;
    node.counterAxisAlignItems = direction === 'horizontal' ? Y : X;
  }
  if (distribution === 'space between') {
    node.primaryAxisAlignItems = 'SPACE_BETWEEN';
  }
}

function assignPadding (node: FigmaNode, padding: DirectionalAssign) {
  const isArray = Array.isArray(padding);
  node.paddingTop = isArray ? padding[0] : padding;
  node.paddingRight = isArray ? padding[1] : padding;
  node.paddingBottom = isArray ? padding[2] : padding;
  node.paddingLeft = isArray ? padding[3] : padding;
}

export function assignBorderRadius (node: FigmaNode, cornerRadius: DirectionalAssign) {
  if (Array.isArray(cornerRadius)) {
    node.topRightRadius = cornerRadius[0];
    node.bottomRightRadius = cornerRadius[1];
    node.bottomLeftRadius = cornerRadius[2];
    node.topLeftRadius = cornerRadius[3];
  } else {
    node.cornerRadius = cornerRadius;
  }
}

export function assignFills (node: MinimalFillsMixin, fills: NodeFill[]) {
  node.fills = fills.map((c) => {
    if (typeof c === 'object') return colorToPaint(c.color);
    return DefaultColor[c];
  });
}