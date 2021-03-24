import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk, RootState } from '../../../redux/store';

interface INotification {
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
}

interface NotificationState extends INotification {
  open: boolean;
}

const initialState: NotificationState = {
  open: false,
  message: '',
  type: 'info',
};

export const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    setOpen: (state, action: PayloadAction<boolean>) => {
      state.open = action.payload;
    },
    show: (state, action: PayloadAction<INotification>) => {
      state.message = action.payload.message;
      state.type = action.payload.type;
      state.open = true;
    },
  },
});

export const { setOpen, show } = notificationSlice.actions;

export const showNotification = (
  notification: INotification,
): AppThunk => async (dispatch) => {
  dispatch(setOpen(false));
  dispatch(show(notification));
};

export const showNotificationInfo = (message: string): AppThunk => async (
  dispatch,
) => {
  dispatch(showNotification({ type: 'info', message }));
};

export const showNotificationSuccess = (message: string): AppThunk => async (
  dispatch,
) => {
  dispatch(showNotification({ type: 'success', message }));
};

export const showNotificationWarning = (message: string): AppThunk => async (
  dispatch,
) => {
  dispatch(showNotification({ type: 'warning', message }));
};

export const showNotificationError = (message: string): AppThunk => async (
  dispatch,
) => {
  dispatch(showNotification({ type: 'error', message }));
};

export const isOpenNotification = (state: RootState) => state.notification.open;
export const messageNotification = (state: RootState) =>
  state.notification.message;
export const typeNotification = (state: RootState) => state.notification.type;

export default notificationSlice.reducer;
