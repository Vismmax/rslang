import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import commonReducer from '../components/common/commonSlice';
import gameReducer from '../components/WrapGame/gameSlice';

export const store = configureStore({
  reducer: {
    common: commonReducer,
    game: gameReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
