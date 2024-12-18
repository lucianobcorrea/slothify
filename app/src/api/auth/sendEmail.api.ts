import { axiosInstance } from "@/api/_base/axiosInstance";

const URL_EMAIL = "/auth/reset-password/";

export async function sendEmail(email: string) {
  await axiosInstance.post(URL_EMAIL + email);
}
