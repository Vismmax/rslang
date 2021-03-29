import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk, RootState } from '../../redux/store';
import { IWord } from '../../common/interfaces/WordInterfaces';
import { getRandomWordsByGroup } from '../../api/services/wordsService';

interface GameState {
  isLoading: boolean;
  isRunning: boolean;
  level: number | null;
  words: IWord[];
}

const initialState: GameState = {
  isLoading: false,
  isRunning: false,
  level: null,
  words: [],
};

export const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    resetGame: (state) => {
      state = initialState;
    },
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setIsRunning: (state, action: PayloadAction<boolean>) => {
      state.isRunning = action.payload;
    },
    setLevel: (state, action: PayloadAction<number>) => {
      state.level = action.payload;
    },
    setWords: (state, action: PayloadAction<IWord[]>) => {
      state.words = action.payload;
    },
  },
});

export const {
  resetGame,
  setIsLoading,
  setIsRunning,
  setLevel,
  setWords,
} = gameSlice.actions;

export const loadWords = (level: number): AppThunk => async (
  dispatch,
  getState,
) => {
  dispatch(setIsLoading(true));
  dispatch(setLevel(level));
  const words = await getRandomWordsByGroup(level);
  console.log('words: ', words);
  dispatch(setWords(words));
  dispatch(setIsLoading(false));
  dispatch(setIsRunning(true));
};

export const isLoadingGame = (state: RootState) => state.game.isLoading;
export const isRunningGame = (state: RootState) => state.game.isRunning;
export const wordsStore = (state: RootState) => state.game.words;
export const countWordsStore = (state: RootState) => state.game.words.length;

export default gameSlice.reducer;
