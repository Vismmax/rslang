const keySettings = 'settings';

export const getLocalSettings = (): object | null => {
  const settings = window.localStorage.getItem(keySettings);
  if (settings) return JSON.parse(settings);
  return null;
};

export const setLocalSettings = (settings: object): void => {
  window.localStorage.setItem(keySettings, JSON.stringify(settings));
};

export const clearLocalSettings = (): void => {
  window.localStorage.removeItem(keySettings);
};
