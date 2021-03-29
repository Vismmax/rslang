import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import sideBarReducer from '../components/SideBar/sideBarSlice';
import gameReducer from '../components/Games/gameSlice';
import userReducer from '../components/LoginPage/userSlice';
import notificationReducer from '../components/common/Notification/notificationSlice';
import routeReducer from '../components/Routes/routeSlice';
import settingsReducer from '../components/SettingsPage/settingsSlice';
import savannahReducer from '../components/Games/SavannahPage/savannahSlice';

export const store = configureStore({
  reducer: {
    sideBar: sideBarReducer,
    user: userReducer,
    notification: notificationReducer,
    route: routeReducer,
    settings: settingsReducer,
    game: gameReducer,
    savannah: savannahReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
