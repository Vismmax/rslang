import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk, RootState } from '../../redux/store';
import { IWord } from '../../common/interfaces/WordInterfaces';
import { getRandomWordsByGroup } from '../../api/services/wordsService';

interface GameState {
  isLoading: boolean;
  level: number | null;
  words: IWord[];
}

const initialState: GameState = {
  isLoading: false,
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
};

export const isLoadingStore = (state: RootState) => state.game.isLoading;
export const countWordsStore = (state: RootState) => state.game.words.length;

export default gameSlice.reducer;
