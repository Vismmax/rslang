import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk, RootState } from '../../redux/store';
import { IWord } from '../../common/interfaces/WordInterfaces';

export interface IGameData {
  group: number;
  page: number | null;
  difficulty: string;
}

export interface IScore {
  episode: number;
  series: number;
  score: number;
  experience: number;
}

interface GameState {
  isLoading: boolean;
  isBegin: boolean;
  isStart: boolean;
  isStop: boolean;
  route: string;
  level: number | null;
  data: IGameData;
  score: IScore;
}

const initialState: GameState = {
  isLoading: false,
  isBegin: false,
  isStart: false,
  isStop: false,
  route: '',
  level: null,
  data: {
    group: 0,
    page: null,
    difficulty: '',
  },
  score: {
    episode: 0,
    series: 0,
    score: 0,
    experience: 0,
  },
};

export const seriesValues = [10, 20, 40, 80];

export const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setIsBegin: (state, action: PayloadAction<boolean>) => {
      state.isBegin = action.payload;
    },
    setIsStart: (state, action: PayloadAction<boolean>) => {
      state.isStart = action.payload;
    },
    setIsStop: (state, action: PayloadAction<boolean>) => {
      state.isStop = action.payload;
    },
    setRouteGame: (state, action: PayloadAction<string>) => {
      state.route = action.payload;
    },
    setLevel: (state, action: PayloadAction<number>) => {
      state.level = action.payload;
    },
    setData: (state, action: PayloadAction<IGameData>) => {
      state.data = action.payload;
    },
    setScore: (state, action: PayloadAction<IScore>) => {
      state.score = action.payload;
    },
    clearGame: (state) => {
      return initialState;
    },
  },
});

export const {
  setIsLoading,
  setIsBegin,
  setIsStart,
  setIsStop,
  setRouteGame,
  setLevel,
  setData,
  setScore,
  clearGame,
} = gameSlice.actions;

export const initGame = (): AppThunk => async (dispatch, getState) => {
  const route = getState().game.route;
  if (route) {
    console.log('route');
    if (route === '/textbook') {
      dispatch(
        setData({
          group: getState().textbook.activeGroup,
          page: getState().textbook.activePage,
          difficulty: '',
        }),
      );
      dispatch(setIsBegin(true));
    }
    if (route === '/dictionary') {
      dispatch(
        setData({
          group: getState().textbook.activeGroup,
          page: getState().dictionary.dictionaryPage,
          difficulty: getState().dictionary.dictionaryDifficulty,
        }),
      );
      dispatch(setIsBegin(true));
    }
  } else if (getState().game.level !== null) {
    dispatch(
      setData({
        group: getState().game.level as number,
        page: null,
        difficulty: '',
      }),
    );
    dispatch(setIsBegin(true));
  }
};

export const setLevelGame = (level: number): AppThunk => async (
  dispatch,
  getState,
) => {
  dispatch(setLevel(level));
  dispatch(initGame());
};

export const startGame = (): AppThunk => async (dispatch, getState) => {
  dispatch(setIsStart(true));
};

export const addAnswerGame = ({
  word,
  result,
}: {
  word: IWord;
  result: boolean;
}): AppThunk => async (dispatch, getState) => {
  let { episode, series, score, experience } = getState().game.score;
  if (result) {
    score = score + seriesValues[series];
    if (episode < 3) episode++;
    if (episode === 3 && series < 2) {
      episode = 0;
      series++;
    }
    if (episode === 3 && series < 3) {
      series++;
    }
    experience++;
  } else {
    episode = 0;
    series = 0;
  }
  dispatch(setScore({ episode, series, score, experience }));
};

export const stopGame = (): AppThunk => async (dispatch, getState) => {
  dispatch(setIsStart(false));
  dispatch(setIsStop(true));
};

export const isLoadingGame = (state: RootState) => state.game.isLoading;
export const isBeginGame = (state: RootState) => state.game.isBegin;
export const isStartGame = (state: RootState) => state.game.isStart;
export const routeGame = (state: RootState) => state.game.route;
export const gameData = (state: RootState) => state.game.data;
export const scoreGame = (state: RootState) => state.game.score;

export default gameSlice.reducer;
