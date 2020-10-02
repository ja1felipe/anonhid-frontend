import React, { ChangeEvent, useState, useEffect } from 'react'

import { Container, Picker, PickerSelect } from './styles'

import { IPosts, IUser } from '../../types/types'
import { getPosts, getUserPosts } from '../../services/api'
import Card from '../../components/Card/Card'
import userLogged from '../../utils/User'
import Header from '../../components/Header/Header'

const Home: React.FC = () => {
  const [query, setQuery] = useState<string>('votes')
  const [posts, setPosts] = useState<IPosts[]>([])
  const [page, setPage] = useState<number>(1)

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
  }, [query, page])

  function handlePictureClick() {
    console.log('oi')
  }

  return (
    <>
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
      <Container className='container'>
        {posts &&
          posts.map((post) => (
            <Card
              onClick={handlePictureClick}
              liked={user ? user.likes.includes(post._id) : false}
              key={post._id}
              id={post._id}
              url={post.image_url}
              likes={post.likes}
              comments={post.comments.length}
            />
          ))}
      </Container>
    </>
  )
}

export default Home
