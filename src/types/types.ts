export interface ILogin {
  login: boolean
}

export interface IRegister {
  register: boolean
}

export interface IPosts {
  comments: string[]
  likes: number
  _id: string
  owner: string
  image: string
  description: string
  createdAt: string
  updatedAt: string
  __v: number
  image_url: string
  id: string
}

export interface IUser {
  validated: boolean
  likes: string[]
  _id: string
  owner: string
  email: string
  createdAt: string
  updatedAt: string
  __v: number
}
