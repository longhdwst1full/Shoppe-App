import { useSearchParams } from 'react-router-dom'

const useQueryParam = () => {
  const [searchParams] = useSearchParams()
  return Object.fromEntries([...searchParams])
}

export default useQueryParam
