import { FigmaStore } from '../store';

import { listBoxShadows, listSolidColors } from '../tokens';
import { documentColors } from './color/color.docs';
import { documentBoxShadows } from './effect/effect.docs';
import { documentGutters, documentRootSizes } from './space/space.docs';

export async function writeDocs () {
  console.log('Documenting...');

  const sizes = await FigmaStore.getInstance.getKeyIfExists('sizes');
  await Promise.all([
    documentRootSizes(sizes),
    FigmaStore.getInstance.getKeyIfExists('gutters')
      .then((gutters) => documentGutters(gutters, sizes)),
    listSolidColors()
      .then((solidColors) => documentColors(solidColors)),
    listBoxShadows()
      .then((boxShadows) => documentBoxShadows(boxShadows)),
  ]);
};

export * from './color';
export * from './space';
export * from './text';
export * from './grid';
export * from './effect';