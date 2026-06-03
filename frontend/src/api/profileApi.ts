import axiosInstance from "./axiosInstance";

export interface ProfilePayload {
  fullName: string;
  phone: string;
  address: string;
  department: string;
}

export interface ProfileResponse {
  fullName: string;
  phone: string;
  address: string;
  department: string;
}

export const saveProfile = async (
  data: ProfilePayload
): Promise<ProfileResponse> => {
  const response = await axiosInstance.post<ProfileResponse>(
    "/profile",
    data
  );
  return response.data;
};