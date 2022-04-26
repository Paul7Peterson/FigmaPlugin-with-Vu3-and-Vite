import { Color, ColorCreateBody, ColorUpdateBody } from '@zeplin/sdk';
import { ColorAlpha } from '~api/tokens';
import { ENV } from '../envVariables';
import { ZEPLIN } from './_shared';

const BASE_ROOT = `styleguides/${ENV.ZEPLIN_STYLEGUIDE_ID}/colors`;

interface ColorParams {
  color: ColorAlpha;
  name: string;
  sourceId?: string;
}

export const ColorAPI = {
  /**
   * @link https://docs.zeplin.dev/reference/getstyleguidecolors
   */
  list: () => {
    return ZEPLIN<Color[]>('GET', BASE_ROOT, null);
  },
  /**
   * @link https://docs.zeplin.dev/reference/createstyleguidecolor
   */
  create: (color: ColorParams & { sourceId?: string; }) => {
    return ZEPLIN<{ id: string; }, ColorCreateBody>('POST', BASE_ROOT, {
      ...color.color,
      name: color.name,
      a: color.color.a || 255,
      sourceId: color.sourceId,
    });
  },
  /**
   * @link https://docs.zeplin.dev/reference/updatestyleguidecolor
   */
  update: (id: string, color: ColorParams) => {
    const URL = `${BASE_ROOT}/${id}`;
    return ZEPLIN<void, ColorUpdateBody>('PATCH', URL, {
      ...color.color,
      name: color.name,
      a: color.color.a || 255,
    });
  }
};