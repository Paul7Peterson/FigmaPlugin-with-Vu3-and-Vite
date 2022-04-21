import { Gutter, RootSize } from '../tokens/space.types';

export type Store = {
  windowSize: { width: number; height: number; };
  sizes: RootSize[];
  gutters: Gutter[];
};

export type StoreKey = keyof Store;