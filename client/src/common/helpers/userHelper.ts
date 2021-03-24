const keyUserId = 'user_id';

export const getUserId = (): string | null => {
  return window.localStorage.getItem(keyUserId);
};

export const setUserId = (userId: string): void => {
  window.localStorage.setItem(keyUserId, userId);
};

export const clearUserId = (): void => {
  window.localStorage.removeItem(keyUserId);
};

export const clearAllUserData = (): void => {
  window.localStorage.removeItem(keyUserId);
};
