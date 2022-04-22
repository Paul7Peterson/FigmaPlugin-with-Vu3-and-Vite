import { Text } from '../nodes';
import { FontRef } from '../nodes/_shared.types';
import { StoreKey, Store } from './store.api';


const LOCAL_STORAGE_NAME = 'LocalStorage';
const FONT: FontRef = { family: 'Consolas', style: 'Regular' };
/** */
export class FigmaStore {
  private static instance: FigmaStore;
  private documentStore: TextNode;

  private constructor () {
    let localStorageRef = figma.root.children[0]
      .findChild((n) => n.name === 'LocalStorage');

    if (!localStorageRef) {
      localStorageRef = new Text(LOCAL_STORAGE_NAME, {
        font: { ...FONT, size: 12 }
      })
        .setParent(figma.root.children[0], 1)
        .write('{}').node;
    } else {
      if (localStorageRef.type !== 'TEXT')
        throw new Error('The "LocalStorage" must be a text element.');
    }

    this.documentStore = localStorageRef;
    localStorageRef.locked = true;
    localStorageRef.visible = false;
    this.documentStore.setPluginData('name', 'store');
  }

  /** */
  static get getInstance () {
    if (FigmaStore.instance) return this.instance;
    return this.instance = new FigmaStore();
  }

  /** */
  async getKeys (): Promise<(keyof Store)[]> {
    const allKeys = await figma.clientStorage.keysAsync();
    return allKeys as (keyof Store)[];
  }

  /** */
  async setKey<T extends StoreKey> (key: T, value: Store[T]): Promise<void> {
    await figma.clientStorage.setAsync(key, value);
    return this.persistData();
  }

  /** */
  async existsKey<T extends StoreKey> (key: T): Promise<boolean> {
    return !!(await figma.clientStorage.getAsync(key));
  }

  /** */
  async getKeyIfExists<T extends StoreKey> (key: T): Promise<Store[T]> {
    const value = await this.getKey(key);
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


  static async retrieveData (): Promise<void> {
    console.log('Retrieving data...');

    await figma.loadFontAsync(FONT);
    const inst = FigmaStore.getInstance;
    try {
      const data = JSON.parse(inst.documentStore.characters) as Partial<Store>;
      // console.log('DATA:', data);
      let oldKeys = await inst.getKeys();

      const promises = Object.entries(data).map(([k, v]) => {
        oldKeys = oldKeys.filter((key) => key !== k);
        return v ? inst.setKey(k as any, v) : Promise.resolve();
      });
      oldKeys.forEach((key) => {
        promises.push(inst.deleteKey(key as any));
      });

      await Promise.all(promises);
    } catch (e) {
      throw new Error('Error while retrieving data');
    }
  }

  /** */
  async persistData (): Promise<void> {
    const data = await this.getStorageContent();
    await figma.loadFontAsync({ family: "Consolas", style: "Regular" });
    this.documentStore.characters = JSON.stringify(data, undefined, 2);
  }

  private async getStorageContent (): Promise<Partial<Store>> {
    const data: Partial<Store> = {};
    const keys = await this.getKeys();
    await Promise.all(keys.map((k) => new Promise(async (resolve) => {
      data[k] = await figma.clientStorage.getAsync(k);
      resolve(true);
    })));
    return data;
  }
}