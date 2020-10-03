import axios from 'axios'
import { store } from 'react-notifications-component'
import { ILogin, IPosts, IRegister, IUser } from '../types/types'
import { isLogged } from '../utils/Auth'
import userLogged from '../utils/User'

const api = axios.create({ baseURL: 'http://localhost:3333' })

const login = async (
  email: string,
  password: string,
  remember: boolean
): Promise<ILogin> => {
  return new Promise((resolve, reject) => {
    api
      .post('/auth', {
        email,
        password
      })
      .then((res) => {
        if (remember) {
          localStorage.setItem('token', res.data.token)
          localStorage.setItem('user', JSON.stringify(res.data.user))
        } else {
          sessionStorage.setItem('token', res.data.token)
          sessionStorage.setItem('user', JSON.stringify(res.data.user))
        }
        store.addNotification({
          title: 'Sucesso!',
          message: 'Bem vindo a comunidade Anon Hid.',
          type: 'success',
          insert: 'top',
          container: 'top-right',
          animationIn: ['animate__animated', 'animate__fadeIn'],
          animationOut: ['animate__animated', 'animate__fadeOut'],
          dismiss: {
            duration: 6000,
            onScreen: true
          }
        })
        resolve({ login: true })
      })
      .catch((error) => {
        store.addNotification({
          title: 'Falha!',
          message: error.response ? error.response.data.message : error.message,
          type: 'danger',
          insert: 'top',
          container: 'top-right',
          animationIn: ['animate__animated', 'animate__fadeIn'],
          animationOut: ['animate__animated', 'animate__fadeOut'],
          dismiss: {
            duration: 3000,
            onScreen: true
          }
        })
        resolve({ login: false })
      })
  })
}

const register = async (
  email: string,
  password: string
): Promise<IRegister> => {
  return new Promise((resolve, reject) => {
    api
      .post('/user', {
        email,
        password
      })
      .then(() => {
        store.addNotification({
          title: 'Sucesso!',
          message:
            'Usuário cadastrado com sucesso, enviamos um link de confirmação para o seu e-mail, por favor, confirme-o antes de logar.',
          type: 'success',
          insert: 'top',
          container: 'top-right',
          animationIn: ['animate__animated', 'animate__fadeIn'],
          animationOut: ['animate__animated', 'animate__fadeOut'],
          dismiss: {
            duration: 6000,
            onScreen: true
          }
        })
        resolve({ register: true })
      })
      .catch((error) => {
        console.log(error.response)
        store.addNotification({
          title: 'Falha!',
          message: error.response ? error.response.data.error : error.message,
          type: 'danger',
          insert: 'top',
          container: 'top-right',
          animationIn: ['animate__animated', 'animate__fadeIn'],
          animationOut: ['animate__animated', 'animate__fadeOut'],
          dismiss: {
            duration: 3000,
            onScreen: true
          }
        })
        resolve({ register: false })
      })
  })
}

const getPosts = async (query: string, page: number): Promise<IPosts[]> => {
  return new Promise((resolve, reject) => {
    api
      .get(`/post?query=${query}&page=${page}&limit=10`)
      .then((res) => {
        resolve(res.data.posts)
      })
      .catch((error) => {
        console.log(error.response)
        store.addNotification({
          title: 'Falha!',
          message: error.response ? error.response.data.error : error.message,
          type: 'danger',
          insert: 'top',
          container: 'top-right',
          animationIn: ['animate__animated', 'animate__fadeIn'],
          animationOut: ['animate__animated', 'animate__fadeOut'],
          dismiss: {
            duration: 3000,
            onScreen: true
          }
        })
      })
  })
}

const getUserPosts = async (page: number): Promise<IPosts[]> => {
  return new Promise((resolve, reject) => {
    api
      .get(`/post/user?page=${page}&limit=10`, {
        headers: {
          Authorization: isLogged()
        }
      })
      .then((res) => {
        resolve(res.data.posts)
      })
      .catch((error) => {
        console.log(error.response)
        store.addNotification({
          title: 'Falha!',
          message: error.response ? error.response.data.error : error.message,
          type: 'danger',
          insert: 'top',
          container: 'top-right',
          animationIn: ['animate__animated', 'animate__fadeIn'],
          animationOut: ['animate__animated', 'animate__fadeOut'],
          dismiss: {
            duration: 3000,
            onScreen: true
          }
        })
      })
  })
}

