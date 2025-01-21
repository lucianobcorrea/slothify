import { axiosInstance } from "@/api/_base/axiosInstance";

const EDIT_CHALLENGE = "admin/challenge/edit/";

export async function edit(id : number) {
    const response = await axiosInstance.get(EDIT_CHALLENGE + id);
    return response.data;
}