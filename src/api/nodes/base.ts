export class BaseNode<T extends SceneNode> {
  protected readonly _node: T;

  constructor (creator: () => T, name: string) {
    this._node = creator();
    this._node.name = name;
  }

  setParent (parent: ChildrenMixin, position?: number): this {
    if (position) {
      parent.insertChild(position, this._node);
    } else {
      parent.appendChild(this._node);
    };
    return this;
  }

  get node (): T {
    return this._node;
  }
}