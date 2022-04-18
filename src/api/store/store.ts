import { StoreKey, Store } from './store.api';

/** */
export class FigmaStore {
  private static instance: FigmaStore;
  private documentStore: TextNode;

  private constructor () {
    const localStorageRef = figma.root.children[0]
      .findChild((n) => n.name === 'LocalStorage');
    if (!localStorageRef) throw new Error('');
    if (localStorageRef.type !== 'TEXT') throw new Error('');
    this.documentStore = localStorageRef;
    localStorageRef.locked = true;
    // localStorageRef.visible = false;
    this.documentStore.setPluginData('name', 'store');
  }

  /** */
  static get getInstance () {
    if (FigmaStore.instance) return this.instance;
    return this.instance = new FigmaStore();
  }

  /** */
  async getKeys (): Promise<string[]> {
    return figma.clientStorage.keysAsync();
  }

  /** */
  async setKey<T extends StoreKey> (key: T, value: Store[T]): Promise<void> {
    return figma.clientStorage.setAsync(key, value);
  }

  /** */
  async existsKey<T extends StoreKey> (key: T): Promise<boolean> {
    return !!(await figma.clientStorage.getAsync(key));
  }

  /** */
  async getKeyIfExists<T extends StoreKey> (key: T): Promise<Store[T]> {
    const value = await figma.clientStorage.getAsync(key);
    if (!value) throw new Error(`Key "${key}" not found in storage.`);
    return value;
  }

  /** */
  async getKey<T extends StoreKey> (key: T): Promise<Store[T] | null> {
    return figma.clientStorage.getAsync(key);
  }

  /** */
  async deleteKey<T extends StoreKey> (key: T): Promise<void> {
    return figma.clientStorage.deleteAsync(key);
  }


  async retrieveData (): Promise<void> {

  }

  /** */
  async persistData (): Promise<void> {
    const data: Record<string, any> = {};
    const keys = await figma.clientStorage.keysAsync();
    await Promise.all(keys.map((k) => new Promise<void>(async (resolve) => {
      data[k] = await figma.clientStorage.getAsync(k);
      resolve();
    })));
    await figma.loadFontAsync({ family: "Consolas", style: "Regular" });
    this.documentStore.characters = JSON.stringify(data, undefined, 2);
  }
}