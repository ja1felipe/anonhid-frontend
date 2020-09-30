import React from 'react'

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

const pages: React.FC = () => {
  return (
    <Container>
      <Logo>
        <Icon
          icon={tentCamp}
          style={{ color: theme.colors.primary, fontSize: '75px' }}
        />

        <Title>Anon Hid</Title>
      </Logo>
      <form>
        <label htmlFor='email'>e-mail</label>
        <Input placeholder='insira seu e-mail' />

        <label htmlFor='email'>senha</label>
        <Input placeholder='insira sua senha' />

        <CheckboxContainer>
          <input type='checkbox' />
          <label htmlFor='email'>lembre-se de mim</label>
        </CheckboxContainer>

        <ButtonContainer>
          <Button className='button'>Voltar</Button>
          <Button className='button'>Logar-se</Button>
        </ButtonContainer>
      </form>
    </Container>
  )
}

export default pages
