import { DesignTokens, User } from '@zeplin/sdk';
import { ENV } from '../envVariables';
import { ZEPLIN } from './_shared';

/** */
export async function getCurrentUser () {
  return ZEPLIN<User>('GET', 'users/me', null);
}

/** */
export async function getDesignTokens (): Promise<DesignTokens> {
  const URL = `styleguides/${ENV.ZEPLIN_STYLEGUIDE_ID}/design_tokens?include_linked_styleguides=false&token_name_case=kebab`;
  const { colors, textStyles, spacing } = await ZEPLIN<DesignTokens>('GET', URL, null);
  return { colors: colors || {}, textStyles: textStyles || {}, spacing: spacing || {} };
}