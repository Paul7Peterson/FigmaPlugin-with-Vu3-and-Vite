import { documentInTable, getComponents, getTokenTable, Page } from '../helpers.docs';
import { RootSize, RootSizeName } from '../space/space.types';
import { FontStyle } from './text.types';

const { "Font styles": FontStyles } = getComponents();

export async function documentFontStyles (fontStyles: FontStyle[], rootSizes: RootSize[]): Promise<void> {
  const FontStylesTable = getTokenTable(Page.Typographies, 'Font styles');

  documentInTable(FontStylesTable, FontStyles!, fontStyles, (s) => ({
    id: s.id,
    name: s.name,
    description: s.description,
  }),
    (c, { ids, id }) => {
      Object.values(RootSizeName).forEach((value) => {
        const sampleName = `#sample_${value.toLowerCase()}`;
        const sample = c.findOne(({ name }) => name === sampleName);
        if (!sample) throw new Error(`Field "${sampleName}" not found`);
        if (sample.type !== 'TEXT') throw new Error(`"${sampleName} must be a text"`);
        sample.textStyleId = ids[value] || id;
        if (!rootSizes.find((rs) => rs.name === value)) sample.visible = false;
      });
    },
  );
}
