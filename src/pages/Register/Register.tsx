import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import Input from 'src/components/Input'
import { yupResolver } from '@hookform/resolvers/yup'
import { schema, Schema } from 'src/utils/rules'
import { useMutation } from '@tanstack/react-query'
import authApi from 'src/apis/auth.api'

// Không có tính năng tree-shaking
// import { omit } from 'lodash'

// Import chỉ mỗi function omit
import omit from 'lodash/omit'

import { isAxiosUnprocessableEntityError } from 'src/utils/utils'
import { ErrorReponse } from 'src/types/utils.type'
import { AppContext } from 'src/contexts/app.context'
import { useContext } from 'react'
import Button from 'src/components/Button'
import path from 'src/constants/path'

type FormData = Pick<Schema, 'email' | 'password' | 'confirm_password'>
const registerSchema = schema.pick(['email', 'password', 'confirm_password'])

export default function Register() {
  const { setIsAuthenticated, setProfile } = useContext(AppContext)
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors }
  } = useForm<FormData>({
    resolver: yupResolver(registerSchema)
  })

  // const rules = getRules(getValues)
  const registerAccountMutation = useMutation({
    mutationFn: (body: Omit<FormData, 'confirm_password'>) => authApi.registerAccount(body)
  })

  const onSubmit = handleSubmit((data) => {
    const body = omit(data, ['confirm_password'])
    registerAccountMutation.mutate(body, {
      onSuccess: (data) => {
        setProfile(data.data.data.user)
        setIsAuthenticated(true)
        navigate('/')
      },
      onError: (error) => {
        console.log(error)
        if (isAxiosUnprocessableEntityError<ErrorReponse<Omit<FormData, 'confirm_password'>>>(error)) {
          const formError = error.response?.data.data

          // check kiểm tra lỗi
          // Cách 1
          if (formError) {
            Object.keys(formError).forEach((key) => {
              console.log(key)
              setError(key as keyof Omit<FormData, 'confirm_password'>, {
                message: formError[key as keyof Omit<FormData, 'confirm_password'>],
                type: 'Sever'
              })
            })
          }
          // cách 2
          // if (formError?.email) {
          //   setError('email', {
          //     message: formError.email,
          //     type: 'Server'
          //   })
          // }

          // if (formError?.password) {
          //   setError('password', {
          //     message: formError.password,
          //     type: 'Server'
          //   })
          // }

          // setError('')
        }
      }
    })
  })
  /**
   * watch :xem dữ liệu nhập vào của 1 trường nếu truyền name input vào còn k thì lắng nghe toàn form và nó làm re-render lại toàn form
   * getValues: k làm re-render lại toàn form chỉ re-render khi truyền name input cần lắng nghe cần get value so sánh
   */
  // console.log('err ', errors)
  // const email= watch("password")
  return (
    <div className='bg-orange'>
      <div className='container'>
        <div className='grid grid-cols-1 py-12 lg:grid-cols-5 lg:py-32 lg:pr-10'>
          <div className='lg:col-span-2 lg:col-start-4'>
            <form className='rounded bg-white p-10 shadow-sm' noValidate onSubmit={onSubmit}>
              <div className='text-2xl'>Đăng ký</div>
              <Input
                name='email'
                placeholder='Email ...'
                className='mt-8'
                type='email'
                register={register}
                errorMessage={errors.email?.message}
              />
              <Input
                name='password'
                placeholder='Password ...'
                className='mt-2'
                type='password'
                autoComplete='on'
                register={register}
                errorMessage={errors.password?.message}
              />
              <Input
                name='confirm_password'
                placeholder='Confirm Password ...'
                className='mt-2'
                type='password'
                autoComplete='on'
                register={register}
                errorMessage={errors.confirm_password?.message}
              />

              <div className='mt-2'>
                <Button
                  className='flex w-full items-center justify-center bg-red-500 py-4 px-2 text-sm uppercase text-white hover:bg-red-600'
                  isLoading={registerAccountMutation.isLoading}
                  disabled={registerAccountMutation.isLoading}
                >
                  Đăng ký
                </Button>
              </div>
              <div className='mt-8 flex items-center justify-center'>
                <span className='text-gray-400'>Bạn đã có tài khoản?</span>
                <Link className='ml-1 text-red-400' to={path.login}>
                  Đăng nhập
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
