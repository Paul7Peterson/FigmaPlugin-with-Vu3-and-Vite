import { Frame, Text } from '../nodes';

const TABLE_PREFIX = '🆔';
const COMPONENT_PREFIX = '🟪';


export enum Page {
  Spacing = '⮡  Spacing',
  Colors = '⮡  Colors',
  Typographies = '⮡  Typographies',
  Surfaces = '⮡  Surfaces',
}

type TokenTree = {
  [Page.Spacing]: 'Root sizes' | 'Gutters';
  [Page.Colors]: 'Solid colors';
  [Page.Typographies]: 'Font styles';
  [Page.Surfaces]: 'Box shadows';
};

type TokenType = TokenTree[keyof TokenTree];

/** */
export function getTokenPage (page: Page): PageNode {
  const pageNode = figma.root.findChild((s) => s.name.includes(page));
  if (!pageNode) throw new Error(`Page "${page}" not found.`);
  return pageNode;
}

/** */
export function getTokenTable<T extends Page> (page: T, tokenType: TokenTree[T]): FrameNode {
  const reference = `${TABLE_PREFIX} ${tokenType}`;
  const table = getTokenPage(page).findOne((c) => c.name === reference);
  if (!table) throw new Error(`The table "${reference}" was not found in page "${page}"`);
  if (table.type !== 'FRAME') throw new Error(`The table "${reference}" must be a frame.`);
  return table;
}

export function getComponents (): Partial<Record<TokenType, ComponentNode>> {
  const reference = `${COMPONENT_PREFIX} Reference/`;
  const components = figma.root.findAll(({ type, name }) =>
    type === 'COMPONENT' && name.startsWith(reference)) as ComponentNode[];
  return components.reduce((t, c) => {
    const name = c.name.split('/')[1];
    t[name as TokenType] = c;
    return t;
  }, {} as Partial<Record<TokenType, ComponentNode>>);
}

export function shortByNumericValue<T extends { value: number; }> (values: T[]) {
  return [...values].sort((a, b) => a.value - b.value);
}

type TableConfig<S extends string> = Partial<{
  fieldsToHide: S[];
  rowGap: number;
}>;

export async function documentInTable<T extends object, S extends string> (
  frame: FrameNode,
  component: ComponentNode,
  values: T[],
  docs: (asset: T) => Record<S, string>,
  extraOperations?: (instance: InstanceNode, asset: T) => Promise<void> | void,
  config?: TableConfig<S>,
) {
  if (!component) throw new Error(`Missing component for the table "${frame.name}"`);
  const { rowGap, fieldsToHide } = config || {};

  const table = Frame.from(frame)
    .removeChildren()
    .modify({
      autoLayout: {
        direction: 'vertical',
        gap: rowGap || 10
      },
      resizing: {
        width: 'fill container',
        height: 'hug contents',
      }
    });
  // table.layoutMode = 'VERTICAL';
  // table.primaryAxisSizingMode = 'AUTO';
  // table.counterAxisSizingMode = 'FIXED';
  // table.itemSpacing = rowGap || 10;

  const headerKeys = Object.keys(docs(values[0]));
  createHeaderFromComponent(table, component, headerKeys, fieldsToHide);

  values.forEach((value) => {
    const instance = component.createInstance();
    const instanceFrame = Frame.fromComponentInstance(instance);
    const propsToDoc = docs(value);

    const props = Object.keys(propsToDoc).map((k) => `#${k}`);
    Object.entries(getWritableFields(instanceFrame, props))
      .forEach(([name, field]) => {
        const parsedName = name.substring(1) as keyof typeof propsToDoc;
        field.write(propsToDoc[parsedName]);
        if (fieldsToHide?.includes(parsedName)) field.visible = false;
      });

    extraOperations?.(instance, value);

    instanceFrame.modify({ resizing: { width: 'fill container' } });
    instanceFrame.locked = true;

    table.setChild(instanceFrame);
  });
}

export function capitalize (word: string) {
  return word.charAt(0).toUpperCase() + word.slice(1);
}

export function getWritableFields<T extends string> (frame: Frame, names: T[]): Record<T, Text> {
  const texts = frame.node.findAll(({ type, name }) =>
    type === 'TEXT' && name.startsWith('#') && names.includes(name as T)) as TextNode[];
  return texts.reduce((t, c) => {
    const name = c.name as T;
    t[name] = Text.from(c);
    return t;
  }, {} as Record<T, Text>);
}

export async function loadFonts (): Promise<void> {
  await Promise.all([
    figma.loadFontAsync({ family: "Fabriga", style: "Regular" }),
    figma.loadFontAsync({ family: "Fabriga", style: "Medium" }),
    figma.loadFontAsync({ family: "MT Extra", style: "Regular" }),
    figma.loadFontAsync({ family: "Consolas", style: "Regular" }),
  ]);
}

function createHeaderFromComponent (table: Frame, component: ComponentNode, props: string[], fieldsToHide?: string[]) {
  const headerWrapper = new Frame('Header', {
    autoLayout: {
      direction: 'vertical',
      padding: [10, 0, 10, 0],
    },
    resizing: {
      width: 'fill container',
      height: 'hug contents'
    },
    fills: ['Black'],
  })
    .setParent(table);

  const header = Frame.fromComponentInstance(component.createInstance())
    .modify({
      resizing: {
        width: 'fill container',
        height: 'hug contents',
      },
      fills: ['Black']
    })
    .setParent(headerWrapper);

  header.locked = true;

  Object.entries(getWritableFields(header, props.map((k) => `#${k}`)))
    .forEach(([name, text]) => {
      text.modify({
        font: {
          family: 'Fabriga',
          style: 'Medium',
          justify: 'center',
        },
        fills: 'White'
      });
      const parsedName = name.substring(1);
      if (fieldsToHide?.includes(parsedName)) text.visible = false;
    });
}

// function createHeader (table: FrameNode, keys: string[]): void {
//   const header = figma.createFrame();
//   header.name = 'Header';
//   header.fills = [
//     { type: 'SOLID', color: { r: 0, g: 0, b: 0 } }
//   ];
//   header.primaryAxisSizingMode = 'FIXED';
//   header.counterAxisSizingMode = 'AUTO';
//   header.layoutMode = 'HORIZONTAL';
//   header.layoutAlign = 'STRETCH';
//   table.appendChild(header);


//   keys.forEach((key) => {
//     const text = figma.createText();
//     header.appendChild(text);
//     text.fontName = {
//       family: 'Fabriga',
//       style: 'Regular'
//     };
//     text.characters = capitalize(key);
//     text.fills = [
//       { type: 'SOLID', color: { r: 1, g: 1, b: 1 } }
//     ];
//     text.textAutoResize = 'HEIGHT';
//     text.layoutAlign = 'STRETCH';
//     text.layoutGrow = 1;
//     text.textAlignHorizontal = 'CENTER';
//   });
// }