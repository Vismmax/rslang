import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { AppThunk, RootState } from '../../redux/store';
import { getLocalUserId } from '../../common/helpers/userHelper';
import {
  getStatistics,
  putStatistics,
  StatisticsReturn,
} from '../../api/services/statisticsService';

export interface IStatisticsGame {
  name: string;
  timeStart: Date;
  timeStop: Date;
  wordsTrueIds: string[];
  wordsFalseIds: string[];
  seriesTrueAnswers: number;
  score: number;
  experience: number;
}

export type IStatistics = IStatisticsGame[];

interface StatisticsState {
  isLoading: boolean;
  learnedWords: number;
  statistics: IStatistics;
}

const initialState: StatisticsState = {
  isLoading: false,
  learnedWords: 0,
  statistics: [],
};

export const statisticsSlice = createSlice({
  name: 'statistics',
  initialState,
  reducers: {
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setStatistics: (
      state,
      action: PayloadAction<{ learnedWords: number; statistics: IStatistics }>,
    ) => {
      state.learnedWords = action.payload.learnedWords;
      state.statistics = action.payload.statistics;
    },
    clear: (state) => {
      return initialState;
    },
  },
});

export const { setIsLoading, setStatistics, clear } = statisticsSlice.actions;

export const loadStatistics = (): AppThunk => async (dispatch, getState) => {
  dispatch(setIsLoading(true));
  const userId = getLocalUserId();
  if (userId) {
    const res = await getStatistics(userId);
    if (!res.error) {
      const { learnedWords, optional } = res as StatisticsReturn;
      const statistics = optional.statistics.map((game) => ({
        ...game,
        timeStart: new Date(game.timeStart),
        timeStop: new Date(game.timeStop),
      }));
      dispatch(setStatistics({ learnedWords, statistics }));
    }
  } else {
  }
  dispatch(setIsLoading(false));
};

export const addStatisticsGame = (game: IStatisticsGame): AppThunk => async (
  dispatch,
  getState,
) => {
  dispatch(setIsLoading(true));
  const statistics = [...getState().statistics.statistics];
  statistics.push(game);
  const learnedWords = new Set(
    statistics.map((gm) => gm.wordsTrueIds.concat(gm.wordsFalseIds)).flat(),
  ).size;
  dispatch(setStatistics({ learnedWords, statistics }));

  const userId = getLocalUserId();
  if (userId) {
    putStatistics({ userId, learnedWords, statistics });
  }
};

export const clearStatistics = (): AppThunk => async (dispatch, getState) => {
  dispatch(clear());
};

export const isLoadingStatistics = (state: RootState) =>
  state.statistics.isLoading;
export const learnedWordsStatistics = (state: RootState) =>
  state.statistics.learnedWords;
export const statisticsAllDays = (state: RootState) =>
  state.statistics.statistics;
export const statisticsToday = (state: RootState) => {
  const today = new Date();
  const [day, month, year] = [
    today.getDay(),
    today.getMonth(),
    today.getFullYear(),
  ];
  return state.statistics.statistics.filter(
    (game) =>
      game.timeStart.getDay() === day &&
      game.timeStart.getMonth() === month &&
      game.timeStart.getFullYear() === year,
  );
};

export default statisticsSlice.reducer;
