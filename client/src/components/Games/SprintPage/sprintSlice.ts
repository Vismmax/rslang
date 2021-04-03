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

interface SprintState {
  isLoading: boolean;
  words: IWord[];
  baseWords: IWord[];
  activeWord: IWord;
  activeVariants: IWord[];
}

const initialState: SprintState = {
  isLoading: false,
  words: [],
  baseWords: [],
  activeWord: { ...wordEmpty },
  activeVariants: [],
};

export const sprintSlice = createSlice({
  name: 'sprint',
  initialState,
  reducers: {
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
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
    clearSprint: (state) => {
      return initialState;
    },
  },
});

export const {
  setIsLoading,
  setWords,
  setBaseWords,
  nextActiveWord,
  setActiveWord,
  setActiveVariants,
  clearSprint,
} = sprintSlice.actions;

export const initSprint = (): AppThunk => async (dispatch, getState) => {
  dispatch(setIsLoading(true));
  const userId = getLocalUserId();
  const data = getState().game.data;
  console.log('initSprint :', userId, data);
  const words = await loadWords({ data, userId, count: 30 });
  dispatch(setWords(words as IExtWord[]));
  dispatch(setBaseWords(words as IExtWord[]));
  dispatch(setIsLoading(false));
};

export const nextWordSprint = (): AppThunk => async (dispatch, getState) => {
  dispatch(nextActiveWord());
  const activeWord = getState().sprint.activeWord;
  const words = getState().sprint.baseWords.filter(
    (word) => word.id !== activeWord.id,
  );
  console.log('words: ', words);
  // const variants = [
  //   ...shuffleArrayCount(words, getState().settings.sprint.countVariants - 1),
  //   getState().sprint.activeWord,
  // ];
  // dispatch(setActiveVariants(shuffleArray(variants)));
};

export const isLoadingSprint = (state: RootState) => state.sprint.isLoading;
export const activeWordSprint = (state: RootState) => state.sprint.activeWord;
export const activeVariantsSprint = (state: RootState) =>
  state.sprint.activeVariants;

export default sprintSlice.reducer;
