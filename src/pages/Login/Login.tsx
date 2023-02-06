import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import Input from 'src/components/Input'
import {getRules} from 'src/utils/rules'

export default function Login() {
  interface FormData {
    email: string
    password: string
    confirm_password: string
  }
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors }
  } = useForm<FormData>()
  const rules = getRules()
  const onSubmit = handleSubmit((data) => {
    // console.log(data))
  })
  // console.log('err ', errors)
  return (
    <div className='bg-orange'>
      <div className='container'>
        <div className='grid grid-cols-1 lg:grid-cols-5 py-12 lg:py-32 lg:pr-10'>
          <div className='lg:col-span-2 lg:col-start-4'>
            <form className='p-10 rounded bg-white shadow-sm' onSubmit={onSubmit}>
              <div className='text-2xl'>Đăng nhập</div>
              <Input
                placeholder='Email'
                type='email'
                className='mt-8'
                register={register}
                errorMessage={errors.email?.message}
                name='email'
                rules={rules.email}
              />
              <Input
                placeholder='Password'
                type='password'
                className='mt-2'
                register={register}
                errorMessage={errors.password?.message}
                name='password'
                autoComplete='on'
                rules={rules.password}
              />

              <div className='mt-2'>
                <button className='w-full text-center py-4 px-2 uppercase bg-red-500 text-white text-sm hover:bg-red-600'>
                  Đăng nhập
                </button>
              </div>
              <div className='flex items-center justify-center mt-8'>
                <span className='text-gray-400'>Bạn chưa có tài khoản?</span>
                <Link className='text-red-400 ml-1' to='/register'>
                  Đăng ký
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
