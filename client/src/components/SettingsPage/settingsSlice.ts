import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk, RootState } from '../../redux/store';
import { getRandomWordsByGroup } from '../../api/services/wordsService';
import {
  setIsLoading,
  setIsRunning,
  setLevel,
  setWords,
} from '../Games/gameSlice';
import {
  getLocalSettings,
  setLocalSettings,
} from '../../common/helpers/localSettings';
import { getLocalUserId } from '../../common/helpers/userHelper';
import { getSettings, putSettings } from '../../api/services/settingService';
import { showNotificationError } from '../common/Notification/notificationSlice';

export interface ISettingsTextbook {
  showTranslate: boolean;
  showButtons: boolean;
}
export interface ISettingsSavannah {
  timeWord: number;
  countError: number;
  countVariants?: number;
}
export interface ISettingsAudioChallenge {
  timeWord: number;
  countError: number;
}
export interface ISettingsSprint {
  timeWord: number;
  countError: number;
}
export interface ISettingsFindCouple {
  timeWord: number;
  countError: number;
}
export type ISettings =
  | ISettingsSavannah
  | ISettingsAudioChallenge
  | ISettingsSprint
  | ISettingsFindCouple
  | ISettingsTextbook;

export interface IOneSettings {
  nameSettings: string;
  settings: ISettings;
}

export interface ISettingsState {
  textbook: ISettingsTextbook;
  savannah: ISettingsSavannah;
  audioChallenge: ISettingsAudioChallenge;
  sprint: ISettingsSprint;
  findCouple: ISettingsFindCouple;
}

const initialState: ISettingsState = {
  textbook: {
    showTranslate: true,
    showButtons: true,
  },
  savannah: {
    timeWord: 5,
    countError: 5,
    countVariants: 4,
  },
  audioChallenge: {
    timeWord: 5,
    countError: 5,
  },
  sprint: {
    timeWord: 5,
    countError: 5,
  },
  findCouple: {
    timeWord: 5,
    countError: 5,
  },
};

export const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    setSettings: (state, action: PayloadAction<IOneSettings>) => {
      // @ts-ignore
      state[action.payload.nameSettings] = action.payload.settings;
    },
    setAllSettings: (state, action: PayloadAction<ISettingsState>) => {
      return action.payload;
    },
    // setSettingsTextbook: (state, action: PayloadAction<ISettingsTextbook>) => {
    //   state.textbook = action.payload;
    // },
    // setSettingsSavannah: (state, action: PayloadAction<ISettingsSavannah>) => {
    //   state.savannah = action.payload;
    // },
    // setSettingsAudioChallenge: (
    //   state,
    //   action: PayloadAction<ISettingsAudioChallenge>,
    // ) => {
    //   state.audioChallenge = action.payload;
    // },
    // setSettingsSprint: (state, action: PayloadAction<ISettingsSprint>) => {
    //   state.sprint = action.payload;
    // },
    // setSettingsFindCouple: (
    //   state,
    //   action: PayloadAction<ISettingsFindCouple>,
    // ) => {
    //   state.findCouple = action.payload;
    // },
  },
});

export const {
  setSettings,
  setAllSettings,
  // setSettingsTextbook,
  // setSettingsSavannah,
  // setSettingsAudioChallenge,
  // setSettingsSprint,
  // setSettingsFindCouple,
} = settingsSlice.actions;

export const saveSettings = (set: IOneSettings): AppThunk => async (
  dispatch,
  getState,
) => {
  dispatch(setSettings(set));
  const settings = getState().settings;
  setLocalSettings(settings);
  const userId = getLocalUserId();
  if (userId) {
    const res = await putSettings({ userId, settings });
    if (!res)
      dispatch(
        showNotificationError('Не удалось сохранить настройки на сервере'),
      );
  }
};

export const loadSettings = (): AppThunk => async (dispatch, getState) => {
  dispatch(setIsLoading(true));
  const localSettings = getLocalSettings() as ISettingsState | null;
  if (localSettings) dispatch(setAllSettings(localSettings));
  const userId = getLocalUserId();
  if (userId) {
    const settings = await getSettings(userId);
    if (settings) dispatch(setAllSettings(settings));
  }
  dispatch(setIsLoading(false));
};

export const settingsTextbook = (state: RootState) => state.settings.textbook;
export const settingsSavannah = (state: RootState) => state.settings.savannah;
export const settingsAudioChallenge = (state: RootState) =>
  state.settings.audioChallenge;
export const settingsSprint = (state: RootState) => state.settings.sprint;
export const settingsFindCouple = (state: RootState) =>
  state.settings.findCouple;

export default settingsSlice.reducer;
