import { FigmaComponent, VariantValues } from './index.types';

export function getAllComponents (): Record<string, ComponentNode> {
  const components = figma.root.findAll(({ type }) => type === 'COMPONENT') as ComponentNode[];
  return components.reduce((t, c) => {
    t[c.name] = c;
    return t;
  }, {} as Record<string, ComponentNode>);
}

export function getAllComponentSets (): Record<string, ComponentSetNode> {
  const components = figma.root.findAll(({ type }) => type === 'COMPONENT_SET') as ComponentSetNode[];
  return components.reduce((t, c) => {
    t[c.name] = c;
    return t;
  }, {} as Record<string, ComponentSetNode>);
}

export function listAllComponents (): FigmaComponent[] {
  const components = Object.entries(getAllComponentSets());
  return components.map(([key, c]) => {
    const { errors, variants } = parseVariants(c);
    const result: FigmaComponent = {
      id: c.id,
      name: c.name,
      key: c.key,
      description: c.description,
      variants,
      errors,
    };
    if (c.documentationLinks.length)
      result.documentationLinks = c.documentationLinks.map(({ uri }) => uri);
    return result;
  });
}

function parseVariants (componentSet: ComponentSetNode): { variants: Record<string, VariantValues[]>; errors: string[]; } {
  const defaultVariant = parseDefaultVariables(componentSet);
  try {
    const variants = componentSet.variantGroupProperties;
    return {
      variants: Object.entries(variants || {}).reduce((t, [key, { values }]) => {
        t[key] = values.map((value) => ({
          value,
          isDefault: defaultVariant[key] === value
        }));
        return t;
      }, {} as Record<string, VariantValues[]>),
      errors: []
    };
  } catch (e) {
    console.error(e);
    return { variants: {}, errors: [] };
  }
}

function parseDefaultVariables ({ defaultVariant }: ComponentSetNode): Record<string, string> {
  return defaultVariant.name.split(',').reduce((t, v) => {
    const [key, value, ..._] = v.split('=');
    t[key.trim()] = value.trim();
    return t;
  }, {} as Record<string, string>);
}