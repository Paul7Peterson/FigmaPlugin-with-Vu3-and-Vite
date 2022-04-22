import { colorToPaint } from '../tokens/color/color.helpers';
import { BaseNode } from './base';
import { assignBorderRadius, setAutoLayout, setResizing } from './_shared';
import { AutoLayoutDirection, AutoLayoutOptions, DefaultColor, DirectionalAssign, NodeFill, NodeSize, ResizingOptions } from './_shared.types';

interface FrameOptions {
  props: {
    size?: NodeSize,
    cornerRadius?: DirectionalAssign;
  };
  autoLayout: AutoLayoutOptions;
  resizing: ResizingOptions;
  fills: NodeFill[];
};

export class Frame extends BaseNode<FrameNode> {
  constructor (
    public readonly options: Partial<FrameOptions>,
    public readonly name: string = 'Frame',
  ) {
    super(() => figma.createFrame(), name);

    if (options.props) this.setProps(options.props);
    if (options.autoLayout) this.setAutoLayout(options.autoLayout);
    if (options.resizing) this.setResizing(options.resizing, options.autoLayout?.direction);
    if (options.fills) this._node.fills = options.fills.map((c) => {
      if (typeof c === 'object') return colorToPaint(c.color);
      return DefaultColor[c];
    });
  }

  private setProps ({ size, cornerRadius }: FrameOptions['props']) {
    if (size) this._node.resize(size.width, size.height);
    if (cornerRadius) assignBorderRadius(this._node, cornerRadius);
  }

  private setAutoLayout (autoLayoutOptions: FrameOptions['autoLayout']): void {
    setAutoLayout(this._node, autoLayoutOptions);
  }

  private setResizing (resizingOptions: ResizingOptions, direction: AutoLayoutDirection = 'horizontal'): void {
    setResizing(this._node, resizingOptions, direction);
  }
}