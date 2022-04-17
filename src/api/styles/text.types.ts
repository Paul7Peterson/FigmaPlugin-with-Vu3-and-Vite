import { RootSizeName } from './space.types';
import { BaseToken } from './_shared';

export enum FontStyleCategory {
  /** */
  Header = 'Header',
  /** */
  Text = 'Text',
  /** */
  Form = 'Form',
  /** */
  Helpers = 'Helpers',
  /** */
  Technical = 'Technical',
}

export type ExtendedFontStyleCategory = FontStyleCategory | 'Other';

/** */
export interface FontStyle extends BaseToken {
  /** */
  fontSize: number;
  /** */
  fontFamily: FontName;
  /** */
  textDecoration: TextDecoration;
  /** */
  letterSpacing: LetterSpacing;
  /** */
  lineHeight: LineHeight;
  /** */
  paragraphIndent: number;
  /** */
  paragraphSpacing: number;
  /** */
  textCase: TextCase;
  /** */
  category: ExtendedFontStyleCategory;
  /** */
  sizes: RootSizeName[];
  /** */
  errors: string[];
}