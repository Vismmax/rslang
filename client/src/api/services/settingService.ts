import webApi from '../webApiHelper';
import { ISettingsState } from '../../components/SettingsPage/settingsSlice';

const URL = '/users';

export interface SettingsRequest {
  wordsPerDay: number;
  optional: ISettingsState;
}

export interface SettingsResponse {
  wordsPerDay: number;
  optional: ISettingsState;
  error?: any;
}

export const getSettings = async (
  userId: string,
): Promise<ISettingsState | null> => {
  const res = (await webApi.get(
    `${URL}/${userId}/settings`,
  )) as SettingsResponse;
  return res.error ? null : res.optional;
};

export const putSettings = async ({
  userId,
  settings,
}: {
  userId: string;
  settings: ISettingsState;
}): Promise<ISettingsState | null> => {
  const res = (await webApi.put(`${URL}/${userId}/settings`, {
    wordsPerDay: 1,
    optional: settings,
  })) as SettingsResponse;
  return res.error ? null : res.optional;
};
