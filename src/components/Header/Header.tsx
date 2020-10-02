import React from 'react'

import { Container, LogoBox, Title, Button } from './styles'
import { Icon } from '@iconify/react'
import tentCamp from '@iconify/icons-si-glyph/tent-camp'
import theme from '../../styles/theme'
import { isLogged, logout } from '../../utils/Auth'
import { useHistory } from 'react-router-dom'

const Header: React.FC = () => {
  const logged = isLogged()
  const history = useHistory()
  function handleLogout() {
    logout()
    window.location.reload()
  }
  return (
    <Container>
      <LogoBox>
        <Icon
          icon={tentCamp}
          style={{ color: theme.colors.primary, fontSize: '50px' }}
        />
        <Title>Anon Hid</Title>
      </LogoBox>

      {!logged ? (
        <div>
          <Button onClick={() => history.push('/register')} className='button'>
            Cadastre-se
          </Button>
          <Button onClick={() => history.push('/login')} className='button'>
            Login
          </Button>
        </div>
      ) : (
        <Button onClick={handleLogout} className='button'>
          Sair
        </Button>
      )}
    </Container>
  )
}

export default Header
