import { SizesMap, GuttersMap, RootSizeName } from '../styles/space.types';
import { getComponents, getTokenTable, shortByNumericValue, Page, documentInTable } from './helpers';

const { "Root sizes": RootSizes, Gutters } = getComponents();

export async function documentRootSizes (sizes: SizesMap): Promise<void> {
  const RootSizesTable = getTokenTable(Page.Spacing, 'Root sizes');
  const values = shortByNumericValue(Object.values(sizes));
  documentInTable(RootSizesTable, RootSizes!, values, (rs) => ({
    name: rs.name,
    value: `${rs.value} px`,
  }));
}

export async function documentGutters (gutters: GuttersMap, sizes: SizesMap): Promise<void> {
  const values = shortByNumericValue(Object.values(gutters));
  const GuttersTable = getTokenTable(Page.Spacing, 'Gutters');

  const sizesMap = Object.values(sizes).map((s) => s.name);
  const fieldsToHide: string[] = Object.values(RootSizeName)
    .filter((f) => !sizesMap.includes(f))
    .map((f) => f.toLowerCase());

  documentInTable(GuttersTable, Gutters!, values, (gutter) => ({
    name: gutter.name,
    value: `${gutter.value} rem`,
    ...Object.values(RootSizeName).reduce((t, size) => {
      t[size.toLowerCase()] = `${gutter.value * (sizes[size]?.value || 0)} px`;
      return t;
    }, {} as Record<string, string>),
  }),
    undefined,
    { fieldsToHide }
  );
}