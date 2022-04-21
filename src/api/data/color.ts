import { colorToPaint } from '../tokens/color.helpers';
import { SolidColor } from '../tokens/color.types';
import { getComponents, getTokenTable, Page, documentInTable } from './helpers';

const { "Solid colors": SolidColors } = getComponents();

export async function documentColors (colors: SolidColor[]): Promise<void> {
  const ColorsTable = getTokenTable(Page.Colors, 'Solid colors');

  documentInTable(ColorsTable, SolidColors!, colors, (c) => ({
    name: c.name,
    color: c.colorName,
    shadow: c.colorShadow.toString(),
    HEX: c.colorSpaces.HEX,
    RGB: c.colorSpaces.RGB,
    HSL: c.colorSpaces.HSL,
    LCH: c.colorSpaces.LCH,
    description: c.description,
  }),
    (c, { color }) => {
      const sample = c.findChild(({ name }) => name === '#sample');
      if (!sample) throw new Error('Field "#sample" not found');
      if (sample.type !== 'RECTANGLE') throw new Error('"#sample must be a rectangle"');
      sample.fills = [{ type: 'SOLID', color: colorToPaint(color).color }];
    }
  );
}
