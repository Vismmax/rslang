import webApi from '../webApiHelper';
import { IStatistics } from '../../components/StatisticsPage/statisticsSlice';

const URL = '/users';

export interface StatisticsResponse {
  learnedWords: number;
  optional: { statistics: string };
  error?: any;
}

export interface StatisticsReturn {
  learnedWords: number;
  optional: { statistics: IStatistics };
  error?: any;
}

export interface EmptyStatisticsReturn {
  error?: any;
}

export const getStatistics = async (
  userId: string,
): Promise<StatisticsReturn | EmptyStatisticsReturn> => {
  const res = (await webApi.get(
    `${URL}/${userId}/statistics`,
  )) as StatisticsResponse;
  console.log('resres: ', res);
  return res.error
    ? res
    : {
        ...res,
        optional: {
          statistics: JSON.parse(res.optional.statistics) as IStatistics,
        },
      };
};

export const putStatistics = async ({
  userId,
  learnedWords,
  statistics,
}: {
  userId: string;
  learnedWords: number;
  statistics: IStatistics;
}): Promise<StatisticsResponse> => {
  const res = (await webApi.put(`${URL}/${userId}/statistics`, {
    learnedWords,
    optional: { statistics: JSON.stringify(statistics) },
  })) as StatisticsResponse;
  return res;
};
