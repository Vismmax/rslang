const keyGroup = 'current_group';
const keyPage = 'current_page';

export const getCurrentGroup = (): number => {
  return Number(window.localStorage.getItem(keyGroup)) || 0;
};
export const getCurrentPage = (): number => {
  return Number(window.localStorage.getItem(keyPage)) || 0;
};

export const setCurrentGroup = (group: number): void => {
  window.localStorage.setItem(keyGroup, group.toString());
};
export const setCurrentPage = (page: number): void => {
  window.localStorage.setItem(keyPage, page.toString());
};

export const clearCurrentGroupPage = (): void => {
  window.localStorage.removeItem(keyGroup);
  window.localStorage.removeItem(keyPage);
};
