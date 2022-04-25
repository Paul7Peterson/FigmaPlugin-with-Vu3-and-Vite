export interface VariantValues {
  value: string;
  isDefault: boolean;
}

export interface FigmaComponent {
  id: string;
  name: string;
  key: string;
  description: string;
  documentationLinks?: string[];
  variants: Record<string, VariantValues[]>;
  errors: string[];
}