import axios, { AxiosError, type AxiosInstance } from 'axios'
import { toast } from 'react-toastify'
import config from 'src/constants/config'
import HttpStatusCode from 'src/constants/httpStatusCode.enum'
import path from 'src/constants/path'
import { AuthResponse } from 'src/types/auth.type'
import { clearLS, getAccessTokenFromLS, setAccesTokenToLS, setProfileToLS } from './auth'

class Http {
  instance: AxiosInstance
  private accessToken: string
  constructor() {
    this.accessToken = getAccessTokenFromLS()
    this.instance = axios.create({
      baseURL: config.baseUrl,
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json'
      }
    })
    // Thêm một bộ đón chặn response
    this.instance.interceptors.request.use(
      (config) => {
        if (this.accessToken && config.headers) {
          config.headers.authorization = this.accessToken

          return config
        }
        return config
      },
      (errors) => {
        return Promise.reject(errors)
      }
    )

    this.instance.interceptors.response.use(
      (response) => {
        const { url } = response.config
        if (url === path.login || url === path.register) {
          const data = response.data as AuthResponse
          this.accessToken = data.data.access_token
          setAccesTokenToLS(this.accessToken)
          setProfileToLS(data.data.user)
        } else if (url === path.logout) {
          this.accessToken = ''
          clearLS()
        }
        // Bất kì mã trạng thái nào nằm trong tầm 2xx đều khiến hàm này được trigger
        // Làm gì đó với dữ liệu response
        return response
      },
      function (error: AxiosError) {
        // Bất kì mã trạng thái nào lọt ra ngoài tầm 2xx đều khiến hàm này được trigger\
        // Làm gì đó với lỗi response
        if (error.response?.status !== HttpStatusCode.UnprocessableEntity) {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const data: any | undefined = error.response?.data
          const message = data?.message || error.message
          toast.error(message)
        }

        if (error.response?.status === HttpStatusCode.Unauthorized) {
          clearLS()
          // window.location.reload()
        }
        return Promise.reject(error)
      }
    )
  }
}

const http = new Http().instance
export default http
