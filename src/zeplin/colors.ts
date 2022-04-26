import { ColorCreateBody } from '@zeplin/sdk';
import { ColorAlpha } from '~api/tokens';
import { ENV } from '../envVariables';
import { ZEPLIN } from './_shared';


interface CreateColorParams {
  color: ColorAlpha;
  name: string;
  sourceId?: string;
}

export const Color = {
  /**
   * @link https://docs.zeplin.dev/reference/createstyleguidecolor
   */
  create: (color: CreateColorParams) => {
    const URL = `styleguides/${ENV.ZEPLIN_STYLEGUIDE_ID}/colors`;
    return ZEPLIN<{ id: string; }, ColorCreateBody>('POST', URL, {
      name: color.name,
      r: color.color.r,
      g: color.color.g,
      b: color.color.b,
      a: color.color.a || 255,
      sourceId: color.sourceId,
    });
  }
};