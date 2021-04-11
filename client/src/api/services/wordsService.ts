import webApi from '../webApiHelper';
import {
  IExtWord,
  IUserWord,
  IWord,
} from '../../common/interfaces/WordInterfaces';
import { addId, extendWords } from './extendWords';

const URL = '/words';

export type ExtWordsResponse = [
  {
    paginatedResults: IExtWord[];
    totalCount: [
      {
        count: number;
      },
    ];
  },
];

export type ExtWordsResponseObj = {
  paginatedResults: IExtWord[];
  totalCount: [
    {
      count: number;
    },
  ];
};

export interface IUserWordResponse extends IUserWord {
  id: string;
  wordId: string;
  error?: any;
}

export const getWords = async ({
  group,
  page,
}: {
  group: number;
  page: number;
}): Promise<IWord[]> => {
  const words = (await webApi.get(URL, { group, page })) as IWord[];
  return words;
};

export const getWordById = async (id: string): Promise<IWord> => {
  const word = (await webApi.get(`${URL}/${id}`)) as IWord;
  return word;
};

export const getActiveWords = async ({
  group,
  page,
}: {
  group: number;
  page: number;
}): Promise<IExtWord[]> => {
  const words = (await getWords({ group, page })) as IExtWord[];
  const extWords = extendWords(words);
  return extWords;
};

export const getActiveWordsByUser = async ({
  userId,
  group,
  page,
}: {
  userId: string;
  group: number;
  page: number;
}): Promise<IExtWord[]> => {
  const url = `/users/${userId}/aggregatedWords`;
  const params = {
    group,
    page,
    wordsPerPage: 20,
    filter:
      '{"$or":[{"userWord.difficulty":"work"},{"userWord.difficulty":"hard"},{"userWord.difficulty":"delete"},{"userWord":null}]}',
  };
  const words = (await webApi.get(url, params)) as ExtWordsResponse;
  const extWords = extendWords(words[0].paginatedResults);
  return extWords;
};

export const createUserWord = async ({
  userId,
  wordId,
  userWord,
}: {
  userId: string;
  wordId: string;
  userWord: IUserWord;
}): Promise<IUserWordResponse> => {
  const url = `/users/${userId}/words/${wordId}`;
  return (await webApi.post(url, userWord)) as IUserWordResponse;
};

export const updateUserWord = async ({
  userId,
  wordId,
  userWord,
}: {
  userId: string;
  wordId: string;
  userWord: IUserWord;
}): Promise<IUserWordResponse> => {
  const url = `/users/${userId}/words/${wordId}`;
  return (await webApi.put(url, userWord)) as IUserWordResponse;
};

export const deleteUserWord = async ({
  userId,
  wordId,
}: {
  userId: string;
  wordId: string;
}): Promise<{ error?: any }> => {
  const url = `/users/${userId}/words/${wordId}`;
  return await webApi.delete(url);
};

export const getDictionaryWords = async ({
  userId,
  group,
  page,
  difficulty,
}: {
  userId: string;
  group: number;
  page: number;
  difficulty: string;
}): Promise<ExtWordsResponseObj> => {
  const url = `/users/${userId}/aggregatedWords`;
  const filter = `{"$or":[{"userWord.difficulty":"${difficulty}"}${
    difficulty === 'work' ? ',{"userWord.difficulty":"hard"}' : ''
  }]}`;
  const params = {
    group,
    page,
    wordsPerPage: 20,
    filter,
  };
  const res = (await webApi.get(url, params)) as ExtWordsResponse;
  return addId(res[0]);
};
