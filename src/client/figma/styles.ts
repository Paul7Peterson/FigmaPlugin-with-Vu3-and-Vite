export interface BaseToken {
  id: string;
  key: string;
  name: string;
  description: string;
}

export interface Color extends BaseToken {
  opacity?: number;
  color?: { r: number, g: number, b: number; };
}

export interface Text extends BaseToken {

}

export interface Effect extends BaseToken {

}

export interface Grid extends BaseToken {

}

export interface GetAllStylesReturn {
  colors: Color[];
  texts: Text[];
  effects: Effect[];
  grids: Grid[];
}

function parseBaseToken (token: BaseStyle): BaseToken {
  return {
    id: token.id,
    key: token.key,
    name: token.name,
    description: token.description,
  };
}

export function getAllStyles (): GetAllStylesReturn {
  return {
    colors: figma.getLocalPaintStyles().map((color) => {
      const paint = color.paints[0];
      const colorObject: Color = parseBaseToken(color);
      if (paint.opacity) colorObject.opacity = paint.opacity;
      if (paint.type === 'SOLID') colorObject.color = {
        r: paint.color.r * 255,
        g: paint.color.g * 255,
        b: paint.color.b * 255,
      };
      return colorObject;
    }),
    texts: figma.getLocalTextStyles().map((text) => {
      const textObject: Text = parseBaseToken(text);
      return textObject;
    }),
    effects: figma.getLocalEffectStyles().map((effect) => {
      const effectObject: Effect = parseBaseToken(effect);
      return effectObject;
    }),
    grids: figma.getLocalGridStyles().map((grid) => {
      const gridObject: Grid = parseBaseToken(grid);
      return gridObject;
    }),
  };
}