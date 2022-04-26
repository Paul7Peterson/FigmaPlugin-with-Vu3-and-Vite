import { BaseNode } from './base';
import { assignBorderRadius, assignFills, setAutoLayout, setResizing } from './_shared';
import { AutoLayoutDirection, AutoLayoutOptions, DirectionalAssign, NodeFill, NodeSize, ResizingOptions } from './_shared.types';

export interface FrameOptions {
  props: {
    size?: NodeSize,
    cornerRadius?: DirectionalAssign;
  };
  autoLayout: AutoLayoutOptions;
  resizing: ResizingOptions;
  fills: NodeFill;
};

export class Frame extends BaseNode<FrameNode> {
  constructor (frame: FrameNode, options?: Partial<FrameOptions>);
  constructor (name: string, options?: Partial<FrameOptions>);
  constructor (asset: FrameNode | string, options?: Partial<FrameOptions>) {
    super(
      () => typeof asset === 'string' ? figma.createFrame() : asset,
      typeof asset === 'string' ? asset : asset.name,
    );

    if (options) this.modify(options);
  }

  static from (frame: FrameNode): Frame {
    return new Frame(frame);
  }

  static fromComponentInstance (instance: InstanceNode): Frame {
    return new Frame(instance as unknown as FrameNode);
  }

  modify (options: Partial<FrameOptions>): Frame {
    if (options.props) this.setProps(options.props);
    if (options.autoLayout) this.setAutoLayout(options.autoLayout);
    if (options.resizing) this.setResizing(options.resizing, options.autoLayout?.direction);
    if (options.fills) assignFills(this._node, options.fills as any);
    return this;
  }

  removeChildren (): Frame {
    this._node.children.forEach((c) => { c.remove(); });
    return this;
  }

  setChild (node: BaseNode<SceneNode>) {
    this._node.appendChild(node.node);
  }

  setChildren (node: SceneNode) {
    this._node.appendChild(node);
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