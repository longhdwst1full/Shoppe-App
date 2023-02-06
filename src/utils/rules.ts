import { type RegisterOptions, UseFormGetValues } from 'react-hook-form'
import * as yup from 'yup'

type Rules = { [key in 'email' | 'password' | 'confirm_password']?: RegisterOptions }

export const getRules = (getValues?: UseFormGetValues<any>): Rules => ({
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

export const schema = yup.object({
  email: yup
    .string()
    .required('Email là bắt buộc')
    .email('Email không đúng định dạng ')
    .min(5, 'Dộ dài từ 5-160 kí tự ')
    .max(160, 'Độ dài từ 5 -160 kí tự '),
  password: yup
    .string()
    .required('Nhập vào password là bắt buộc ')
    .max(160, 'Độ dài từ 6-160 kí tự ')
    .min(6, 'Độ dài từ 6 -160 kí tự '),
  confirm_password: yup
    .string()
    .required('Nhập lại password là bắt buộc ')
    .min(6, 'Độ dài từ 6 -160 kí tự ')
    .max(160, 'Độ dài bắt buộc là từ 6-160 kí tự ')
    .oneOf([yup.ref('password')], 'Nhập lại password không khớp')
})

const loginSchema = schema.omit(['confirm_password'])
type LoginSchema = yup.InferType<typeof loginSchema>
export type Schema = yup.InferType<typeof schema>
