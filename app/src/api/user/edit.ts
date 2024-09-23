import { axiosInstance } from "@/api/_base/axiosInstance";

const URL_EDIT_USER = "/user/edit";

interface EditFormData  {
  username: string;
  avatar?: FileList;
  banner?: FileList;
}

export async function edit(formData: EditFormData) {
  const response = await axiosInstance.patch(URL_EDIT_USER, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
}
