import React, { useState, ChangeEvent, FormEvent } from 'react'
import { useHistory } from 'react-router-dom'
import {
  Container,
  ButtonContainer,
  Button,
  Title,
  Logo,
  Input,
  CheckboxContainer
} from './styles'
import { Icon } from '@iconify/react'
import tentCamp from '@iconify/icons-si-glyph/tent-camp'
import theme from '../../styles/theme'
import api from '../../services/api'
import { store } from 'react-notifications-component'

const Login: React.FC = () => {
  const history = useHistory()

  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [remember, setRemember] = useState<boolean>(false)

  const [loading, setLoading] = useState<boolean>(false)

  function handleLogin(e: FormEvent) {
    e.preventDefault()
    setLoading(true)
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
        setLoading(false)
        history.push('/')
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
        setLoading(false)
      })
  }

  return (
    <Container>
      <Logo>
        <Icon
          icon={tentCamp}
          style={{ color: theme.colors.primary, fontSize: '75px' }}
        />

        <Title>Anon Hid</Title>
      </Logo>
      <form onSubmit={(e: FormEvent) => handleLogin(e)}>
        <label htmlFor='email'>e-mail</label>
        <Input
          id='email'
          type='email'
          value={email}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setEmail(e.target.value)
          }
          placeholder='insira seu e-mail'
        />

        <label htmlFor='password'>senha</label>
        <Input
          id='password'
          type='password'
          value={password}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setPassword(e.target.value)
          }
          placeholder='insira sua senha'
        />

        <CheckboxContainer>
          <input
            checked={remember}
            id='check'
            type='checkbox'
            onChange={() => setRemember((prev) => !prev)}
          />
          <label htmlFor='check'>lembre-se de mim</label>
        </CheckboxContainer>

        <ButtonContainer>
          <Button onClick={() => history.push('/')} className='button'>
            Voltar
          </Button>
          <Button
            title={
              !email || !password ? 'Por favor preencha todos os dados.' : ''
            }
            disabled={!email || !password ? true : false}
            className={`button ${loading ? 'is-loading' : ''}`}
          >
            Logar-se
          </Button>
        </ButtonContainer>
      </form>
    </Container>
  )
}

export default Login
