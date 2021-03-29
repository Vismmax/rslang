const keySettings = 'settings';

export const getSettings = (): string | null => {
  const settings = window.localStorage.getItem(keySettings);
  if (settings) return JSON.parse(settings);
  return null;
};

export const setSettings = (settings: object): void => {
  window.localStorage.setItem(keySettings, JSON.stringify(settings));
};

export const clearSettings = (): void => {
  window.localStorage.removeItem(keySettings);
};
