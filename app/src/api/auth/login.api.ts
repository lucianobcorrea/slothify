import { axiosInstance } from '@/api/_base/axiosInstance';

const URL_LOGIN = '/auth/login';

interface UserData {
    email: string;
    password: string;
}

interface LoginResponse {
  token: string;
}

export async function login({ email, password }: UserData): Promise<string> {
  const response = await axiosInstance.post<LoginResponse>(URL_LOGIN, {
    email,
    password,
  });
  return response.data.token;
}