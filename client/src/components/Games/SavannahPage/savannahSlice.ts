import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk, RootState } from '../../../redux/store';
import { IWord, wordEmpty } from '../../../common/interfaces/WordInterfaces';
import { getRandomWordsByGroup } from '../../../api/services/wordsService';
import { randomInteger } from '../../../common/helpers/randomInteger';
import { shuffleArray } from '../../../common/helpers/shuffleArray';

interface SavannahState {
  isLoading: boolean;
  words: IWord[];
  activeWord: IWord;
  activeVariants: IWord[];
  test: number;
}

const initialState: SavannahState = {
  isLoading: false,
  words: [],
  activeWord: wordEmpty,
  activeVariants: [],
  test: 0,
};

export const savannahSlice = createSlice({
  name: 'savannah',
  initialState,
  reducers: {
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    addWords: (state, action: PayloadAction<IWord[]>) => {
      state.words.push(...action.payload);
    },
    setActiveWord: (state, action: PayloadAction<IWord>) => {
      state.activeWord = action.payload;
    },
    setActiveVariants: (state, action: PayloadAction<IWord[]>) => {
      state.activeVariants = action.payload;
    },
    setTest: (state, action: PayloadAction<number>) => {
      state.test = action.payload;
    },
  },
});

export const {
  setIsLoading,
  addWords,
  setActiveWord,
  setActiveVariants,
  setTest,
} = savannahSlice.actions;

export const start = (): AppThunk => async (dispatch, getState) => {
  dispatch(setIsLoading(true));
  const words = await getRandomWordsByGroup(1);
  console.log('words: ', words);
  dispatch(addWords(shuffleArray(words)));
  dispatch(newWord());
  dispatch(setIsLoading(false));
};

export const newWord = (): AppThunk => async (dispatch, getState) => {
  const words = getState().savannah.words;
  const id = randomInteger(0, 15);
  // const word = words[randomInteger(0, 15)];
  // console.log('words: ', words);
  dispatch(setActiveWord(words[id]));
  dispatch(
    setActiveVariants([words[id], words[id + 1], words[id + 2], words[id + 3]]),
  );
  // const idd = window.setInterval(() => {
  //   dispatch(setTest(getState().savannah.test + 1));
  // }, 1000);
};

export const isLoadingSavannah = (state: RootState) => state.savannah.isLoading;
export const activeWordSavannah = (state: RootState) =>
  state.savannah.activeWord;
export const activeVariantsSavannah = (state: RootState) =>
  state.savannah.activeVariants;
export const testTT = (state: RootState) => state.savannah.test;

export default savannahSlice.reducer;
