const keyUserId = 'user_id';

export const getLocalUserId = (): string | null => {
  return window.localStorage.getItem(keyUserId);
};

export const setLocalUserId = (userId: string): void => {
  window.localStorage.setItem(keyUserId, userId);
};

export const clearLocalUserId = (): void => {
  window.localStorage.removeItem(keyUserId);
};

export const clearLocalAllUserData = (): void => {
  window.localStorage.removeItem(keyUserId);
};
