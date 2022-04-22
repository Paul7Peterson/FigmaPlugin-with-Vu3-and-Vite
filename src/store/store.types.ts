
export type ItemType =
  | 'Root size'
  | 'Gutter'
  | 'Solid color'
  | 'Font style'
  | 'Box shadow'
  | 'Border'
  | 'Grid';

export interface ItemError {
  itemType: ItemType;
  itemName: string;
  errors: string[];
} 