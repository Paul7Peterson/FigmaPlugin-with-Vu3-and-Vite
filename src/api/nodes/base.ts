export class BaseNode<T extends SceneNode> {
  protected readonly _node: T;

  constructor (creator: () => T, name: string) {
    this._node = creator();
    this._node.name = name;
  }

  setParent (parent: BaseNode<ChildrenMixin & SceneNode>, position?: number): this;
  setParent (parent: ChildrenMixin, position?: number): this;
  setParent (parent: ChildrenMixin | BaseNode<SceneNode>, position?: number): this {
    const target: ChildrenMixin = 'appendChild' in parent
      ? parent : parent.node as ChildrenMixin;
    if (position) {
      target.insertChild(position, this._node);
    } else {
      target.appendChild(this._node);
    };
    return this;
  }

  get name () { return this._node.name; }
  set name (name: string) { this._node.name = name; }

  get visible () { return this._node.visible; }
  set visible (visible: boolean) { this._node.visible = visible; }

  get locked () { return this._node.locked; }
  set locked (locked: boolean) { this._node.locked = locked; }

  get node (): T { return this._node; }
}