import { FigmaStore } from '../store';
import { listSolidColors } from '../styles';
import { documentColors } from './color';
import { documentGutters, documentRootSizes } from './space';

export async function writeDocs () {
  console.log('Documenting...');

  const sizes = await FigmaStore.getInstance.getKeyIfExists('sizes');
  const gutters = await FigmaStore.getInstance.getKeyIfExists('gutters');
  const colors = await listSolidColors();

  await documentRootSizes(sizes);
  await documentGutters(gutters, sizes);
  await documentColors(colors);
};
