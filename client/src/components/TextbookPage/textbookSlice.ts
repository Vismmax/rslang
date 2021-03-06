import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { AppThunk, RootState } from '../../redux/store';
import { IExtWord, IUserWord } from '../../common/interfaces/WordInterfaces';
import {
  createUserWord,
  getActiveWords,
  getActiveWordsByUser,
  getCountActiveWordsByGroup,
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
  countActiveWordsByGroup: number;
}

const initialState: TextbookState = {
  isLoading: false,
  idLoadingWord: '',
  activeWords: [],
  activeGroup: 0,
  activePage: 0,
  countActiveWordsByGroup: 0,
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
    setActiveGroup: (state, action: PayloadAction<number>) => {
      state.activeGroup = action.payload;
    },
    setActivePage: (state, action: PayloadAction<number>) => {
      state.activePage = action.payload;
    },
    setCountActiveWordsByGroup: (state, action: PayloadAction<number>) => {
      state.countActiveWordsByGroup = action.payload;
    },
  },
});

export const {
  setIsLoading,
  setActiveWords,
  setIdLoadingWord,
  setActiveGroup,
  setActivePage,
  setCountActiveWordsByGroup,
} = textbookSlice.actions;

export const fetchActiveWords = (): AppThunk => async (dispatch, getState) => {
  dispatch(setIsLoading(true));
  dispatch(fetchStatisticsGroup());
  const group = getState().textbook.activeGroup;
  const page = getState().textbook.activePage;
  const userId = getLocalUserId();
  if (userId) {
    const words = await getActiveWordsByUser({ userId, group, page });
    dispatch(setActiveWords(words));
  } else {
    const words = await getActiveWords({ group, page });
    dispatch(setActiveWords(words));
  }

  dispatch(setIsLoading(false));
  dispatch(setIdLoadingWord(''));
};

export const fetchStatisticsGroup = (): AppThunk => async (
  dispatch,
  getState,
) => {
  const group = getState().textbook.activeGroup;
  const userId = getLocalUserId();
  if (userId) {
    const count = await getCountActiveWordsByGroup({ userId, group });
    dispatch(setCountActiveWordsByGroup(count || 0));
  }
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
      dispatch(showNotificationError('???????????????????? ???????????????????? ????????????????'));
      dispatch(setIdLoadingWord(''));
      return;
    }
    dispatch(fetchActiveWords());
  }
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
export const activeStatistics = (state: RootState) => ({
  countWordsByGroup: state.textbook.countActiveWordsByGroup,
  countWordsByPage: state.textbook.activeWords.filter(
    (word) =>
      word.userWord.difficulty !== '' && word.userWord.difficulty !== 'delete',
  ).length,
});

export default textbookSlice.reducer;
