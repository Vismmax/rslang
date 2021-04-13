import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { AppThunk, RootState } from '../../redux/store';
import { setIsLoading } from '../Games/gameSlice';
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
  countVariants: number;
  langWordEn: boolean;
}
export interface ISettingsAudioChallenge {
  countWords: number;
  countVariants: number;
  showTranslate: boolean;
  langWordEn: boolean;
}
export interface ISettingsSprint {
  timeGame: number;
  showHelp: boolean;
  langWordEn: boolean;
}
export interface ISettingsDesigner {
  countWords: number;
  showTranslate: boolean;
  langWordEn: boolean;
}
export type ISettings =
  | ISettingsSavannah
  | ISettingsAudioChallenge
  | ISettingsSprint
  | ISettingsDesigner
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
  designer: ISettingsDesigner;
}

const initialState: ISettingsState = {
  textbook: {
    showTranslate: true,
    showButtons: true,
  },
  savannah: {
    timeWord: 10,
    countError: 5,
    countVariants: 4,
    langWordEn: true,
  },
  audioChallenge: {
    countWords: 10,
    countVariants: 5,
    showTranslate: true,
    langWordEn: true,
  },
  sprint: {
    timeGame: 60,
    showHelp: false,
    langWordEn: true,
  },
  designer: {
    countWords: 10,
    showTranslate: true,
    langWordEn: true,
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
  },
});

export const { setSettings, setAllSettings } = settingsSlice.actions;

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
export const settingsDesigner = (state: RootState) => state.settings.designer;
export const settingsGame = (state: RootState) => state.settings;

export default settingsSlice.reducer;
