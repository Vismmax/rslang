import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk, RootState } from '../../redux/store';
import { IExtWord, IUserWord } from '../../common/interfaces/WordInterfaces';
import { DifficultyEnum } from '../../common/enums/DifficultyEnum';
import {
  getLocalDictionaryDifficulty,
  getLocalDictionaryPage,
  setLocalDictionaryDifficulty,
  setLocalDictionaryPage,
} from '../../common/helpers/localDictionaryPage';
import { getLocalUserId } from '../../common/helpers/userHelper';
import { getDictionaryWords } from '../../api/services/wordsService';

interface TextbookState {
  isLoading: boolean;
  idLoadingWord: string;
  dictionaryWords: IExtWord[];
  dictionaryDifficulty: DifficultyEnum;
  dictionaryPage: number;
  countPages: number;
}

const initialState: TextbookState = {
  isLoading: false,
  idLoadingWord: '',
  dictionaryWords: [],
  dictionaryDifficulty: DifficultyEnum.work,
  dictionaryPage: 0,
  countPages: 1,
};

export const dictionarySlice = createSlice({
  name: 'dictionary',
  initialState,
  reducers: {
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setIdLoadingWord: (state, action: PayloadAction<string>) => {
      state.idLoadingWord = action.payload;
    },
    setDictionaryWords: (state, action: PayloadAction<IExtWord[]>) => {
      state.dictionaryWords = action.payload;
    },
    // setUserWord: (
    //   state,
    //   action: PayloadAction<{ id: string; userWord: IUserWord }>,
    // ) => {
    //   if (action.payload.userWord.difficulty === 'delete') {
    //     state.dictionaryWords = state.dictionaryWords.filter(
    //       (word) => word.id !== action.payload.id,
    //     );
    //   } else {
    //     state.dictionaryWords = state.dictionaryWords.map((word) =>
    //       word.id === action.payload.id
    //         ? { ...word, userWord: action.payload.userWord }
    //         : word,
    //     );
    //   }
    // },
    setDictionaryDifficulty: (state, action: PayloadAction<DifficultyEnum>) => {
      state.dictionaryDifficulty = action.payload;
    },
    setDictionaryPage: (state, action: PayloadAction<number>) => {
      state.dictionaryPage = action.payload;
    },
    setCountPages: (state, action: PayloadAction<number>) => {
      state.countPages = action.payload;
    },
  },
});

export const {
  setIsLoading,
  setDictionaryWords,
  // setUserWord,
  setIdLoadingWord,
  setDictionaryDifficulty,
  setDictionaryPage,
  setCountPages,
} = dictionarySlice.actions;

export const fetchDictionaryWords = (): AppThunk => async (
  dispatch,
  getState,
) => {
  dispatch(setIsLoading(true));
  const group = getState().textbook.activeGroup;
  const page = getState().dictionary.dictionaryPage;
  const difficulty = getState().dictionary.dictionaryDifficulty;
  const userId = getLocalUserId();
  if (userId) {
    const res = await getDictionaryWords({ userId, group, page, difficulty });
    console.log('res: ', res);
    if (res.totalCount.length) {
      dispatch(setCountPages(Math.ceil(res.totalCount[0].count / 20)));
    } else {
      dispatch(setCountPages(0));
    }
    dispatch(setDictionaryWords(res.paginatedResults));
  }

  dispatch(setIsLoading(false));
};

// export const fetchSetUserWord = ({
//   id,
//   userWord,
//   create,
// }: {
//   id: string;
//   userWord: IUserWord;
//   create: boolean;
// }): AppThunk => async (dispatch, getState) => {
//   // dispatch(setIsLoading(true));
//   dispatch(setIdLoadingWord(id));
//   const userId = getLocalUserId();
//   if (userId) {
//     let newUserWordResponse = {} as IUserWordResponse;
//     const param = {
//       userId,
//       wordId: id,
//       userWord,
//     };
//     if (create) {
//       newUserWordResponse = (await createUserWord(param)) as IUserWordResponse;
//     } else {
//       newUserWordResponse = (await updateUserWord(param)) as IUserWordResponse;
//     }
//     if (newUserWordResponse.error) {
//       dispatch(showNotificationError('Невожможно произвести действие'));
//       // dispatch(setIsLoading(false));
//       dispatch(setIdLoadingWord(''));
//       return;
//     }
//     const { difficulty, optional } = { ...newUserWordResponse };
//     dispatch(setUserWord({ id, userWord: { difficulty, optional } }));
//   }
//   // dispatch(setIsLoading(false));
//   dispatch(setIdLoadingWord(''));
// };

// export const fetchWordSetDifficulty = ({
//   id,
//   difficulty,
// }: {
//   id: string;
//   difficulty: string;
// }): AppThunk => async (dispatch, getState) => {
//   const word = getState().dictionary.dictionaryWords.find(
//     (word) => word.id === id,
//   ) as IExtWord;
//   const userWord: IUserWord = { ...word.userWord, difficulty };
//   const create = !word.userWord.difficulty;
//   dispatch(fetchSetUserWord({ id, userWord, create }));
// };

export const saveDictionaryDifficulty = (
  difficulty: DifficultyEnum,
): AppThunk => async (dispatch, getState) => {
  dispatch(setDictionaryDifficulty(difficulty));
  setLocalDictionaryDifficulty(difficulty);
  dispatch(saveDictionaryPage(0));
};

export const saveDictionaryPage = (page: number): AppThunk => async (
  dispatch,
  getState,
) => {
  dispatch(setDictionaryPage(page));
  setLocalDictionaryPage(page);
  dispatch(fetchDictionaryWords());
};

export const loadDictionaryPage = (): AppThunk => async (
  dispatch,
  getState,
) => {
  const difficulty = getLocalDictionaryDifficulty() || DifficultyEnum.work;
  const page = getLocalDictionaryPage() || 0;
  dispatch(setDictionaryDifficulty(difficulty));
  dispatch(setDictionaryPage(page));
};

export const isLoading = (state: RootState) => state.dictionary.isLoading;
export const idLoadingWord = (state: RootState) =>
  state.dictionary.idLoadingWord;
export const dictionaryWords = (state: RootState) =>
  state.dictionary.dictionaryWords;
export const dictionaryDifficulty = (state: RootState) =>
  state.dictionary.dictionaryDifficulty;
export const dictionaryPage = (state: RootState) =>
  state.dictionary.dictionaryPage;
export const countPages = (state: RootState) => state.dictionary.countPages;

export default dictionarySlice.reducer;
