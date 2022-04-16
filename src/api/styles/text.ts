import { parseBaseToken } from './_shared';
import { Text } from './text.types';

/** */
export function getTexts (): Text[] {
  return figma.getLocalTextStyles().map((text) => {
    return {
      ...parseBaseToken(text),
      fontSize: text.fontSize,
      fontFamily: text.fontName,
      textDecoration: text.textDecoration,
      letterSpacing: text.letterSpacing,
      lineHeight: text.lineHeight,
      paragraphIndent: text.paragraphIndent,
      paragraphSpacing: text.paragraphSpacing,
      textCase: text.textCase,
    };
  });
}

