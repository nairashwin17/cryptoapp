import { environment } from '../../environments/environment';

export const URLS = Object({
  cryptolist: `${environment.apiUrl}/v1/cryptocurrency/listings/latest`,
  // cryptolist: `${environment.apiUrl}/api/v3/global`,
});

export const SECRET_KEY = '410bf98a-d2e1-4d4b-893d-ceb93903105f';
