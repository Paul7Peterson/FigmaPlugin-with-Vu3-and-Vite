import { BaseNode } from './base';

interface TextOptions {

}

export class Text extends BaseNode<TextNode> {
  constructor (
    public readonly options: Partial<TextOptions>,
    public readonly name: string = 'Text',
  ) {
    super(() => figma.createText(), name);
  }
}