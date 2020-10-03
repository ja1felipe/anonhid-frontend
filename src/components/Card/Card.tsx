import React, { HTMLProps, MouseEvent, useState } from 'react'

import theme from '../../styles/theme'
import { CardBox, Picture, Container, InfosBox } from './styles'
import { Icon } from '@iconify/react'
import upCircleFilled from '@iconify/icons-ant-design/up-circle-filled'
import { likeDeslike } from '../../services/api'
import { isLogged } from '../../utils/Auth'
import { store } from 'react-notifications-component'

interface ICard extends HTMLProps<HTMLDivElement> {
  url: string
  likes: number
  comments: number
  id: string
  liked: boolean
}
const Card: React.FC<ICard> = (props) => {
  const [isLiked, setIsLiked] = useState<boolean>(props.liked)

  async function handleUpClick(e: MouseEvent) {
    e.stopPropagation()
    if (isLogged()) {
      await likeDeslike(props.id)
      setIsLiked(!isLiked)
    } else {
      store.addNotification({
        title: 'Falha!',
        message: 'Para da UP em uma imagem é preciso estar logado.',
        type: 'danger',
        insert: 'bottom',
        container: 'bottom-right',
        animationIn: ['animate__animated', 'animate__fadeIn'],
        animationOut: ['animate__animated', 'animate__fadeOut'],
        dismiss: {
          duration: 3000,
          onScreen: true
        }
      })
    }
  }
  return (
    <Container onClick={props.onClick}>
      <CardBox>
        <Picture url={props.url} />
      </CardBox>
      <InfosBox>
        <span onClick={(e: MouseEvent) => handleUpClick(e)}>
          <Icon
            icon={upCircleFilled}
            style={{
              color: isLiked ? theme.colors.primary : theme.colors.contrast,
              fontSize: '20px'
            }}
          />
          <span>UP</span>
        </span>
        <p>{props.comments} comentarios</p>
      </InfosBox>
    </Container>
  )
}

export default Card
