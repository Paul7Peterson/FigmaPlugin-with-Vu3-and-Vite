import { Frame, Text, TextOptions } from '../nodes';
import { FontRef } from '../nodes/_shared.types';
import { StoreKey, Store } from './store.api';


const LOCAL_STORAGE_NAME = 'Storage';
const FONT: FontRef = { family: 'Consolas', style: 'Regular' };
const TEXT_STYLE: TextOptions = { font: { ...FONT, size: 12 }, fills: 'White' };

/** */
export class FigmaStore {
  private static instance: FigmaStore;
  private documentStore: Frame;
  private storeMap = new Map<StoreKey, Text>();

  private constructor () {
    const localStorageRef = figma.root.children[0]
      .findChild((n) => n.name === LOCAL_STORAGE_NAME);

    if (!localStorageRef) {
      this.documentStore = new Frame(LOCAL_STORAGE_NAME, {
        autoLayout: {
          direction: 'vertical',
          gap: 5,
        },
        fills: ['Black'],
        resizing: {
          width: 'fill container'
        }
      })
        .setParent(figma.root.children[0], 1);
    } else {
      if (localStorageRef.type !== 'FRAME')
        throw new Error(`The "${LOCAL_STORAGE_NAME}" must be a FRAME element.`);

      this.documentStore = new Frame(localStorageRef);
    }

    this.documentStore.locked = true;
    this.documentStore.visible = false;
  }

  /** */
  static get getInstance () {
    if (FigmaStore.instance) return this.instance;
    return this.instance = new FigmaStore();
  }

  /** */
  async getKeys (): Promise<StoreKey[]> {
    const keys: StoreKey[] = [];
    for (const key of this.storeMap.keys())
      keys.push(key);
    return keys;
  }

  /** */
  async setKey<T extends StoreKey> (key: T, value: Store[T]): Promise<void> {
    this.getStoreCollection(key).write(JSON.stringify(value));
  }

  /** */
  async existsKey<T extends StoreKey> (key: T): Promise<boolean> {
    return !!this.storeMap.get(key);
  }

  /** */
  async getKeyIfExists<T extends StoreKey> (key: T): Promise<Store[T]> {
    const value = await this.getKey(key);
    if (!value) throw new Error(`Key "${key}" not found in storage.`);
    return value;
  }

  /** */
  async getKey<T extends StoreKey> (key: T): Promise<Store[T] | null> {
    const content = this.getStoreCollection(key).node.characters;
    return content ? JSON.parse(content) : null;
  }

  /** */
  async deleteKey<T extends StoreKey> (key: T): Promise<void> {
    this.getStoreCollection(key).node.remove();
    this.storeMap.delete(key);
  }

  static async retrieveData (): Promise<void> {
    console.log('Retrieving data...');
    const inst = FigmaStore.getInstance;

    inst.documentStore.node.children.forEach((t) => {
      if (t.type !== 'TEXT') return t.remove();
      const collection = new Text(t, TEXT_STYLE);
      inst.storeMap.set(t.name as StoreKey, collection);
    });
    try {

    } catch (e) {
      throw new Error('Error while retrieving data');
    }
  }

  private getStoreCollection (key: StoreKey): Text {
    return this.storeMap.get(key) || this.createStoreCollection(key);
  }

  private createStoreCollection (key: StoreKey): Text {
    const collection = new Text(key, TEXT_STYLE)
      .setParent(this.documentStore)
      .write('null');
    this.storeMap.set(key, collection);
    return collection;
  }
}