import connectDB from './config/dbConnector'
import client from './config/redis'
import admin from './routes/api/admin'
import adminDashboard from './routes/api/adminDashboard'
import appSettings from './routes/api/appSettings'
import approve from './routes/api/approve'
import auth from './routes/api/auth'
import booking from './routes/api/booking'
import cancelBooking from './routes/api/cancelBooking'
import cart from './routes/api/cart'
import ccAvenuePayment from './routes/api/ccAvenuePayment'
import chat from './routes/api/chat'
import dashboard from './routes/api/dashboard'
import inquiry from './routes/api/inquiry'
import order from './routes/api/order'
import profile from './routes/api/profile'
import property from './routes/api/property'
import publicRouter from './routes/api/public'
import notification from './routes/api/pushNotification'
import report from './routes/api/report'
import s3bucket from './routes/api/s3bucket'
import schedule from './routes/api/schedule'
import { ErrorCode } from './utils/consts'


/* import { startFCM } from './utils/notification'; */
//import S3Router from './utils/s3Router'
import websockets from './websockets/server'
import config from 'config'
import MongoStore from 'connect-mongo'
import cors from 'cors'
import 'dotenv/config'
import express, { json } from 'express'
import session from 'express-session'
import passport from 'passport'

const PORT = config.get('serverPort')
const path = require('path');


//**********************************Inits**********************************/
const app = express()
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
connectDB()
client
  .connect()
  .then(() => console.log('====> Redis connected'))
  .catch((error: any) => {
    console.error('Redis Connection Failed', error)
    process.exit(ErrorCode.DB_CONN_ERR)
  })

app.use(cors())
app.use(json())

app.use(
  session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({
      mongoUrl:
        'mongodb+srv://thinnaiUserDev:thinnaiUserDev@prod-cluster.goe8fsq.mongodb.net/thinnai-prod?retryWrites=true&w=majority',
    }),
  })
)
app.use(passport.initialize())
app.use(passport.session())

//**********************************Routes**********************************/
app.use('/api/auth', auth)
app.use('/api/profile', profile)
app.use('/api/property', property)
app.use('/api/inquiry', inquiry)
app.use('/api/booking', booking)
app.use('/api/booking/cancel', cancelBooking)
app.use('/api/schedule', schedule)
app.use('/api/dashboard', dashboard)
app.use('/api/approve', approve)
app.use('/api/adminDashboard', adminDashboard)
app.use('/api/admin', admin)
app.use('/api/report', report)
app.use('/api/chat', chat)
app.use('/api/ccavenue', ccAvenuePayment)
app.use('/api/appSettings', appSettings)
app.use('/api/push', notification)
app.use('/api/s3store', s3bucket)
app.use('/api/cart', cart)
app.use('/api/order', order)
//new url
app.use(
  '/api/public',
  function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*')
    res.header(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept'
    )
    next()
  },
  publicRouter
)

// app.use(
//   '/s3',
//   S3Router(
//     {
//       bucket: process.env.AWS_S3_BUCKETNAME,
//       region: process.env.AWS_S3_REGION,
//       accessKeyId: process.env.AWS_S3_ACCESS_KEY_ID,
//       secretAccessKey: process.env.AWS_S3_SECRET_ACCESS_KEY,
//       signatureVersion: 'v4',
//       signatureExpires: 60,
//       headers: { 'Access-Control-Allow-Origin': '*' },
//       ACL: 'private',
//       uniquePrefix: true,
//     },
//     []
//   )
// )

//Google Ads
  app.use(express.static(path.join(__dirname, 'public')));

  app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
  });
const expressServer = app.listen(PORT, () => {
  console.log('Go!')
})

websockets(expressServer)
/* startFCM(); */

require('./middleware/passport')
