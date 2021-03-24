import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import commonReducer from '../components/common/commonSlice';
import gameReducer from '../components/WrapGame/gameSlice';
import userReducer from '../components/LoginPage/userSlice';
import notificationReducer from '../components/common/Notification/notificationSlice';
import routeReducer from '../components/Routes/routeSlice';

export const store = configureStore({
  reducer: {
    common: commonReducer,
    game: gameReducer,
    user: userReducer,
    notification: notificationReducer,
    route: routeReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
