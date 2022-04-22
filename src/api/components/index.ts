import { FigmaComponent } from './index.types';

export function getAllComponents (): Record<string, ComponentNode> {
  const components = figma.root.findAll(({ type }) => type === 'COMPONENT') as ComponentNode[];
  return components.reduce((t, c) => {
    t[c.name] = c;
    return t;
  }, {} as Record<string, ComponentNode>);
}

export function listAllComponents (): FigmaComponent[] {
  const components = Object.entries(getAllComponents());
  return components.map(([key, c]) => ({
    name: c.name,
  }));
}