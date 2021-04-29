import webApi from '../webApiHelper';

const URL = '/users';

export interface RegUserRequest {
  name: string;
  email: string;
  password: string;
  avatar?: string;
}

export interface RegUserResponse {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  error?: any;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  message: string;
  token: string;
  refreshToken: string;
  userId: string;
  name: string;
  avatar: string;
  error?: any;
}

export interface GetUserResponse {
  id: string;
  name: string;
  email: string;
  avatar: string;
  error?: any;
}

export interface UpdateUserRequest {
  name?: string;
  email?: string;
  password?: string;
  avatar?: string;
}

export interface UpdateUserResponse {
  name: string;
  email: string;
  avatar: string;
  error?: any;
}

export interface DeleteUserResponse {
  error?: any;
}

export const registrationUserService = async (
  user: RegUserRequest,
): Promise<RegUserResponse> => {
  const newUser = (await webApi.post(URL, user)) as RegUserResponse;
  return newUser;
};

export const loginUserService = async (
  user: LoginRequest,
): Promise<LoginResponse> => {
  const loginUserData = (await webApi.post('/signin', user)) as LoginResponse;
  return loginUserData;
};

export const getUserService = async (id: string): Promise<GetUserResponse> => {
  const userData = (await webApi.get(`${URL}/${id}`)) as GetUserResponse;
  return userData;
};

export const updateUserService = async (
  userId: string,
  user: UpdateUserRequest,
): Promise<UpdateUserResponse> => {
  const userData = (await webApi.put(
    `${URL}/${userId}`,
    user,
  )) as UpdateUserResponse;
  return userData;
};

export const deleteUserService = async (
  id: string,
): Promise<DeleteUserResponse> => {
  const data = (await webApi.delete(`${URL}/${id}`)) as DeleteUserResponse;
  return data;
};
