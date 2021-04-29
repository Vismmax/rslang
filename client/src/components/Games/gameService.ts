import { IGameData } from './gameSlice';
import {
  randomIntegerCount,
  shuffleArrayCount,
} from '../../common/helpers/randomHelper';
import {
  getActiveWords,
  getActiveWordsByUser,
  getDictionaryWords,
} from '../../api/services/wordsService';

interface Props {
  data: IGameData;
  userId: string | null;
  count: number;
}

export const loadWords = async ({ data, userId, count }: Props) => {
  if (data.difficulty !== '') {
    return loadDictionaryWords({ data, userId, count });
  } else if (data.page !== null) {
    return loadTextbookWords({ data, userId, count });
  } else {
    return loadLevelWords({ data, userId, count });
  }
};

const loadLevelWords = async ({ data, userId, count }: Props) => {
  const group = data.group;
  const countPage = Math.ceil(count / 20);
  const numPages = randomIntegerCount(0, 29, countPage);
  let arraysWords = [];
  if (userId) {
    arraysWords = await Promise.all(
      numPages.map((pg) => getActiveWordsByUser({ userId, group, page: pg })),
    );
  } else {
    arraysWords = await Promise.all(
      numPages.map((pg) => getActiveWords({ group, page: pg })),
    );
  }
  const words = new Array().concat(...arraysWords);
  return shuffleArrayCount(words, count);
};

const loadDictionaryWords = async ({ data, userId, count }: Props) => {
  let { group, page, difficulty } = data as {
    group: number;
    page: number;
    difficulty: string;
  };
  const words = [];
  if (userId) {
    do {
      const res = await getDictionaryWords({ userId, group, page, difficulty });
      words.push(...res.paginatedResults);
      if (--page < 0) {
        page = 29;
        if (--group < 0) break;
      }
    } while (words.length < count);
  }
  return shuffleArrayCount(words, count);
};

const loadTextbookWords = async ({ data, userId, count }: Props) => {
  let { group, page } = data as { group: number; page: number };
  const words = [];
  if (userId) {
    do {
      const res = await getActiveWordsByUser({ userId, group, page });
      words.push(...res);
      if (--page < 0) {
        page = 29;
        if (--group < 0) break;
      }
    } while (words.length < count);
  } else {
    do {
      const res = await getActiveWords({ group, page });
      words.push(...res);
      if (--page < 0) {
        page = 29;
        if (--group < 0) break;
      }
    } while (words.length < count);
  }
  return shuffleArrayCount(words, count);
};
