import { parseBaseToken } from './_shared';
import { FontStyle, ExtendedFontStyleCategory, FontStyleCategory } from './text.types';
import { RootSizeName } from './space.types';
import { parseLineHeight, parseTextDecoration, parseLetterSpacing } from './text.helpers';

type ExtendedTextStyle = Omit<FontStyle & { size: RootSizeName; }, 'category' | 'sizes'>;

/** */
export function listFontStyles (): FontStyle[] {
  const groupedTexts = figma.getLocalTextStyles()
    .reduce((t, text) => {
      const errors: string[] = [];

      try {
        const [size, group, name, ..._] = text.name.split('/');

        if (!Object.values(RootSizeName).includes(size as RootSizeName)) {
          errors.push(`"${text.name}" doesn't follow the naming convention. The first grouping must be done per "RootSizeName".`);
        }
        const parsedSize = size as RootSizeName;

        if (!name) errors.push('A text style requires a "Name"');

        let parsedGroup = group as ExtendedFontStyleCategory;
        if (!group) {
          errors.push('A text style requires a "FontStyleCategory"');
          parsedGroup = 'Other';
        }
        if (!Object.values(FontStyleCategory).includes(group as FontStyleCategory)) {
          errors.push(`"${text.name}" doesn't follow the naming convention. The second grouping must be done per "FontStyleCategory".`);
          parsedGroup = 'Other';
        }

        const lowerStyle = text.fontName.style.toLowerCase();
        const isItalic = lowerStyle.includes('italic');
        const fontWeight = lowerStyle.replace('italic', '').trim();

        const extendedText: ExtendedTextStyle = {
          ...parseBaseToken(text),
          name: name || group || size,
          fontSize: text.fontSize,
          fontFamily: text.fontName.family,
          isItalic,
          fontWeight,
          textDecoration: text.textDecoration,
          textDecorationCSS: parseTextDecoration(text.textDecoration),
          letterSpacing: text.letterSpacing,
          letterSpacingCSS: parseLetterSpacing(text.letterSpacing),
          lineHeight: text.lineHeight,
          lineHeightCSS: parseLineHeight(text.lineHeight),
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

  return Object.entries(groupedTexts)
    .flatMap(([category, texts]) =>
      Object.values(texts).map((fonts) =>
        parseFontStyle(category as ExtendedFontStyleCategory, fonts)));
}

function parseFontStyle (category: ExtendedFontStyleCategory, texts: ExtendedTextStyle[]): FontStyle {
  const errors: string[] = [];

  const propsToCheck: (keyof ExtendedTextStyle)[] =
    ['lineHeightCSS', 'fontFamily', 'letterSpacingCSS', 'textCase', 'textDecorationCSS', 'paragraphIndent', 'paragraphSpacing', 'name', 'isItalic', 'fontWeight'];

  propsToCheck.forEach((p) => {
    if (!texts.every((t) => t[p] === texts[0][p]))
      errors.push(`Not all font styles have the same "${p}" value.`);
  });
  const text = texts[0];

  return {
    ...text,
    category,
    sizes: texts.map((t) => t.size),
    errors: [...errors, ...texts.flatMap((t) => t.errors)],
  };
}