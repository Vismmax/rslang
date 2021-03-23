import webApi from '../webApiHelper';
import { IWord } from '../../common/interfaces/WordInterfaces';
import { getRandomNumber } from '../../helpers/randomNumbers';

const URL = '/words';

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

export const getRandomWordsByGroup = async (
  group: number,
): Promise<IWord[]> => {
  const page = getRandomNumber(0, 29);
  const words = (await webApi.get(URL, { group, page })) as IWord[];
  return words;
};

export const getWordById = async (id: string): Promise<IWord> => {
  const word = (await webApi.get(`${URL}/${id}`)) as IWord;
  return word;
};
