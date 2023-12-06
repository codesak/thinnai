import { ErrorCode } from '../utils/consts'
import { connect } from 'mongoose'

const config = require('config')

const db = config.get('mongoURI')

const connectDB = async () => {
  try {
    await connect(db)
    console.log('====> DB connected successfully')
  } catch (err) {
    console.log('Error Connecting', err)
    process.exit(ErrorCode.DB_CONN_ERR)
  }
}

export default connectDB
