export interface BaseToken {
  id: string;
  key: string;
  name: string;
  description: string;
}

/** */
export function parseBaseToken (token: BaseStyle): BaseToken {
  const { id, key, name, description } = token;
  return { id, key, name, description };
}