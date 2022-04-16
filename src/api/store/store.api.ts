import { RootSize } from '../styles/index.types';

export type Store = {
  windowSize: { width: number; height: number; };
  sizes: RootSize[];
};

export type StoreKey = keyof Store;