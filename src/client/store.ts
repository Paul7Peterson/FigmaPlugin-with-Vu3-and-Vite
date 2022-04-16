export type Store = {
  size: { width: number; height: number; };
};

export type StoreKey = keyof Store;

/** */
export class FigmaStore {
  private static instance: FigmaStore;

  private constructor () { }

  /** */
  static get getInstance () {
    if (FigmaStore.instance) return this.instance;
    return this.instance = new FigmaStore();
  }

  /** */
  get keys (): Promise<string[]> {
    return figma.clientStorage.keysAsync();
  }

  /** */
  setKey<T extends StoreKey> (key: T, value: Store[T]): Promise<void> {
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
  deleteKey<T extends StoreKey> (key: T): Promise<void> {
    return figma.clientStorage.deleteAsync(key);
  }
}