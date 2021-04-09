import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk, RootState } from '../../redux/store';
import {
  deleteUserService,
  getUserService,
  LoginRequest,
  loginUserService,
  registrationUserService,
  RegUserRequest,
  UpdateUserRequest,
  updateUserService,
} from '../../api/services/userService';
import {
  clearAllTokens,
  setRefreshToken,
  setToken,
} from '../../common/helpers/tokenHelper';
import {
  clearLocalAllUserData,
  getLocalUserId,
  setLocalUserId,
} from '../../common/helpers/userHelper';
import {
  showNotificationError,
  showNotificationSuccess,
} from '../common/Notification/notificationSlice';
import { clearLocalSettings } from '../../common/helpers/localSettings';
import { clearCurrentGroupPage } from '../../common/helpers/localCurrentPage';
import { clearDictionaryDifficultyPage } from '../../common/helpers/localDictionaryPage';
import {
  clearStatistics,
  loadStatistics,
} from '../StatisticsPage/statisticsSlice';
import { loadSettings } from '../SettingsPage/settingsSlice';
import { loadActivePage } from '../TextbookPage/textbookSlice';
import { loadDictionaryPage } from '../DictionaryPage/dictionarySlice';

interface User {
  userId: string;
  name: string;
  email: string;
  avatar: string;
}

interface UserState {
  isLoading: boolean;
  user: User;
}

const initialState: UserState = {
  isLoading: false,
  user: {
    userId: '',
    name: '',
    email: '',
    avatar: '',
  },
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
  },
});

export const { setIsLoading, setUser } = userSlice.actions;

export const registrationUser = (user: RegUserRequest): AppThunk => async (
  dispatch,
) => {
  dispatch(setIsLoading(true));
  const newUser = await registrationUserService(user);
  console.log('newUser: ', newUser);
  if (newUser.error) {
    console.log('Регистрация не удалась');
    dispatch(showNotificationError('Регистрация не удалась'));
    dispatch(setIsLoading(false));
    return;
  }
  dispatch(showNotificationSuccess('Регистрация прошла успешно'));
  dispatch(loginUser({ email: user.email, password: user.password }));
};

export const loginUser = (user: LoginRequest): AppThunk => async (dispatch) => {
  dispatch(setIsLoading(true));
  const loginUser = await loginUserService(user);
  console.log('loginUser: ', loginUser);

  if (loginUser.message !== 'Authenticated') {
    if (loginUser.error === 'Forbidden') {
      console.log('Неверные данные');
      dispatch(showNotificationError('Вход не удался. Неверные данные'));
    }
    if (loginUser.error === '') {
      console.log('Сервер не отвечает');
      dispatch(showNotificationError('Вход не удался. Сервер не отвечает'));
    }
    dispatch(setIsLoading(false));
    return;
  }

  setToken(loginUser.token);
  setRefreshToken(loginUser.refreshToken);
  setLocalUserId(loginUser.userId);

  const { userId, name, avatar } = { ...loginUser };
  dispatch(setUser({ userId, name, avatar, email: user.email }));
  dispatch(setIsLoading(false));
  // dispatch(loadActivePage());
  // dispatch(loadDictionaryPage());
  dispatch(loadSettings());
  dispatch(loadStatistics());
};

export const logoutUser = (): AppThunk => async (dispatch) => {
  clearAllTokens();
  clearLocalAllUserData();
  clearLocalSettings();
  clearCurrentGroupPage();
  clearDictionaryDifficultyPage();
  dispatch(clearStatistics());
  dispatch(setUser({ userId: '', name: '', avatar: '', email: '' }));
};

export const getUser = (): AppThunk => async (dispatch) => {
  dispatch(setIsLoading(true));
  const userId = getLocalUserId();
  if (!userId) {
    dispatch(setIsLoading(false));
    return;
  }
  const userData = await getUserService(userId);
  if (userData.error) {
    dispatch(setIsLoading(false));
    return;
  }
  const { name, avatar, email } = { ...userData };
  dispatch(setUser({ userId, name, avatar, email }));
  dispatch(setIsLoading(false));
};

export const updateUser = (user: UpdateUserRequest): AppThunk => async (
  dispatch,
) => {
  dispatch(setIsLoading(true));
  const userId = getLocalUserId();
  if (!userId) {
    dispatch(setIsLoading(false));
    return;
  }
  const userData = await updateUserService(userId, user);
  if (userData.error) {
    console.log('Данные пользователя не обновлены');
    dispatch(showNotificationError('Данные пользователя не обновлены'));
  }
  const { name, avatar, email } = { ...userData };
  dispatch(setUser({ userId, name, avatar, email }));
  dispatch(showNotificationSuccess('Данные пользователя обновлены'));
  dispatch(setIsLoading(false));
};

export const deleteUser = (): AppThunk => async (dispatch) => {
  dispatch(setIsLoading(true));
  const userId = getLocalUserId();
  if (!userId) {
    dispatch(setIsLoading(false));
    return;
  }
  const data = await deleteUserService(userId);
  if (data.error) {
    console.log('Пользователь не удален');
    dispatch(showNotificationError('Пользователь не удален'));
  }
  dispatch(logoutUser());
  dispatch(showNotificationSuccess('Пользователь удален'));
  dispatch(setIsLoading(false));
};

export const isLoadingStore = (state: RootState) => state.user.isLoading;
export const userStore = (state: RootState) => state.user.user;

export default userSlice.reducer;
