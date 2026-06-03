import axiosInstance from "./axiosInstance"
import type { User, CreateUserPayload } from "../types"

// GET all users
export const getUsers = async (): Promise<User[]> => {
  const response = await axiosInstance.get<User[]>("/users")
  return response.data
}

// GET single user by id
export const getUserById = async (id: number): Promise<User> => {
  const response = await axiosInstance.get<User>(`/users/${id}`)
  return response.data
}

// POST create new user
export const createUser = async (payload: CreateUserPayload): Promise<User> => {
  const response = await axiosInstance.post<User>("/users", payload)
  return response.data
}

// PUT update user
export const updateUser = async (id: number, payload: Partial<CreateUserPayload>): Promise<User> => {
  const response = await axiosInstance.put<User>(`/users/${id}`, payload)
  return response.data
}

// DELETE user
export const deleteUser = async (id: number): Promise<void> => {
  await axiosInstance.delete(`/users/${id}`)
}