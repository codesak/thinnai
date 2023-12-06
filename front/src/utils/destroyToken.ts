import { TOKEN_KEY } from './consts'

const destroyToken = () => {
  const token = localStorage.getItem(TOKEN_KEY)
  if (token) {
    localStorage.removeItem(TOKEN_KEY)
  }
}
export default destroyToken
