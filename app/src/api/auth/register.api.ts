import { axiosInstance } from '@/api/_base/axiosInstance';

const URL_REGISTER = '/auth/register';

interface Userdata {
    username: string;
    email: string;
    password: string;
    rePassword: string;
}

export async function register({ username, email, password, rePassword }:Userdata) {
  const response = await axiosInstance.post(URL_REGISTER, {
    username,
    email,
    password,
    rePassword,
  });

  return response;
}