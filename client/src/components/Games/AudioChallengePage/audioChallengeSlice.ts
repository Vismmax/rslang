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

interface AudioChallengeState {
  isLoading: boolean;
  words: IWord[];
  baseWords: IWord[];
  activeWord: IWord;
  activeVariants: IWord[];
}

const initialState: AudioChallengeState = {
  isLoading: false,
  words: [],
  baseWords: [],
  activeWord: { ...wordEmpty },
  activeVariants: [],
};

export const audioChallengeSlice = createSlice({
  name: 'audioChallenge',
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
    clearAudioChallenge: (state) => {
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
  clearAudioChallenge,
} = audioChallengeSlice.actions;

export const initAudioChallenge = (): AppThunk => async (
  dispatch,
  getState,
) => {
  dispatch(setIsLoading(true));
  const userId = getLocalUserId();
  const data = getState().game.data;
  console.log('initAudioChallenge :', userId, data);
  const words = await loadWords({
    data,
    userId,
    count: getState().settings.audioChallenge.countWords,
  });
  dispatch(setWords(words as IExtWord[]));
  dispatch(setBaseWords(words as IExtWord[]));
  dispatch(setIsLoading(false));
};

export const nextWordAudioChallenge = (): AppThunk => async (
  dispatch,
  getState,
) => {
  dispatch(nextActiveWord());
  const activeWord = getState().audioChallenge.activeWord;
  const words = getState().audioChallenge.baseWords.filter(
    (word) => word.id !== activeWord.id,
  );
  const variants = [
    ...shuffleArrayCount(
      words,
      getState().settings.audioChallenge.countVariants - 1,
    ),
    getState().audioChallenge.activeWord,
  ];
  dispatch(setActiveVariants(shuffleArray(variants)));
};

export const isLoadingAudioChallenge = (state: RootState) =>
  state.audioChallenge.isLoading;
export const activeWordAudioChallenge = (state: RootState) =>
  state.audioChallenge.activeWord;
export const activeVariantsAudioChallenge = (state: RootState) =>
  state.audioChallenge.activeVariants;
export const allWordsAudioChallenge = (state: RootState) =>
  state.audioChallenge.baseWords;
export const countWordsAudioChallenge = (state: RootState) =>
  state.audioChallenge.baseWords.length;

export default audioChallengeSlice.reducer;
