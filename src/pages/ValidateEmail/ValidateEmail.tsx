import React, { useEffect } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { validateAccount } from '../../services/api'

interface IParams {
  token: string
}
const ValidateEmail: React.FC = () => {
  let { token } = useParams<IParams>()
  const history = useHistory()
  useEffect(() => {
    validateAccount(token).then(() => {
      history.push('/')
    })
  })
  return <div />
}

export default ValidateEmail
