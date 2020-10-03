import React, {
  ChangeEvent,
  HTMLProps,
  useEffect,
  useMemo,
  useState
} from 'react'
import { IPosts, IUser } from '../../types/types'

import {
  Header,
  Picture,
  InfosBox,
  Container,
  Description,
  ComentaryBox,
  Input,
  SendIcon,
  Button,
  Label
} from './styles'

import { Icon } from '@iconify/react'
import sendOutlined from '@iconify/icons-ant-design/send-outlined'
import settingFilled from '@iconify/icons-ant-design/setting-filled'
import saveFilled from '@iconify/icons-ant-design/save-filled'
import deleteFilled from '@iconify/icons-ant-design/delete-filled'

import theme from '../../styles/theme'
import {
  addComment,
  updatePost,
  createPost,
  deletePost
} from '../../services/api'
import { isLogged } from '../../utils/Auth'
import { store } from 'react-notifications-component'
import userLogged from '../../utils/User'
import camera from '../../assets/camera.svg'

interface IPostModal extends HTMLProps<HTMLDivElement> {
  editable: boolean
  handleModal: (show: boolean) => void
  post?: IPosts
  show: boolean
  updatePost: (post: IPosts) => void
  new: boolean
}

const PostModal: React.FC<IPostModal> = (props) => {
  const [editable, setEditable] = useState<boolean>(false)
  const [comment, setComment] = useState<string>('')
  const [description, setDescription] = useState<string>('')
  const [thumbnail, setThumbnail] = useState<Blob>()

  const user: IUser = userLogged() ? JSON.parse(userLogged()) : ''

  async function handleAddCommentary() {
    if (isLogged() && props.post && props.post._id) {
      const updated_post = await addComment(props.post._id, comment)
      props.updatePost(updated_post)
      setComment('')
    } else {
      store.addNotification({
        title: 'Falha!',
        message: 'Para adicionar um novo comentário é preciso estar logado!',
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
    }
  }

  useEffect(() => {
    if (props.post && props.post.image_url) {
      fetch(props.post.image_url)
        .then((res) => res.blob())
        .then((blob) => {
          setThumbnail(blob)
        })
    }
  }, [])

  const preview = useMemo(() => {
    return thumbnail ? URL.createObjectURL(thumbnail) : ''
  }, [thumbnail])

  function handleEdit() {
    setEditable(!editable)
    props.post && !props.new
      ? setDescription(props.post.description)
      : setDescription('')
  }

  async function handleSave() {
    let data = new FormData()

    if (thumbnail && thumbnail.type !== 'text/html') {
      console.log(thumbnail.type)
      data.append('image', thumbnail)
    }
    data.append('description', description)
    if (props.post && props.post._id) {
      let new_post = await updatePost(props.post._id, data)
      props.updatePost(new_post)
      setEditable(!editable)
    } else if (props.new) {
      let new_post = await createPost(data)
      props.updatePost(new_post)
      props.handleModal(!props.show)
      setEditable(!editable)
    }
  }

  async function handleDelete() {
    setEditable(!editable)
    if (props.post && props.post._id) {
      deletePost(props.post._id)
      props.updatePost({ description: '', image: '' })
      props.handleModal(!props.show)
    }
  }

  return (
    <div className={`modal ${props.show ? 'is-active' : ''}`}>
      <div className='modal-background'></div>
      <div className='modal-card'>
        <Header className='modal-card-head'>
          <p>
            {props.new ? 'Criar nova postagem' : 'O que teremos por aqui?!'}
          </p>
          <div>
            {props.post && user._id === props.post.owner ? (
              <Button
                btnColor={theme.colors.primary}
                title={'Deletar postagem'}
                onClick={handleDelete}
              >
                <Icon
                  icon={deleteFilled}
                  style={{ color: theme.colors.contrast, fontSize: '10px' }}
                />
              </Button>
            ) : undefined}
            {(props.post && user._id === props.post.owner) || props.new ? (
              <Button
                btnColor={editable ? theme.colors.success : 'grey'}
                title={
                  editable || props.new ? 'Salvar postagem' : 'Editar postagem'
                }
                onClick={editable || props.new ? handleSave : handleEdit}
              >
                <Icon
                  icon={editable || props.new ? saveFilled : settingFilled}
                  style={{ color: theme.colors.contrast, fontSize: '10px' }}
                />
              </Button>
            ) : undefined}
            <button
              onClick={() => props.handleModal(!props.show)}
              className='delete'
              aria-label='close'
            ></button>
          </div>
        </Header>
        <Container className='modal-card-body'>
          {props.post && !editable && !props.new && (
            <Picture
              url={
                props.post && props.post.image_url ? props.post.image_url : ''
              }
            />
          )}
          {props.post && (editable || props.new) && (
            <Label
              htmlFor='thumb'
              id='thumbnail'
              style={{ backgroundImage: `url(${preview})` }}
              className={thumbnail ? 'hasThumb' : ''}
            >
              <input
                id='thumb'
                type='file'
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                  let files = e.target.files
                  if (!files || !files[0]) return
                  else setThumbnail(files[0])
                }}
              ></input>

              <img src={camera} alt='Selecione uma imagem' />
            </Label>
          )}
          <InfosBox>
            <Description>
              {props.post && !editable && (
                <p title={props.post.description}>{props.post.description}</p>
              )}
              {props.post && (editable || props.new) && (
                <textarea
                  onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
                    setDescription(e.target.value)
                  }
                  value={description}
                />
              )}
            </Description>
            {!props.new && (
              <ComentaryBox>
                {props.post && props.post.comments
                  ? props.post.comments.map((comment, i) => (
                      <p key={i}>{comment}</p>
                    ))
                  : undefined}
              </ComentaryBox>
            )}
            {!props.new && (
              <Input className='control has-icons-right'>
                <input
                  value={comment}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setComment(e.target.value)
                  }
                  className='input is-small'
                  type='email'
                  placeholder='Novo comentário'
                />
                <SendIcon
                  onClick={handleAddCommentary}
                  className='icon is-small is-right'
                >
                  <Icon
                    icon={sendOutlined}
                    style={{ color: theme.colors.secondary, fontSize: '20px' }}
                  />
                </SendIcon>
              </Input>
            )}
          </InfosBox>
        </Container>
      </div>
    </div>
  )
}

export default PostModal
