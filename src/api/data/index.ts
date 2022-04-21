import { FigmaStore } from '../store';
import { listBoxShadows, listSolidColors } from '../styles';
import { documentColors } from './color';
import { documentBoxShadows } from './effect';
import { loadFonts } from './helpers';
import { documentGutters, documentRootSizes } from './space';

export async function writeDocs () {
  console.log('Documenting...');
  await loadFonts();

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
