import { Gutter, RootSize } from '../tokens/index.types';

export type Store = {
  windowSize: { width: number; height: number; };
  sizes: RootSize[];
  gutters: Gutter[];
};

export type StoreKey = keyof Store;