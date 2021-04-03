import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk, RootState } from '../../../redux/store';
import {
  IExtWord,
  IWord,
  wordEmpty,
} from '../../../common/interfaces/WordInterfaces';
import {
  shuffleArray,
  shuffleArrayCount,
} from '../../../common/helpers/randomHelper';
import { getLocalUserId } from '../../../common/helpers/userHelper';
import { loadWords } from '../gameService';

interface SavannahState {
  isLoading: boolean;
  words: IWord[];
  baseWords: IWord[];
  activeWord: IWord;
  activeVariants: IWord[];
  userId: string | null;
}

const initialState: SavannahState = {
  isLoading: false,
  words: [],
  baseWords: [],
  activeWord: { ...wordEmpty },
  activeVariants: [],
  userId: null,
};

export const savannahSlice = createSlice({
  name: 'savannah',
  initialState,
  reducers: {
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    // addWords: (state, action: PayloadAction<IWord[]>) => {
    //   state.words.push(...action.payload);
    // },
    setWords: (state, action: PayloadAction<IWord[]>) => {
      state.words = action.payload;
    },
    setBaseWords: (state, action: PayloadAction<IWord[]>) => {
      state.baseWords = action.payload;
    },
    nextActiveWord: (state) => {
      state.activeWord = state.words.pop() || { ...wordEmpty };
    },
    setActiveWord: (state, action: PayloadAction<IWord>) => {
      state.activeWord = action.payload;
    },
    setActiveVariants: (state, action: PayloadAction<IWord[]>) => {
      state.activeVariants = action.payload;
    },
    setUserId: (state, action: PayloadAction<string | null>) => {
      state.userId = action.payload;
    },
    clearSavannah: (state) => {
      return initialState;
    },
  },
});

export const {
  setIsLoading,
  // addWords,
  setWords,
  setBaseWords,
  nextActiveWord,
  setActiveWord,
  setActiveVariants,
  setUserId,
  clearSavannah,
} = savannahSlice.actions;

export const initSavannah = (): AppThunk => async (dispatch, getState) => {
  dispatch(setIsLoading(true));
  const userId = getLocalUserId();
  dispatch(setUserId(userId));
  const data = getState().game.data;
  console.log('initSavannah :', userId, data);
  const words = await loadWords({ data, userId, count: 30 });
  dispatch(setWords(words as IExtWord[]));
  dispatch(setBaseWords(words as IExtWord[]));
  dispatch(setIsLoading(false));
};

export const nextWordSavannah = (): AppThunk => async (dispatch, getState) => {
  dispatch(nextActiveWord());
  const activeWord = getState().audioChallenge.activeWord;
  const words = getState().audioChallenge.baseWords.filter(
    (word) => word.id !== activeWord.id,
  );
  const variants = [
    ...shuffleArrayCount(words, getState().settings.savannah.countVariants - 1),
    getState().savannah.activeWord,
  ];
  dispatch(setActiveVariants(shuffleArray(variants)));
};

export const isLoadingSavannah = (state: RootState) => state.savannah.isLoading;
export const activeWordSavannah = (state: RootState) =>
  state.savannah.activeWord;
export const activeVariantsSavannah = (state: RootState) =>
  state.savannah.activeVariants;

export default savannahSlice.reducer;
