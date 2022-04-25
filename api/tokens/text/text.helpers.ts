
export function parseLineHeight (lineHeight: LineHeight): string {
  return lineHeight.unit === 'AUTO'
    ? 'auto' : valueToUnit(lineHeight);
}

export function parseTextDecoration (textDecoration: TextDecoration): string {
  return textDecoration === 'STRIKETHROUGH'
    ? 'line-through'
    : textDecoration.toLowerCase();
}

export function parseLetterSpacing (letterSpacing: LetterSpacing): string {
  return valueToUnit(letterSpacing);
}

function valueToUnit ({ value, unit }: { unit: 'PERCENT' | 'PIXELS', value: number; }): string {
  return `${value}${unit === 'PERCENT' ? '%' : 'px'}`;
}