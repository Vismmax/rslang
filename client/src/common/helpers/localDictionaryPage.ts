import { DifficultyEnum } from '../enums/DifficultyEnum';

const keyDifficulty = 'dictionary_group';
const keyPage = 'dictionary_page';

export const getLocalDictionaryDifficulty = (): DifficultyEnum | null => {
  return window.localStorage.getItem(keyDifficulty) as DifficultyEnum | null;
};
export const getLocalDictionaryPage = (): number => {
  return Number(window.localStorage.getItem(keyPage)) || 0;
};

export const setLocalDictionaryDifficulty = (
  difficulty: DifficultyEnum,
): void => {
  window.localStorage.setItem(keyDifficulty, difficulty);
};
export const setLocalDictionaryPage = (page: number): void => {
  window.localStorage.setItem(keyPage, page.toString());
};

export const clearDictionaryDifficultyPage = (): void => {
  window.localStorage.removeItem(keyDifficulty);
  window.localStorage.removeItem(keyPage);
};
