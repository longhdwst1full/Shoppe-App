import { type RegisterOptions, UseFormGetValues } from 'react-hook-form'

type Rules = { [key in 'email' | 'password' | 'confirm_password']?: RegisterOptions }
const getRules = (getValues?: UseFormGetValues<any>): Rules => ({
  email: {
    required: {
      value: true,
      message: 'Bạn chưa điền email'
    },
    pattern: {
      value: /^\S+@\S+\.\S+$/,
      message: 'Bạn điền sai định dạng email rồi'
    },
    maxLength: {
      value: 160,
      message: 'Độ dài từ 5-150 kí tự'
    },
    minLength: {
      value: 5,
      message: 'Đồ dài từ 5 -150 kí tự'
    }
  },
  password: {
    required: {
      value: true,
      message: 'Bạn chưa điền mật khẩu'
    },

    maxLength: {
      value: 160,
      message: 'Độ dài từ 5-150 kí tự'
    },
    minLength: {
      value: 5,
      message: 'Đồ dài từ 5 -150 kí tự'
    }
  },
  confirm_password: {
    required: {
      value: true,
      message: 'Nhập lại password là bắt buộc'
    },

    maxLength: {
      value: 160,
      message: 'Độ dài từ 5-150 kí tự'
    },
    minLength: {
      value: 5,
      message: 'Đồ dài từ 5 -150 kí tự'
    },
    validate:
      typeof getValues === 'function'
        ? (value) => value === getValues('password') || 'Nhập lại password không khớp '
        : undefined
  }
})
export default getRules
