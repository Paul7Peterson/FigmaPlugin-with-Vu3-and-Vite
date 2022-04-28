import { Space } from './_shared.types';

export function spaceToNumber ({ rootSize, gutter }: Space): number {
  return rootSize.value * gutter.value;
}