import React, { ChangeEvent, useState, useEffect, UIEvent } from 'react'

import { Container, Picker, PickerSelect, Button, ButtonBox } from './styles'

import { IPosts, IUser } from '../../types/types'
import { getPosts, getUserPosts } from '../../services/api'
import Card from '../../components/Card/Card'
import userLogged from '../../utils/User'
import Header from '../../components/Header/Header'
import PostModal from '../../components/PostModal/PostModal'
import { isLogged } from '../../utils/Auth'

const Home: React.FC = () => {
  const [query, setQuery] = useState<string>('votes')
  const [posts, setPosts] = useState<IPosts[]>([])
  const [page, setPage] = useState<number>(1)
  const [openModal, setOpenModal] = useState<boolean>(false)
  const [isNew, setIsNew] = useState<boolean>(false)
  const [activePost, setActivePost] = useState<IPosts>({
    image: '',
    description: ''
  })
  const user: IUser = userLogged() ? JSON.parse(userLogged()) : ''

  useEffect(() => {
    async function get() {
      let fetchedPosts: IPosts[] = []
      if (query !== 'mine') {
        fetchedPosts = await getPosts(query, page)
      } else {
        fetchedPosts = await getUserPosts(page)
      }
      setPosts((prev) => [...prev, ...fetchedPosts])
    }
    get()

    return function cleanup() {
      setPosts([])
    }
  }, [query, page, activePost])

  function handlePictureClick(post: IPosts) {
    setActivePost(post)
    setOpenModal(true)
  }

  function handleScroll(e: UIEvent<HTMLDivElement>) {
    const { scrollTop, clientHeight, scrollHeight } = e.currentTarget

    if (scrollHeight - scrollTop === clientHeight) {
      setPage((prev) => prev + 1)
    }
  }

  function handleChangeActivePost(post: IPosts) {
    setActivePost(post)
    setIsNew(false)
  }

  return (
    <>
      <PostModal
        new={isNew}
        updatePost={handleChangeActivePost}
        post={activePost}
        editable={false}
        show={openModal}
        handleModal={setOpenModal}
        className={openModal ? 'is-active' : ''}
      />
      <Header></Header>
      <Picker>
        <div>
          <PickerSelect
            value={query}
            onChange={(e: ChangeEvent<HTMLSelectElement>) =>
              setQuery(e.target.value)
            }
            name='query'
            id='query'
          >
            <option value='votes'>mais votados</option>
            <option value='created'>mais recentes</option>
            {user && <option value='mine'>meus posts</option>}
          </PickerSelect>
        </div>
      </Picker>
      <ButtonBox>
        {isLogged() && (
          <Button
            onClick={() => {
              setActivePost({
                image: '',
                description: ''
              })
              setIsNew(true)
              setOpenModal(!openModal)
            }}
            className='button'
          >
            Novo Post
          </Button>
        )}
      </ButtonBox>
      <Container onScroll={handleScroll} className='container'>
        {posts &&
          posts.map((post) => (
            <Card
              onClick={() => {
                setIsNew(false)
                handlePictureClick(post)
              }}
              liked={user && post._id ? user.likes.includes(post._id) : false}
              key={post._id ? post._id : '0'}
              id={post._id ? post._id : '0'}
              url={post.image_url ? post.image_url : ''}
              likes={post.likes ? post.likes : 0}
              comments={post.comments ? post.comments.length : 0}
            />
          ))}
      </Container>
    </>
  )
}

export default Home
