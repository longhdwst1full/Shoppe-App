import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import Input from 'src/components/Input'
import getRules from 'src/utils/rules'

interface FormData {
  email: string
  password: string
  confirm_password: string
}
export default function Register() {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors }
  } = useForm<FormData>()
  const rules = getRules(getValues)
  const onSubmit = handleSubmit(
    (data) => {
      console.log(data)
    },
    (data) => {
      const password = getValues('password')
      console.log(password)
    }
  )
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
                rules={rules.email}
                className='mt-8'
                type='email'
                register={register}
                errorMessage={errors.email?.message}
              />
              <Input
                name='password'
                placeholder='Password ...'
                rules={rules.password}
                className='mt-2'
                type='password'
                autoComplete='on'
                register={register}
                errorMessage={errors.password?.message}
              />
              <Input
                name='confirm_password'
                placeholder='Confirm Password ...'
                rules={rules.confirm_password}
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
