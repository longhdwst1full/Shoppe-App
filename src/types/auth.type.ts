import { User } from './user.type'
import { ResponseApi } from './utils.type'

export type AuthResponse = ResponseApi<{
  accessToken: string
  expires: string
  user: User
}>
