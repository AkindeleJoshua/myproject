export interface User {
  id: number
  name: string
  email: string
  created_at?: string
}

export interface CreateUserPayload {
  name: string
  email: string
}

export interface ApiResponse<T> {
  data: T
  message: string
}