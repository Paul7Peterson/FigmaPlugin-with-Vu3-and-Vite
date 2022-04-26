import { RootSizeName } from '../space/space.types';
import { BaseToken } from '../_shared';

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
  ids: Partial<Record<RootSizeName, string>>;
  /** */
  fontSize: number;
  /** */
  fontFamily: string;
  /** */
  isItalic: boolean;
  /** */
  fontWeight: string | number;
  /** */
  textDecoration: TextDecoration;
  /** */
  textDecorationCSS: string;
  /** */
  letterSpacing: LetterSpacing;
  /** */
  letterSpacingCSS: string;
  /** */
  lineHeight: LineHeight;
  /** */
  lineHeightCSS: string;
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