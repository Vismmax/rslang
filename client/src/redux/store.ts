import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import commonReducer from '../components/common/commonSlice';

export const store = configureStore({
  reducer: {
    common: commonReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
