import path from 'src/constants/path'
import { AuthResponse } from 'src/types/auth.type'
import http from 'src/utils/http'

const authApi = {
  registerAccount(body: { email: string; password: string }) {
    return http.post<AuthResponse>(path.register, body)
  },

  login(body: { email: string; password: string }) {
    return http.post<AuthResponse>(path.login, body)
  },

  logout() {
    return http.post(path.logout)
  }
}

export default authApi
