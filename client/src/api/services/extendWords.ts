import {
  IExtWord,
  clearUserWord,
} from '../../common/interfaces/WordInterfaces';
import { ExtWordsResponseObj } from './wordsService';

export const extendWords = (words: IExtWord[]): IExtWord[] => {
  const extWords = words.map((word) =>
    word.userWord
      ? {
          ...word,
          id: word.id ? word.id : word?._id,
          _id: word._id ? word._id : word.id,
        }
      : {
          ...word,
          id: word.id ? word.id : word._id,
          _id: word._id ? word._id : word.id,
          userWord: {
            ...clearUserWord,
            optional: { ...clearUserWord.optional },
          },
        },
  );
  const clearExtWords = extWords.filter(
    (word) => word.userWord.difficulty !== 'delete',
  );
  return clearExtWords;
};

export const addId = (res: ExtWordsResponseObj): ExtWordsResponseObj => {
  return {
    ...res,
    paginatedResults: res.paginatedResults.map((word) => ({
      ...word,
      id: word._id,
    })),
  };
};
