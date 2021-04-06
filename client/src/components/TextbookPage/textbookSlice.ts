import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk, RootState } from '../../redux/store';
import {
  IExtWord,
  IUserWord,
  IWord,
} from '../../common/interfaces/WordInterfaces';
import {
  createUserWord,
  getActiveWords,
  getActiveWordsByUser,
  // getRandomWordsByGroup,
  IUserWordResponse,
  updateUserWord,
} from '../../api/services/wordsService';
import { getLocalUserId } from '../../common/helpers/userHelper';
import { showNotificationError } from '../common/Notification/notificationSlice';
import {
  getCurrentGroup,
  getCurrentPage,
  setCurrentGroup,
  setCurrentPage,
} from '../../common/helpers/localCurrentPage';

interface TextbookState {
  isLoading: boolean;
  idLoadingWord: string;
  activeWords: IExtWord[];
  activeGroup: number;
  activePage: number;
}

const initialState: TextbookState = {
  isLoading: false,
  idLoadingWord: '',
  activeWords: [],
  activeGroup: 0,
  activePage: 0,
};

export const textbookSlice = createSlice({
  name: 'textbook',
  initialState,
  reducers: {
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setIdLoadingWord: (state, action: PayloadAction<string>) => {
      state.idLoadingWord = action.payload;
    },
    setActiveWords: (state, action: PayloadAction<IExtWord[]>) => {
      state.activeWords = action.payload;
    },
    // setUserWord: (
    //   state,
    //   action: PayloadAction<{ id: string; userWord: IUserWord }>,
    // ) => {
    //   if (action.payload.userWord.difficulty === 'delete') {
    //     state.activeWords = state.activeWords.filter(
    //       (word) => word.id !== action.payload.id,
    //     );
    //   } else {
    //     state.activeWords = state.activeWords.map((word) =>
    //       word.id === action.payload.id
    //         ? { ...word, userWord: action.payload.userWord }
    //         : word,
    //     );
    //   }
    // },
    setActiveGroup: (state, action: PayloadAction<number>) => {
      state.activeGroup = action.payload;
    },
    setActivePage: (state, action: PayloadAction<number>) => {
      state.activePage = action.payload;
    },
  },
});

export const {
  setIsLoading,
  setActiveWords,
  // setUserWord,
  setIdLoadingWord,
  setActiveGroup,
  setActivePage,
} = textbookSlice.actions;

export const fetchActiveWords = (): AppThunk => async (dispatch, getState) => {
  dispatch(setIsLoading(true));
  const group = getState().textbook.activeGroup;
  const page = getState().textbook.activePage;
  const userId = getLocalUserId();
  if (userId) {
    const words = await getActiveWordsByUser({ userId, group, page });
    console.log('fetchActiveWords: ', words);
    dispatch(setActiveWords(words));
  } else {
    const words = await getActiveWords({ group, page });
    dispatch(setActiveWords(words));
  }

  dispatch(setIsLoading(false));
  dispatch(setIdLoadingWord(''));
};

export const fetchSetUserWord = ({
  id,
  userWord,
  create,
}: {
  id: string;
  userWord: IUserWord;
  create: boolean;
}): AppThunk => async (dispatch, getState) => {
  // dispatch(setIsLoading(true));
  dispatch(setIdLoadingWord(id));
  const userId = getLocalUserId();
  if (userId) {
    const param = {
      userId,
      wordId: id,
      userWord,
    };
    const newUserWordResponse = create
      ? await createUserWord(param)
      : await updateUserWord(param);
    if (newUserWordResponse.error) {
      dispatch(showNotificationError('Невожможно произвести действие'));
      dispatch(setIdLoadingWord(''));
      return;
    }
    // const { difficulty, optional } = { ...newUserWordResponse };
    // dispatch(setUserWord({ id, userWord: { difficulty, optional } }));
    dispatch(fetchActiveWords());
  }
  // dispatch(setIdLoadingWord(''));
};

export const fetchWordSetDifficulty = ({
  id,
  difficulty,
}: {
  id: string;
  difficulty: string;
}): AppThunk => async (dispatch, getState) => {
  const word = getState().textbook.activeWords.find(
    (word) => word.id === id,
  ) as IExtWord;
  const userWord: IUserWord = { ...word.userWord, difficulty };
  const create = !word.userWord.difficulty;
  dispatch(fetchSetUserWord({ id, userWord, create }));
};

export const saveActiveGroup = (group: number): AppThunk => async (
  dispatch,
  getState,
) => {
  dispatch(setActiveGroup(group));
  setCurrentGroup(group);
  dispatch(saveActivePage(0));
};

export const saveActivePage = (page: number): AppThunk => async (
  dispatch,
  getState,
) => {
  dispatch(setActivePage(page));
  setCurrentPage(page);
  dispatch(fetchActiveWords());
};

export const loadActivePage = (): AppThunk => async (dispatch, getState) => {
  const group = getCurrentGroup() || 0;
  const page = getCurrentPage() || 0;
  dispatch(setActiveGroup(group));
  dispatch(setActivePage(page));
};

export const clearTextbookWords = (): AppThunk => async (
  dispatch,
  getState,
) => {
  dispatch(setActiveWords([]));
};

export const loadingTextbookWords = (state: RootState) =>
  state.textbook.isLoading;
export const idLoadingWord = (state: RootState) => state.textbook.idLoadingWord;
export const activeWords = (state: RootState) => state.textbook.activeWords;
export const activeGroup = (state: RootState) => state.textbook.activeGroup;
export const activePage = (state: RootState) => state.textbook.activePage;
export const activeWordsLength = (state: RootState) =>
  state.textbook.activeWords.length;

export default textbookSlice.reducer;
