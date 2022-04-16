import { BaseToken } from './_shared';

/** */
export interface Text extends BaseToken {
  fontSize: number;
  fontFamily: FontName;
  textDecoration: TextDecoration;
  letterSpacing: LetterSpacing;
  lineHeight: LineHeight;
  paragraphIndent: number;
  paragraphSpacing: number;
  textCase: TextCase;
}