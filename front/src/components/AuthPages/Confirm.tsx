import { Box } from '@mui/material'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate, useParams } from 'react-router-dom'
import { Dispatch } from 'redux'
import { verify } from '../../actions/register'
import { RootState } from '../../store'
import { ROUTES } from '../../utils/routing/routes'
import Loading from '../elements/Loading/Loading'
import '../styles/main.css'
import isAuthenticatedNow from '../../utils/isAuthenticatedNow'

const Confirm = () => {
  const { token } = useParams<{ token: string }>()
  const dispatch: Dispatch<any> = useDispatch()

  // const isAuthenticated = useSelector<RootState, boolean>(state => state.register.isAuthenticated);
  const isAuthenticated = isAuthenticatedNow()
  const verified = useSelector<RootState, boolean>(
    (state) => state.register.verified
  )

  useEffect(() => {
    if (token) dispatch(verify(token))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token])

  if (isAuthenticated === true || verified == null)
    return (
      <Box
        width={{
          md: '30%',
          sm: '40%',
          xs: '60%',
        }}
      >
        <Loading />
      </Box>
    )

  return (
    <div>
      {verified ? (
        <Navigate to={ROUTES.LOGIN} />
      ) : (
        InavlidToken('Invalid Token')
      )}
    </div>
  )
}
const InavlidToken: React.FC<string> = (text: string) => <div>{text}</div>

export default Confirm
