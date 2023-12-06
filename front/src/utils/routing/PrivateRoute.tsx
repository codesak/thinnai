import { Box } from '@mui/material'
import { Container } from '@mui/system'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import Loading from '../../components/elements/Loading/Loading'
import { RootState } from '../../store'
import { ROUTES } from './routes'
import isAuthenticatedNow from '../isAuthenticatedNow'

const PrivateRoute: React.FC = ({ children }: any) => {
  const isAuthenticated = isAuthenticatedNow()
  return isAuthenticated === true ? children : <Navigate to={ROUTES.LOGIN} />
}

export default PrivateRoute
