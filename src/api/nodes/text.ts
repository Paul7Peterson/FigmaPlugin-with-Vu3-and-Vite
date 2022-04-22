import { BaseNode } from './base';
import { assignFills } from './_shared';
import { FontFamily, FontStyle, NodeFill, VerticalPosition, HorizontalPosition } from './_shared.types';

interface TextOptions {
  fills: NodeFill;
  font: {
    family?: FontFamily;
    style?: FontStyle;
    align?: VerticalPosition;
    justify?: HorizontalPosition | 'justified';
  };
}

export class Text extends BaseNode<TextNode> {
  constructor (text: TextNode, options?: Partial<TextOptions>);
  constructor (name: string, options?: Partial<TextOptions>);
  constructor (asset: TextNode | string, options?: Partial<TextOptions>) {
    super(
      () => typeof asset === 'string' ? figma.createText() : asset,
      typeof asset === 'string' ? asset : asset.name,
    );

    if (options) this.modify(options);
  }

  static from (text: TextNode): Text {
    return new Text(text);
  }

  modify (options: Partial<TextOptions>): Text {
    if (options.font) this.setFont(options.font);
    if (options.fills) assignFills(this._node, [options.fills]);
    return this;
  }

  write (text: string) {
    this._node.characters = text;
  }

  private setFont (font: TextOptions['font']) {
    this.node.fontName = {
      family: font.family || 'Fabriga',
      style: font.style || 'Regular'
    };
    if (font.justify) {
      const parsedValue = font.justify.toUpperCase() as Uppercase<NonNullable<TextOptions['font']['justify']>>;
      this.node.textAlignHorizontal = parsedValue;
    };
    if (font.align) {
      const parsedValue = font.align.toUpperCase() as Uppercase<NonNullable<TextOptions['font']['align']>>;
      this.node.textAlignVertical = parsedValue;
    };
  }
}