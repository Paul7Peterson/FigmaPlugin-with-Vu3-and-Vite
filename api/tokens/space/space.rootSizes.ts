import { uuid } from '../../helper';
import { FigmaStore } from '../../store';
import { deleteFromArray, getNextOrPrevious, modifyInArray } from './space.helpers';
import {
  RootSize,
  RootSizeName,
  rootSizeScale
} from './space.types';

export async function listRootSizes (): Promise<RootSize[]> {
  const sizes = await FigmaStore.getInstance.getKey('sizes');
  return sizes?.sort((a, b) => a.value - b.value) || [];
}

/** */
export async function createRootSize (): Promise<RootSize> {
  const sizes = await listRootSizes();

  if (sizes.length >= Object.values(RootSizeName).length)
    throw new Error('Cannot create more sizes');

  const size: RootSize = sizes.length
    ? {
      id: uuid(),
      ...getAlternateValue(rootSizeScale, sizes, 2),
      errors: [],
    }
    : {
      id: uuid(),
      name: RootSizeName.Medium,
      value: 14,
      errors: []
    };

  const newSizes = [...sizes, size].sort((a, b) => a.value - b.value);
  await FigmaStore.getInstance.setKey('sizes', newSizes);
  return size;
}

/** */
export async function editRootSizes (sizes: RootSize[]): Promise<void> {
  await Promise.all(sizes.map((s) => editRootSize(s)));
}

/** */
export async function deleteRootSize (size: RootSize): Promise<void> {
  const sizes = await listRootSizes();
  const newSizes = deleteFromArray(sizes, size, 'name');
  await FigmaStore.getInstance.setKey('sizes', newSizes);
}

async function editRootSize (size: RootSize): Promise<RootSize> {
  const sizes = await listRootSizes();
  const newSizes = modifyInArray(sizes, size, 'name');
  await FigmaStore.getInstance.setKey('sizes', newSizes);
  return size;
}

function getAlternateValue<N extends string> (list: N[], values: { value: number, name: N; }[], gap: number): { value: number, name: N; } {
  if (!values.length) throw new Error('To set an alternate value you need a reference.');

  if (values.length % 2) {
    const last = values[values.length - 1]!;
    const name = getNextOrPrevious(list, last.name, 'next');
    return { value: last.value + gap, name };
  }
  const name = getNextOrPrevious(list, values[0].name, 'prev');
  return { value: values[0].value - gap, name };
}