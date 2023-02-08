type Roles = 'Admin' | 'User'
export interface User {
  _id: string
  roles: Roles[]
  email: string
  name: string
  date_of_birth: null
  addresss: string
  phone: string
  createdAt: string
  updatedAt: string
}
