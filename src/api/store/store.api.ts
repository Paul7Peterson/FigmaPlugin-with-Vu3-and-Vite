import { RootSize, RootSizeName } from '../styles/index.types';

export type Store = {
  windowSize: { width: number; height: number; };
  sizes: Partial<Record<RootSizeName, RootSize>>;
};

export type StoreKey = keyof Store;