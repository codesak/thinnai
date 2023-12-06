import { TOKEN_KEY } from './consts'

const isAuthenticatedNow = () => {
  const token = localStorage.getItem(TOKEN_KEY)
  // console.log(
  //   '🚀 ~ file: isAuthenticatedNow.ts:3 ~ isAuthenticatedNow ~ token:',
  //   token
  // )
  return !token ? false : true
  // const decoded = jwtDecode(token)
  // const currentTime = Date.now() / 1000
  // return decoded.exp > currentTime
}

export default isAuthenticatedNow
