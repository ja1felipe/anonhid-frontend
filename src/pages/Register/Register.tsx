import React, { useState, ChangeEvent, FormEvent, FocusEvent } from 'react'

import { useHistory, withRouter } from 'react-router-dom'

import {
  Container,
  ButtonContainer,
  Button,
  Title,
  Logo,
  Input
} from '../Login/styles'
import { Icon } from '@iconify/react'
import tentCamp from '@iconify/icons-si-glyph/tent-camp'
import theme from '../../styles/theme'
import { register } from '../../services/api'
import { store } from 'react-notifications-component'

const Register: React.FC = () => {
  const history = useHistory()

  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [password_again, setPasswordAgain] = useState<string>('')

  const [warn, setWarn] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)

  async function handleRegister(e: FormEvent) {
    e.preventDefault()
    setLoading(true)
    if (password_again !== password) {
      store.addNotification({
        title: 'Falha!',
        message: 'As duas senhas precisam ser indênticas!',
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
      setPassword('')
      setPasswordAgain('')
      setLoading(false)
    } else {
      register(email, password).then((res) => {
        if (res.register) {
          history.push('/')
        }
        setLoading(false)
      })
    }
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
      <form onSubmit={(e: FormEvent) => handleRegister(e)}>
        <label htmlFor='email'>e-mail</label>
        <Input
          value={email}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setEmail(e.target.value)
          }
          id='email'
          type='email'
          placeholder='insira seu e-mail'
        />

        <label htmlFor='password'>senha</label>
        <p>{warn}</p>
        <Input
          value={password}
          onBlur={(e: FocusEvent<HTMLInputElement>) =>
            e.target.value.length < 8
              ? setWarn('A senha deve possuir mais de 8 caracteres.')
              : setWarn('')
          }
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setPassword(e.target.value)
          }
          id='password'
          type='password'
          placeholder='insira sua senha'
        />

        <label htmlFor='password_again'>confirme sua senha</label>
        <Input
          value={password_again}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setPasswordAgain(e.target.value)
          }
          id='password_again'
          type='password'
          placeholder='insira sua senha novamente'
        />

        <ButtonContainer>
          <Button
            type='button'
            onClick={() => history.push('/')}
            className='button'
          >
            Voltar
          </Button>
          <Button
            type='submit'
            className={`button ${loading ? 'is-loading' : ''}`}
            title={
              warn || !email || !password_again || !password
                ? 'Por favor preencha todos os dados.'
                : ''
            }
            disabled={
              warn || !email || !password_again || !password ? true : false
            }
          >
            Cadastrar-se
          </Button>
        </ButtonContainer>
      </form>
    </Container>
  )
}

export default withRouter(Register)
