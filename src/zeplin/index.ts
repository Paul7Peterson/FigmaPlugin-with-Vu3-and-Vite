import { DesignTokens } from '@zeplin/sdk';
import { ENV } from '~ui/envVariables';
import { ZEPLIN } from './_shared';

/**
 * We need to use the `fetch` method:
 * @link https://www.figma.com/plugin-docs/resource-links/#docsNav
 * @link https://docs.zeplin.dev/reference/introduction
 */

export async function getDesignTokens (): Promise<DesignTokens> {
  const { colors, textStyles, spacing } = await ZEPLIN<DesignTokens>('GET', `styleguides/${ENV.ZEPLIN_STYLEGUIDE_ID}/design_tokens?include_linked_styleguides=false&token_name_case=kebab`);
  return { colors: colors || {}, textStyles: textStyles || {}, spacing: spacing || {} };
}