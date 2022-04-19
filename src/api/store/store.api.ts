import { SizesMap, GuttersMap } from '../styles/index.types';

export type Store = {
  windowSize: { width: number; height: number; };
  sizes: SizesMap;
  gutters: GuttersMap;
};

export type StoreKey = keyof Store;