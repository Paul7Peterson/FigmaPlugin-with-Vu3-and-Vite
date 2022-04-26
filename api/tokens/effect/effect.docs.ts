import { BoxShadowStyle, parseCSSBoxShadow } from '..';
import { documentInTable, getComponents, getTokenTable, Page } from '../helpers.docs';

const { "Box shadows": BoxShadows } = getComponents();

export async function documentBoxShadows (shadows: BoxShadowStyle[]): Promise<void> {
  const BoxShadowsTable = getTokenTable(Page.Surfaces, 'Box shadows');

  documentInTable(BoxShadowsTable, BoxShadows!, shadows, (s) => ({
    id: s.id,
    name: s.name,
    type: s.type,
    level: s.level.toString(),
    boxShadow: parseCSSBoxShadow(s),
    description: s.description,
  }),
    (c, { id }) => {
      const sample = c.findOne(({ name }) => name === '#sample');
      if (!sample) throw new Error('Field "#sample" not found');
      if (sample.type !== 'RECTANGLE') throw new Error('"#sample must be a rectangle"');
      sample.effectStyleId = id;
    },
    { rowGap: 20 }
  );
}

