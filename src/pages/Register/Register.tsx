import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import Input from 'src/components/Input'
import { yupResolver } from '@hookform/resolvers/yup'
import { getRules, schema, Schema } from 'src/utils/rules'
import { useMutation } from '@tanstack/react-query'
import { registerAccount } from 'src/apis/auth.api'
import { omit } from 'lodash'

type FormData = Schema
export default function Register() {
  const {
    register,
    handleSubmit,

    formState: { errors }
  } = useForm<FormData>({
    resolver: yupResolver(schema)
  })

  // const rules = getRules(getValues)
  const registerAccountMutation = useMutation({
    mutationFn: (body: Omit<FormData, 'confirm_password'>) => registerAccount(body)
  })

  const onSubmit = handleSubmit((data) => {
    const body = omit(data, ['confirm_password'])
    registerAccountMutation.mutate(body, {
      onSuccess: (data) => {
        console.log(data)
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
        <div className='grid grid-cols-1 lg:grid-cols-5 py-12 lg:py-32 lg:pr-10'>
          <div className='lg:col-span-2 lg:col-start-4'>
            <form className='p-10 rounded bg-white shadow-sm' noValidate onSubmit={onSubmit}>
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
                <button className='w-full text-center py-4 px-2 uppercase bg-red-500 text-white text-sm hover:bg-red-600'>
                  Đăng ký
                </button>
              </div>
              <div className='flex items-center justify-center mt-8'>
                <span className='text-gray-400'>Bạn đã có tài khoản?</span>
                <Link className='text-red-400 ml-1' to='/login'>
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
