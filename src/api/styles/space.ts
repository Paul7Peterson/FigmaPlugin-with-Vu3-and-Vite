import { FigmaStore } from './../store';
import {
  RootSize,
  SizesMap,
  Gutter,
  RootSizeName,
  rootSizeScale,
  GuttersMap,
  GutterName,
  gutterScale,
} from './space.types';

export async function listRootSizes (): Promise<SizesMap> {
  return (await FigmaStore.getInstance.getKey('sizes')) || {} as SizesMap;
}

/** */
export async function createRootSize (): Promise<RootSize> {
  const sizes = Object.values(await listRootSizes())
    .sort((a, b) => a.value - b.value);

  if (sizes.length >= Object.values(RootSizeName).length)
    throw new Error('Cannot create more sizes');

  const size: RootSize = sizes.length
    ? getAlternateValue(rootSizeScale, sizes, 2)
    : { value: 14, name: RootSizeName.Medium };

  await editRootSize(size, true);
  return size;
}

/** */
export async function editRootSizes (sizes: RootSize[]): Promise<void> {
  await Promise.all(sizes.map((s) => editRootSize(s)));
}

/** */
export async function deleteRootSize (size: RootSize): Promise<void> {
  const sizes = await listRootSizes();
  if (!sizes[size.name])
    throw new Error(`The root size "${size.name}" does not exist.`);
  sizes[size.name] = undefined;
  await FigmaStore.getInstance.setKey('sizes', sizes);
}

async function editRootSize (size: RootSize, isNew: boolean = false): Promise<RootSize> {
  const sizes = await listRootSizes();
  if (!sizes[size.name] && !isNew)
    throw new Error(`The root size "${size.name}" does not exist.`);
  sizes[size.name] = size;
  await FigmaStore.getInstance.setKey('sizes', sizes);
  return size;
}


export async function listGutters (): Promise<GuttersMap> {
  return (await FigmaStore.getInstance.getKey('gutters')) || {} as GuttersMap;
}

export async function createGutter (): Promise<Gutter> {
  const gutters = Object.values(await listGutters())
    .sort((a, b) => a.value - b.value);

  if (gutters.length >= Object.values(GutterName).length)
    throw new Error('Cannot create more sizes');

  const gutter: Gutter = gutters.length
    ? getAlternateValue(gutterScale, gutters, 0.5)
    : { value: 1, name: GutterName.M };

  await editGutter(gutter, true);
  return gutter;
}

export async function editGutters (gutters: Gutter[]): Promise<void> {
  await Promise.all(gutters.map((g) => editGutter(g)));
}

export async function deleteGutter (gutter: Gutter): Promise<void> {
  const gutters = await listGutters();
  if (!gutters[gutter.name])
    throw new Error(`The gutter "${gutter.name}" does not exist.`);
  gutters[gutter.name] = undefined;
  await FigmaStore.getInstance.setKey('gutters', gutters);
}

async function editGutter (gutter: Gutter, isNew: boolean = false): Promise<Gutter> {
  const gutters = await listGutters();
  if (!gutters[gutter.name] && !isNew)
    throw new Error(`The gutter "${gutter.name}" does not exist.`);
  gutters[gutter.name] = gutter;
  await FigmaStore.getInstance.setKey('gutters', gutters);
  return gutter;
}

function getAlternateValue<N extends string> (list: N[], values: { value: number, name: N; }[], gap: number): { value: number, name: N; } {
  if (!values.length) throw new Error('To set an alternate value you need a reference.');

  console.log(values.length % 2, values);


  if (values.length % 2) {
    const last = values[values.length - 1]!;
    const name = getNextOrPrevious(list, last.name, 'next');
    return { value: last.value + gap, name };
  }
  const name = getNextOrPrevious(list, values[0].name, 'prev');
  return { value: values[0].value - gap, name };
}

function getNextOrPrevious<T extends string> (enumeration: T[], ref: T, select: 'prev' | 'next'): T {
  const modifier = select === 'prev' ? -1 : 1;
  return enumeration[modifier + enumeration.findIndex((s) => ref === s)];
}