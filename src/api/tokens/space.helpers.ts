export function getNextOrPrevious<T extends string> (enumeration: T[], ref: T, select: 'prev' | 'next'): T {
  const modifier = select === 'prev' ? -1 : 1;
  return enumeration[modifier + enumeration.findIndex((s) => ref === s)];
}

export function deleteFromArray<T extends object> (assets: T[], target: T, match: keyof T): T[] {
  const clean = assets.filter((s) => s[match] !== target[match]);
  if (clean.length === assets.length)
    throw new Error(`The item "${target[match]}" does not exist.`);
  return clean;
}

export function modifyInArray<T extends object> (assets: T[], target: T, match: keyof T): T[] {
  const copy = [...assets];
  const targetIndex = copy.findIndex((s) => s[match] !== target[match]);
  if (targetIndex === -1)
    throw new Error(`The item "${target[match]}" does not exist.`);
  copy[targetIndex] = target;
  return copy;
}