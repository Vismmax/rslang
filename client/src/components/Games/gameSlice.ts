import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk, RootState } from '../../redux/store';
import { IWord } from '../../common/interfaces/WordInterfaces';
import { DifficultyEnum } from '../../common/enums/DifficultyEnum';

export interface IGameData {
  group: number;
  page: number | null;
  difficulty: string;
}

interface GameState {
  isLoading: boolean;
  isBegin: boolean;
  isStart: boolean;
  route: string;
  level: number | null;
  data: IGameData;

  // isRunning: boolean;
  // words: IWord[];
}

const initialState: GameState = {
  isLoading: false,
  isBegin: false,
  isStart: false,
  route: '',
  level: null,
  data: {
    group: 0,
    page: null,
    difficulty: '',
  },

  // isRunning: false,
  // words: [],
};

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
    setRouteGame: (state, action: PayloadAction<string>) => {
      state.route = action.payload;
    },
    setLevel: (state, action: PayloadAction<number>) => {
      state.level = action.payload;
    },
    setData: (state, action: PayloadAction<IGameData>) => {
      state.data = action.payload;
    },
    clearGame: (state) => {
      return initialState;
    },

    // setIsRunning: (state, action: PayloadAction<boolean>) => {
    //   state.isRunning = action.payload;
    // },
    // setWords: (state, action: PayloadAction<IWord[]>) => {
    //   state.words = action.payload;
    // },
  },
});

export const {
  setIsLoading,
  setIsBegin,
  setIsStart,
  setRouteGame,
  setLevel,
  setData,
  clearGame,

  // setIsRunning,
  // setWords,
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

// export const loadWords = (level: number): AppThunk => async (
//   dispatch,
//   getState,
// ) => {
//   dispatch(setIsLoading(true));
//   dispatch(setLevel(level));
//   const words = await getRandomWordsByGroup(level);
//   console.log('words: ', words);
//   dispatch(setWords(words));
//   dispatch(setIsLoading(false));
//   dispatch(setIsRunning(true));
// };

export const isLoadingGame = (state: RootState) => state.game.isLoading;
export const isBeginGame = (state: RootState) => state.game.isBegin;
export const isStartGame = (state: RootState) => state.game.isStart;
export const routeGame = (state: RootState) => state.game.route;
export const gameData = (state: RootState) => state.game.data;

// export const isRunningGame = (state: RootState) => state.game.isRunning;
// export const wordsStore = (state: RootState) => state.game.words;
// export const countWordsStore = (state: RootState) => state.game.words.length;

export default gameSlice.reducer;
