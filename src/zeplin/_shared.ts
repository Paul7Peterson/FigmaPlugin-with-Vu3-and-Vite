import { ENV } from '../envVariables';

const URL_ROOT = 'https://api.zeplin.dev/v1/';

type HTTPMethod = 'GET' | 'DELETE' | 'POST' | 'PUT' | 'PATCH';

const FETCH_HEADERS: Record<string, string> = {
  Accept: 'application/json',
  Authorization: `Bearer ${ENV.STORYBOOK_ZEPLIN_TOKEN}`,
};

export function ZEPLIN<T> (method: 'GET', url: string): Promise<T>;
export function ZEPLIN<T, U = null> (method: 'DELETE' | 'POST' | 'PUT' | 'PATCH', url: string, body: U): Promise<T>;
export function ZEPLIN<T, U = null> (method: HTTPMethod, url: string, body?: U): Promise<T> {
  const options: RequestInit = {
    method,
    headers: FETCH_HEADERS,
  };
  if (method !== 'GET' && body) {
    options.body = JSON.stringify(body);
    // @ts-ignore
    options.headers['Content-Type'] = 'application/json';
  }
  return fetch(`${URL_ROOT}/${url}`, options)
    .then(response => response.json())
    .catch(err => console.error(err));
}