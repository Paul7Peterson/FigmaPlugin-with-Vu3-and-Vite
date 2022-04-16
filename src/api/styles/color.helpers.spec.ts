import {
  getColorName,
  getColorShadow,
} from './color.helpers';

describe(getColorName.name, () => {
  test('set of values', () => {
    expect(getColorName({ r: 107, g: 31, b: 122 })).toEqual('Lila');
    // expect(getColorName({ r: 231, g: 67, b: 92 })).toEqual([54, 68, 20]);
  });
});

describe(getColorShadow.name, () => {
  test('set of values', () => {
    expect(getColorShadow({ r: 107, g: 31, b: 122 })).toEqual(28);
    // expect(getColorName({ r: 231, g: 67, b: 92 })).toEqual([54, 68, 20]);
  });
});