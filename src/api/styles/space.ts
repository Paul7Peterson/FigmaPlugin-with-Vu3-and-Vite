import { FigmaStore } from './../store';
import { RootSize, SizesMap, Gutter, RootSizeName, rootSizeScale } from './space.types';

export async function listRootSizes (): Promise<SizesMap> {
  const result = await FigmaStore.getInstance.getKey('sizes');
  return result || {} as SizesMap;
}

/** */
export async function createRootSize (): Promise<RootSize> {
  const sizesObject = await listRootSizes();

  const sizes = Object.values(sizesObject)
    .sort((a, b) => b.value - a.value);

  if (sizes.length >= Object.values(RootSizeName).length)
    throw new Error('Cannot create more sizes');

  let size: RootSize;
  if (!sizes.length) {
    size = {
      value: 14,
      name: RootSizeName.Medium,
    };
  } else if (sizes.length % 2) {
    const last = sizes[sizes.length - 1]!;
    size = {
      value: last.value + 2,
      name: getNextOrPrevious(last.name, 'next'),
    };
  } else {
    size = {
      value: sizes[0].value - 2,
      name: getNextOrPrevious(sizes[0].name, 'prev'),
    };
  }
  await editRootSize(size, true);
  return size;
}

/** */
export async function editRootSize (size: RootSize, isNew: boolean = false): Promise<RootSize> {
  const sizes = await listRootSizes();
  if (!sizes[size.name] && !isNew)
    throw new Error(`The root size "${size.name}" does not exist.`);
  sizes[size.name] = size;
  await FigmaStore.getInstance.setKey('sizes', sizes);
  return size;
}

export async function deleteRootSize (size: RootSize): Promise<void> {
  const sizes = await listRootSizes();
  if (!sizes[size.name])
    throw new Error(`The root size "${size.name}" does not exist.`);
  sizes[size.name] = undefined;
  await FigmaStore.getInstance.setKey('sizes', sizes);
}

export async function listGutters (): Promise<Gutter[]> {
  return [];
}

function getNextOrPrevious (ref: RootSizeName, select: 'prev' | 'next'): RootSizeName {
  const modifier = select === 'prev' ? -1 : 1;
  return rootSizeScale[rootSizeScale.findIndex(s => ref === s) + modifier];
}