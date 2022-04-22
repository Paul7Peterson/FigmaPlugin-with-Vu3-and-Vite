import { FigmaStore } from '../../store';
import { deleteFromArray, getNextOrPrevious, modifyInArray } from './space.helpers';
import {
  Gutter,
  GutterName,
  gutterScale,
} from './space.types';

export async function listGutters (): Promise<Gutter[]> {
  const gutters = await FigmaStore.getInstance.getKey('gutters');
  return gutters?.sort((a, b) => a.value - b.value) || [];
}

export async function createGutter (size: 'smaller' | 'bigger'): Promise<Gutter> {
  const gutters = Object.values(await listGutters())
    .sort((a, b) => a.value - b.value);

  if (gutters.length >= Object.values(GutterName).length)
    throw new Error('Cannot create more sizes');

  let gutter: Gutter;
  if (!gutters.length) {
    gutter = { value: 1, name: GutterName.M };
  } else {
    if (size === 'smaller') {
      const first = gutters[0];
      gutter = {
        name: getNextOrPrevious(gutterScale, first.name, 'prev'),
        value: first.value - .25
      };
    } else {
      const last = gutters[gutters.length - 1];
      gutter = {
        name: getNextOrPrevious(gutterScale, last.name, 'next'),
        value: last.value + .25
      };
    }
  }
  const newGutters = [...gutters, gutter].sort((a, b) => a.value - b.value);
  await FigmaStore.getInstance.setKey('gutters', newGutters);
  return gutter;
}

export async function editGutters (gutters: Gutter[]): Promise<void> {
  await Promise.all(gutters.map((g) => editGutter(g)));
}

export async function deleteGutter (gutter: Gutter): Promise<Gutter> {
  const gutters = await listGutters();
  const newGutters = deleteFromArray(gutters, gutter, 'name');
  await FigmaStore.getInstance.setKey('gutters', newGutters);
  return gutter;
}

async function editGutter (gutter: Gutter): Promise<Gutter> {
  const gutters = await listGutters();
  const newGutters = modifyInArray(gutters, gutter, 'name');
  await FigmaStore.getInstance.setKey('gutters', newGutters);
  return gutter;
}