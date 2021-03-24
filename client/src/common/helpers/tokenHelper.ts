const keyToken = 'access_token';
const keyRefreshToken = 'access_refresh_token';

export const getToken = (): string | null => {
  return window.localStorage.getItem(keyToken);
};

export const getRefreshToken = (): string | null => {
  return window.localStorage.getItem(keyRefreshToken);
};

export const setToken = (token: string): void => {
  window.localStorage.setItem(keyToken, token);
};

export const setRefreshToken = (token: string): void => {
  window.localStorage.setItem(keyRefreshToken, token);
};

export const clearToken = (): void => {
  window.localStorage.removeItem(keyToken);
};

export const clearRefreshToken = (): void => {
  window.localStorage.removeItem(keyRefreshToken);
};

export const clearAllTokens = (): void => {
  window.localStorage.removeItem(keyToken);
  window.localStorage.removeItem(keyRefreshToken);
};
