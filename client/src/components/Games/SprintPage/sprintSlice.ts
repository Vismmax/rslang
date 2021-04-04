import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk, RootState } from '../../../redux/store';
import {
  IExtWord,
  IWord,
  wordEmpty,
} from '../../../common/interfaces/WordInterfaces';
import {
  randomInteger,
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
  activeVariant: IWord;
}

const initialState: SprintState = {
  isLoading: false,
  words: [],
  baseWords: [],
  activeWord: { ...wordEmpty },
  activeVariant: { ...wordEmpty },
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
    setActiveVariant: (state, action: PayloadAction<IWord>) => {
      state.activeVariant = action.payload;
    },
    setNextWords: (
      state,
      action: PayloadAction<{ word: IWord; variant: IWord }>,
    ) => {
      state.activeWord = action.payload.word;
      state.activeVariant = action.payload.variant;
      state.words.pop();
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
  setActiveVariant,
  setNextWords,
  clearSprint,
} = sprintSlice.actions;

export const initSprint = (): AppThunk => async (dispatch, getState) => {
  dispatch(setIsLoading(true));
  const userId = getLocalUserId();
  const data = getState().game.data;
  console.log('initSprint :', userId, data);
  const words = await loadWords({
    data,
    userId,
    count: getState().settings.sprint.timeGame * 2,
  });
  dispatch(setWords(words as IExtWord[]));
  dispatch(setBaseWords(words as IExtWord[]));
  dispatch(setIsLoading(false));
};

export const nextWordSprint = (): AppThunk => async (dispatch, getState) => {
  const word = getState().sprint.words[getState().sprint.words.length - 1];
  const id = randomInteger(0, getState().sprint.baseWords.length - 1);
  const variant = Math.random() < 0.4 ? word : getState().sprint.baseWords[id];
  dispatch(setNextWords({ word, variant }));
};

export const isLoadingSprint = (state: RootState) => state.sprint.isLoading;
export const activeWordSprint = (state: RootState) => state.sprint.activeWord;
export const activeVariantSprint = (state: RootState) =>
  state.sprint.activeVariant;

export default sprintSlice.reducer;
