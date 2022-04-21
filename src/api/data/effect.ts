import { BoxShadowStyle } from './../styles/effect.types';
import { getComponents, getTokenTable, Page, documentInTable } from './helpers';
import { parseCSSBoxShadow, parseEffectFromShadow } from '../styles/effects.helpers';

const { "Box shadows": BoxShadows } = getComponents();

export async function documentBoxShadows (shadows: BoxShadowStyle[]): Promise<void> {
  const BoxShadowsTable = getTokenTable(Page.Surfaces, 'Box shadows');

  documentInTable(BoxShadowsTable, BoxShadows!, shadows, (s) => ({
    name: s.name,
    type: s.type,
    level: s.level.toString(),
    boxShadow: parseCSSBoxShadow(s),
    description: s.description,
  }),
    (c, { dropShadows, innerShadows }) => {
      const sample = c.findOne(({ name }) => name === '#sample');
      if (!sample) throw new Error('Field "#sample" not found');
      if (sample.type !== 'RECTANGLE') throw new Error('"#sample must be a rectangle"');
      sample.effects = [
        ...dropShadows.map((s) => parseEffectFromShadow(s, 'DROP_SHADOW')),
        ...innerShadows.map((s) => parseEffectFromShadow(s, 'INNER_SHADOW')),
      ] as const;
    },
    { rowGap: 20 }
  );
}

