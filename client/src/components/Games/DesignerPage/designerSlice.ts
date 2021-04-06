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

interface DesignerState {
  isLoading: boolean;
  words: IWord[];
  baseWords: IWord[];
  activeWord: IWord;
  activeVariants: IWord[];
}

const initialState: DesignerState = {
  isLoading: false,
  words: [],
  baseWords: [],
  activeWord: { ...wordEmpty },
  activeVariants: [],
};

export const designerSlice = createSlice({
  name: 'designer',
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
    clearDesigner: (state) => {
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
  clearDesigner,
} = designerSlice.actions;

export const initDesigner = (): AppThunk => async (dispatch, getState) => {
  dispatch(setIsLoading(true));
  const userId = getLocalUserId();
  const data = getState().game.data;
  console.log('initDesigner :', userId, data);
  const words = await loadWords({ data, userId, count: getState().settings.designer.countWords });
  dispatch(setWords(words as IExtWord[]));
  dispatch(setBaseWords(words as IExtWord[]));
  dispatch(setIsLoading(false));
};

export const nextWordDesigner = (): AppThunk => async (dispatch, getState) => {
  dispatch(nextActiveWord());
  const activeWord = getState().designer.activeWord;
  const words = getState().designer.baseWords.filter(
    (word) => word.id !== activeWord.id,
  );
  console.log('words: ', words);
  // const variants = [
  //   ...shuffleArrayCount(words, getState().settings.designer.countVariants - 1),
  //   getState().designer.activeWord,
  // ];
  // dispatch(setActiveVariants(shuffleArray(variants)));
};

export const isLoadingDesigner = (state: RootState) => state.designer.isLoading;
export const activeWordDesigner = (state: RootState) =>
  state.designer.activeWord;
export const activeVariantsDesigner = (state: RootState) =>
  state.designer.activeVariants;

export default designerSlice.reducer;
