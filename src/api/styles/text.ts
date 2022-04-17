import { parseBaseToken } from './_shared';
import { FontStyle, ExtendedFontStyleCategory, FontStyleCategory } from './text.types';
import { RootSizeName } from './space.types';

type ExtendedTextStyle = Omit<FontStyle & { size: RootSizeName; }, 'category' | 'sizes'>;

/** */
export function listFontStyles (): FontStyle[] {
  const groupedTexts = figma.getLocalTextStyles()
    .reduce((t, text) => {
      const errors: string[] = [];

      console.log(text);


      try {
        const [size, group, name, ..._] = text.name.split('/');
        if (!group) throw new Error('A text style requires a "FontStyleCategory"');
        if (!name) throw new Error('A text style requires a "Name"');

        if (!Object.values(RootSizeName).includes(size as RootSizeName))
          throw new Error(`"${text.name}" doesn't follow the naming convention. The first grouping must be done per "RootSizeName".`);
        const parsedSize = size as RootSizeName;

        let parsedGroup = group as ExtendedFontStyleCategory;
        if (!Object.values(FontStyleCategory).includes(group as FontStyleCategory)) {
          errors.push(`"${text.name}" doesn't follow the naming convention. The second grouping must be done per "FontStyleCategory".`);
          parsedGroup = 'Other';
        }

        const extendedText: ExtendedTextStyle = {
          id: text.id,
          key: text.key,
          description: text.description,
          name,
          fontSize: text.fontSize,
          fontFamily: text.fontName,
          textDecoration: text.textDecoration,
          letterSpacing: text.letterSpacing,
          lineHeight: text.lineHeight,
          paragraphIndent: text.paragraphIndent,
          paragraphSpacing: text.paragraphSpacing,
          textCase: text.textCase,
          size: parsedSize,
          errors
        };
        if (!t[parsedGroup]) t[parsedGroup] = { [name]: [extendedText] };
        else {
          if (!t[parsedGroup][name]) t[parsedGroup][name] = [extendedText];
          else t[parsedGroup][name].push(extendedText);
        }
      } catch (e) {
        console.error((e as Error).message);
        console.trace(e);
      }
      return t;
    }, {} as Record<ExtendedFontStyleCategory, Record<string, ExtendedTextStyle[]>>);

  console.log(groupedTexts);


  return Object.entries(groupedTexts)
    .flatMap(([category, texts]) =>
      Object.entries(texts).map(([style, fonts]) =>
        parseFontStyle(category as ExtendedFontStyleCategory, style, fonts)));
}

function parseFontStyle (category: ExtendedFontStyleCategory, style: string, texts: ExtendedTextStyle[]): FontStyle {
  const errors: string[] = [];
  texts.forEach((text, i, ref) => {
    if (!i) return true;
    // TODO
  });
  const text = texts[0];

  return {
    ...text,
    category,
    sizes: texts.map((t) => t.size),
    errors: [...errors, ...texts.flatMap((t) => t.errors)],
  };
}