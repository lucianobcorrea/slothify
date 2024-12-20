import { axiosInstance } from "@/api/_base/axiosInstance";

const URL_CHANGE_PASSWORD = "/auth/reset-password";

interface ChangePasswordRequest {
  email: string;
  userId: number;
  token: string;
  password: string;
  rePassword: string;
}

export async function resetPassword({
  email,
  userId,
  token,
  password,
  rePassword,
}: ChangePasswordRequest) {
  await axiosInstance.patch(URL_CHANGE_PASSWORD, {
    email,
    userId,
    token,
    password,
    rePassword,
  });
}
