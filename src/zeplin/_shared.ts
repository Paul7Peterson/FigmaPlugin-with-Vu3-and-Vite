import { ENV } from '../envVariables';

const URL_ROOT = 'https://api.zeplin.dev/v1/';

type HTTPMethod = 'GET' | 'DELETE' | 'POST' | 'PUT' | 'PATCH';

const FETCH_HEADERS = {
  Accept: 'application/json',
  Authorization: `Bearer ${ENV.STORYBOOK_ZEPLIN_TOKEN}`
};

export function ZEPLIN<T> (method: HTTPMethod, url: string): Promise<T> {
  return fetch(`${URL_ROOT}/${url}`, {
    method, headers: FETCH_HEADERS
  })
    .then(response => response.json())
    .catch(err => console.error(err));
}