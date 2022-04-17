import { FigmaStore } from './../store';
import { RootSize, SizesMap, Gutter } from './space.types';

export async function listRootSizes (): Promise<SizesMap> {
  return (await FigmaStore.getInstance.getKey('sizes')) || {} as SizesMap;
}

export async function createOrEditRootSize (size: RootSize): Promise<RootSize> {
  const sizes = await listRootSizes();
  sizes[size.name] = size;
  FigmaStore.getInstance.setKey('sizes', sizes);
  return size;
}

export async function listGutters (): Promise<Gutter[]> {
  return [];
}