const likeDeslike = async (id: string): Promise<boolean> => {
  return new Promise(async (resolve, reject) => {
    api
      .get(`/post/like/${id}`, {
        headers: {
          Authorization: isLogged()
        }
      })
      .then((res) => {
        const user: IUser = userLogged() ? JSON.parse(userLogged()) : ''
        if (res.data.message === 'Like') {
          user.likes.push(res.data.post._id)
          if (localStorage.getItem('user')) {
            localStorage.setItem('user', JSON.stringify(user))
          } else {
            sessionStorage.setItem('user', JSON.stringify(user))
          }
          resolve(true)
        } else {
          let index = user.likes.indexOf(res.data.post._id)
          user.likes.splice(index, 1)
          if (localStorage.getItem('user')) {
            localStorage.setItem('user', JSON.stringify(user))
          } else {
            sessionStorage.setItem('user', JSON.stringify(user))
          }
          resolve(false)
        }
      })
  })
}

const addComment = async (id: string, comment: string): Promise<IPosts> => {
  return new Promise(async (resolve, reject) => {
    api
      .post(
        `/post/commentary/${id}`,
        {
          comment: comment
        },
        {
          headers: {
            Authorization: isLogged()
          }
        }
      )
      .then((res) => {
        resolve(res.data.post)
      })
      .catch((error) => {
        store.addNotification({
          title: 'Falha!',
          message: error.response ? error.response.data.error : error.message,
          type: 'danger',
          insert: 'top',
          container: 'top-right',
          animationIn: ['animate__animated', 'animate__fadeIn'],
          animationOut: ['animate__animated', 'animate__fadeOut'],
          dismiss: {
            duration: 3000,
            onScreen: true
          }
        })
      })
  })
}

const updatePost = async (id: string, data: FormData): Promise<IPosts> => {
  return new Promise(async (resolve, reject) => {
    api
      .put(`/post/${id}`, data, {
        headers: {
          Authorization: isLogged()
        }
      })
      .then((res) => {
        resolve(res.data.post)
      })
      .catch((error) => {
        store.addNotification({
          title: 'Falha!',
          message: error.response ? error.response.data.error : error.message,
          type: 'danger',
          insert: 'top',
          container: 'top-right',
          animationIn: ['animate__animated', 'animate__fadeIn'],
          animationOut: ['animate__animated', 'animate__fadeOut'],
          dismiss: {
            duration: 3000,
            onScreen: true
          }
        })
      })
  })
}

const createPost = async (data: FormData): Promise<IPosts> => {
  return new Promise(async (resolve, reject) => {
    api
      .post(`/post`, data, {
        headers: {
          Authorization: isLogged()
        }
      })
      .then((res) => {
        resolve(res.data.post)
      })
      .catch((error) => {
        console.log(error.response)
        store.addNotification({
          title: 'Falha!',
          message: error.response ? error.response.data.error : error.message,
          type: 'danger',
          insert: 'top',
          container: 'top-right',
          animationIn: ['animate__animated', 'animate__fadeIn'],
          animationOut: ['animate__animated', 'animate__fadeOut'],
          dismiss: {
            duration: 3000,
            onScreen: true
          }
        })
      })
  })
}

const deletePost = async (id: string): Promise<IPosts> => {
  return new Promise(async (resolve, reject) => {
    api
      .delete(`/post/${id}`, {
        headers: {
          Authorization: isLogged()
        }
      })
      .then((res) => {
        resolve(res.data.post)
      })
      .catch((error) => {
        store.addNotification({
          title: 'Falha!',
          message: error.response ? error.response.data.error : error.message,
          type: 'danger',
          insert: 'top',
          container: 'top-right',
          animationIn: ['animate__animated', 'animate__fadeIn'],
          animationOut: ['animate__animated', 'animate__fadeOut'],
          dismiss: {
            duration: 3000,
            onScreen: true
          }
        })
      })
  })
}

const validateAccount = async (token: string): Promise<IPosts> => {
  return new Promise(async (resolve, reject) => {
    api
      .post(`/auth/validate/${token}`, {
        headers: {
          Authorization: isLogged()
        }
      })
      .then((res) => {
        store.addNotification({
          title: 'Sucesso!',
          message: 'Email validado com sucesso.',
          type: 'success',
          insert: 'top',
          container: 'top-right',
          animationIn: ['animate__animated', 'animate__fadeIn'],
          animationOut: ['animate__animated', 'animate__fadeOut'],
          dismiss: {
            duration: 3000,
            onScreen: true
          }
        })
        resolve(res.data.user)
      })
      .catch((error) => {
        store.addNotification({
          title: 'Falha!',
          message: error.response ? error.response.data.error : error.message,
          type: 'danger',
          insert: 'top',
          container: 'top-right',
          animationIn: ['animate__animated', 'animate__fadeIn'],
          animationOut: ['animate__animated', 'animate__fadeOut'],
          dismiss: {
            duration: 3000,
            onScreen: true
          }
        })
      })
  })
}

export {
  login,
  getPosts,
  register,
  likeDeslike,
  getUserPosts,
  addComment,
  updatePost,
  createPost,
  deletePost,
  validateAccount
}
