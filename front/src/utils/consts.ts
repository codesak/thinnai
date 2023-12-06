import { ROUTES } from './routing/routes'
import createTheme from '@mui/material/styles/createTheme'

export const LOGIN = 'LOGIN'
export const SET_PHONE_NUMBER = 'SET_PHONE_NUMBER'
export const SET_ALERT = 'SET_ALERT'
export const REMOVE_ALERT = 'REMOVE_ALERT'

//Filter
export const SET_RESET_STATE = 'SET_RESET_STATE'

//App Settings
export const APP_SETTINGS_LOAD_SUCCESS = 'APP_SETTINGS_LOAD_SUCCESS'
export const APP_SETTINGS_LOAD_FAIL = 'APP_SETTINGS_LOAD_FAIL'
export const RESET_APP_SETTINGS = 'RESET_APP_SETTINGS'
export const LOADING_APP_SETTINGS = 'LOADING_APP_SETTINGS'

//Host User
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const LOGIN_FAIL = 'LOGIN_FAIL'
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS'
export const REGISTER_FAIL = 'REGISTER_FAIL'
export const VERIFICATION_SUCCESS = 'VERIFICATION_SUCCESS'
export const VERIFICATION_FAIL = 'VERIFICATION_FAIL'
export const USER_LOADED = 'USER_LOADED'
export const USER_LOAD_FAIL = 'USER_LOAD_FAIL'
export const UPLOAD_UPDATED = 'UPLOAD_UPDATED'

//Guest User
export const SEND_OTP_SUCCESS = 'SEND_OTP_SUCCESS'
export const SEND_OTP_FAIL = 'SEND_OTP_FAIL'
export const VERIFY_OTP_SUCCESS = 'VERIFY_OTP_SUCCESS'
export const VERIFY_OTP_FAIL = 'VERIFY_OTP_FAIL'
export const UPDATE_USER_SUCCESS = 'UPDATE_USER_SUCCESS'
export const UPDATE_USER_FAIL = 'UPDATE_USER_FAIL'
export const LOGOUT = 'LOGOUT'
export const RESET_USER = 'RESET_USER'
export const LOADING_USER = 'LOADING_USER'
export const DONE_LOADING_USER = 'DONE_LOADING_USER'

//Landing
export const LANDING_PLACES_LOAD_SUCCESS = 'LANDING_PLACES_LOAD_SUCCESS'
export const LANDING_PLACES_LOAD_FAIL = 'LANDING_PLACES_LOAD_FAIL'
export const RESET_LANDING = 'RESET_LANDING'

//User Data
export const CREATE_PROFILE_SUCCESS = 'CREATE_PROFILE_SUCCESS'
export const CREATE_PROFILE_FAIL = 'CREATE_PROFILE_FAIL'
export const PROFILE_LOAD_SUCCESS = 'PROFILE_LOAD_SUCCESS'
export const PROFILE_PENDING = 'PROFILE_PENDING'
export const PROFILE_LOAD_FAIL = 'PROFILE_LOAD_FAIL'
export const REVIEWS_LOAD_SUCCESS = 'REVIEWS_LOAD_SUCCESS'
export const REVIEWS_LOAD_FAIL = 'REVIEWS_LOAD_FAIL'
export const FRIENDS_LOAD_SUCCESS = 'FRIENDS_LOAD_SUCCESS'
export const FRIENDS_LOAD_FAIL = 'FRIENDS_LOAD_FAIL'
export const REMOVE_FRIEND_SUCCESS = 'REMOVE_FRIEND_SUCCESS'
export const REMOVE_FRIEND_FAIL = 'REMOVE_FRIEND_FAIL'
export const UPDATE_PROFILE_SUCCESS = 'UPDATE_PROFILE_SUCCESS'
export const UPDATE_PROFILE_FAIL = 'UPDATE_PROFILE_FAIL'
export const RESET_PROFILE = 'RESET_PROFILE'
export const LOADING_PROFILE = 'LOADING_PROFILE'

//Search
export const SET_CITY = 'SET_CITY'
export const SET_LANDMARK = 'SET_LANDMARK'
export const SET_BOOKING_DATE = 'SET_BOOKING_DATE'
export const SET_GUEST_COUNT = 'SET_GUEST_COUNT'
export const SET_GROUP_TYPE = 'SET_GROUP_TYPE'
export const SET_DIRECT_BOOKING = 'SET_DIRECT_BOOKING'
export const SET_AMENITIES_FILTERS = 'SET_AMENITIES_FILTERS'
export const SET_SERVICES_FILTERS = 'SET_SERVICES_FILTERS'
export const SET_SORT = 'SET_SORT'
export const CLEAR_SEARCH_STORE = 'CLEAR_SEARCH_STORE'
export const RESET_SEARCH = 'RESET_SEARCH'
export const SET_ADD_ON_SERVICES = 'SET_ADD_ON_SERVICES'
export const SET_LATITUDE = 'SET_LATITUDE'
export const SET_LONGITUDE = 'SET_LONGITUDE'
export const SET_AREA = 'SET_AREA'

//Main
export const PLACES_LOAD_SUCCESS = 'PLACES_LOAD_SUCCESS'
export const PLACES_LOAD_FAIL = 'PLACES_LOAD_FAIL'
export const LOCATIONS_LOAD_SUCCESS = 'LOCATIONS_LOAD_SUCCESS'
export const LOCATIONS_LOAD_FAIL = 'LOCATIONS_LOAD_FAIL'
export const RESET_MAIN = 'RESET_MAIN'
export const LOADING_MAIN = 'LOADING_MAIN'

//Details
export const PROPERTY_LOAD_SUCCESS = 'PROPERTY_LOAD_SUCCESS'
export const PROPERTY_LOAD_FAIL = 'PLACES_LOAD_FAIL'
export const RESET_DETAILS = 'RESET_DETAILS'
export const LOADING_DETAILS = 'LOADING_DETAILS'

//Schedule
export const SCHEDULE_LOAD_SUCCESS = 'SCHEDULE_LOAD_SUCCESS'
export const SCHEDULE_LOAD_FAIL = 'SCHEDULE_LOAD_FAIL'
export const RESET_SCHEDULE = 'RESET_SCHEDULE'
export const LOADING_SCHEDULE = 'LOADING_SCHEDULE'

//Enquiry
export const SET_INDEX = 'SET_INDEX'
export const ADD_ENQUIRY = 'ADD_ENQUIRY'
export const UPDATE_ENQUIRY = 'UPDATE_ENQUIRY'
export const DELETE_ENQUIRY = 'DELETE_ENQUIRY'
export const SET_LOAD_ENQUIRY_DATA = 'SET_LOAD_ENQUIRY_DATA'
export const SET_ENQUIRY_INDEX = 'SET_ENQUIRY_INDEX'
export const ENQUIRY_PLACES_LOAD_SUCCESS = 'ENQUIRY_PLACES_LOAD_SUCCESS'
export const SEND_ENQUIRY_SUCCESS = 'SEND_ENQUIRY_SUCCESS'
export const SEND_ENQUIRY_FAIL = 'SEND_ENQUIRY_FAIL'
export const RESET_ENQUIRY = 'RESET_ENQUIRY'
export const SET_ADD_MORE_ENQUIRY = 'SET_ADD_MORE_ENQUIRY'
export const LOADING_ENQUIRY = 'LOADING_ENQUIRY'

//Booking
export const LOAD_BOOKING_ENQUIRY_STATUS_SUCCESS =
  'LOAD_BOOKING_ENQUIRY_STATUS_SUCCESS'
export const LOAD_BOOKING_ENQUIRY_STATUS_FAILURE =
  'LOAD_BOOKING_ENQUIRY_STATUS_FAILURE'
export const LOAD_BOOKING_SUCCESS = 'LOAD_BOOKING_SUCCESS'
export const LOAD_BOOKING_FAIL = 'LOAD_BOOKING_FAIL'
export const LOAD_BOOKING_ONGOING_SUCCESS = 'LOAD_BOOKING_ONGOING_SUCCESS'
export const LOAD_BOOKING_ONGOING_FAIL = 'LOAD_BOOKING_ONGOING_FAIL'
export const LOAD_BOOKING_ENQUIRY_SUCCESS = 'LOAD_BOOKING_ENQUIRY_SUCCESS'
export const LOAD_BOOKING_ENQUIRY_FAIL = 'LOAD_BOOKING_ENQUIRY_FAIL'
export const LOAD_BOOKING_CONFIRMED_SUCCESS = 'LOAD_BOOKING_CONFIRMED_SUCCESS'
export const LOAD_BOOKING_CONFIRMED_FAIL = 'LOAD_BOOKING_CONFIRMED_FAIL'
export const LOAD_BOOKING_RESCHEDULED_SUCCESS =
  'LOAD_BOOKING_RESCHEDULED_SUCCESS'
export const LOAD_BOOKING_RESCHEDULED_FAIL = 'LOAD_BOOKING_RESCHEDULED_FAIL'
export const LOAD_BOOKING_INVITED_SUCCESS = 'LOAD_BOOKING_INVITED_SUCCESS'
export const LOAD_BOOKING_INVITED_FAIL = 'LOAD_BOOKING_INVITED_FAIL'
export const LOAD_BOOKING_CANCELLED_SUCCESS = 'LOAD_BOOKING_CANCELLED_SUCCESS'
export const LOAD_BOOKING_CANCELLED_FAIL = 'LOAD_BOOKING_CANCELLED_FAIL'
export const CANCEL_ENQUIRY_SUCCESS = 'CANCEL_ENQUIRY_SUCCESS'
export const CANCEL_ENQUIRY_FAIL = 'CANCEL_ENQUIRY_FAIL'
export const RESCHEDULE_BOOKING_SUCCESS = 'RESCHEDULE_BOOKING_SUCCESS'
export const RESCHEDULE_BOOKING_FAIL = 'RESCHEDULE_BOOKING_FAIL'
export const RESET_BOOKING = 'RESET_BOOKING'
export const LOADING_BOOKING = 'LOADING_BOOKING'
export const REMOVE_INVITED_GUEST_SUCCESS = 'REMOVE_INVITED_GUEST_SUCCESS'
export const REMOVE_INVITED_GUEST_FAIL = 'REMOVE_INVITED_GUEST_FAIL'
export const RESCHEDULE_BOOKING_REQUEST_SUCCESS =
  'RESCHEDULE_BOOKING_REQUEST_SUCCESS'
export const RESCHEDULE_BOOKING_REQUEST_FAIL = 'RESCHEDULE_BOOKING_REQUEST_FAIL'
export const ACCEPT_RESCHEDULE_BOOKING_REQUEST_SUCCESS =
  'ACCEPT_RESCHEDULE_BOOKING_REQUEST_SUCCESS'
export const ACCEPT_RESCHEDULE_BOOKING_REQUEST_FAIL =
  'ACCEPT_RESCHEDULE_BOOKING_REQUEST_FAIL'

export const CUTLERY_DISCOUNT=0.05
export const SERVICE_CHARGE=0.095
export const GST_CHARGE=0.18

//date
export const UPDATED_SS = 'UPDATED_SS'
export const CURRENT_DATE = 'CURRENT_DATE'

//Payment
export const PAYMENT_LOAD_SUCCESS = 'PAYMENT_LOAD_SUCCESS'
export const PAYMENT_LOAD_FAIL = 'PAYMENT_LOAD_FAIL'
export const RECORD_PAYMENT_SUCCESS = 'RECORD_PAYMENT_SUCCESS'
export const RECORD_PAYMENT_FAIL = 'RECORD_PAYMENT_FAIL'
export const RESET_PAYMENT = 'RESET_PAYMENT'
export const LOADING_PAYMENT = 'LOADING_PAYMENT'

export const TOKEN_KEY = 'token'
export const EMAIL_KEY = 'email'
export const GOOGLE_DATA = 'GOOGLE_DATA'
export const ALERT_CLEAR_TIME = 4000

export const S3_BASE = 'https://thinnai-s3-bucket.s3.amazonaws.com/'
export const S3_BASE_URL = 'https://thinnai-s3-bucket.s3.amazonaws.com/'

export const INITIAL_DOB = 915148800000 //1 Jan 1999 Epoch

export enum ALERT_TYPE {
  DANGER = 'error',
  SUCCESS = 'success',
  INFO = 'info',
}

export enum BOOKING_DETAIL_LEVEL {
  ONGOING = 'ongoing',
  INVITED = 'invited',
  CONFIRMED = 'confirmed',
}

export interface Action {
  type: string
  payload: any
}

export const timeArray = [
  { time: '12:00 AM', key: 0 },
  { time: '12:30 AM', key: 1 },
  { time: '01:00 AM', key: 2 },
  { time: '01:30 AM', key: 3 },
  { time: '02:00 AM', key: 4 },
  { time: '02:30 AM', key: 5 },
  { time: '03:00 AM', key: 6 },
  { time: '03:30 AM', key: 7 },
  { time: '04:00 AM', key: 8 },
  { time: '04:30 AM', key: 9 },
  { time: '05:00 AM', key: 10 },
  { time: '05:30 AM', key: 11 },
  { time: '06:00 AM', key: 12 },
  { time: '06:30 AM', key: 13 },
  { time: '07:00 AM', key: 14 },
  { time: '07:30 AM', key: 15 },
  { time: '08:00 AM', key: 16 },
  { time: '08:30 AM', key: 17 },
  { time: '09:00 AM', key: 18 },
  { time: '09:30 AM', key: 19 },
  { time: '10:00 AM', key: 20 },
  { time: '10:30 AM', key: 21 },
  { time: '11:00 AM', key: 22 },
  { time: '11:30 AM', key: 23 },
  { time: '12:00 PM', key: 24 },
  { time: '12:30 PM', key: 25 },
  { time: '01:00 PM', key: 26 },
  { time: '01:30 PM', key: 27 },
  { time: '02:00 PM', key: 28 },
  { time: '02:30 PM', key: 29 },
  { time: '03:00 PM', key: 30 },
  { time: '03:30 PM', key: 31 },
  { time: '04:00 PM', key: 32 },
  { time: '04:30 PM', key: 33 },
  { time: '05:00 PM', key: 34 },
  { time: '05:30 PM', key: 35 },
  { time: '06:00 PM', key: 36 },
  { time: '06:30 PM', key: 37 },
  { time: '07:00 PM', key: 38 },
  { time: '07:30 PM', key: 39 },
  { time: '08:00 PM', key: 40 },
  { time: '08:30 PM', key: 41 },
  { time: '09:00 PM', key: 42 },
  { time: '09:30 PM', key: 43 },
  { time: '10:00 PM', key: 44 },
  { time: '10:30 PM', key: 45 },
  { time: '11:00 PM', key: 46 },
  { time: '11:30 PM', key: 47 },
]

export const SHOW_ONLY_DESKTOP = {
  xs: 'none',
  sm: 'none',
  md: 'block',
  lg: 'block',
}
export const SHOW_ONLY_PHONE = {
  xs: 'block',
  sm: 'block',
  md: 'none',
  lg: 'none',
}

export const GENDERS = [
  {
    text: 'Male',
    pic: '/assets/images/otp/Male.svg',
  },
  {
    text: 'Female',
    pic: '/assets/images/otp/Female.svg',
  },
  {
    text: 'Transgender',
    pic: '/assets/images/otp/Trans.svg',
  },
]

export const sortBy = [
  {
    name: 'Acceptance Rate',
    value: 'acceptanceRate',
  },
  {
    name: 'Response Time',
    value: 'responseTime',
  },
  {
    name: 'Distance',
    value: 'distance',
  },
  {
    name: 'Price (Low to High)',
    value: 'priceLowToHigh',
  },
  {
    name: 'Price (High to Low)',
    value: 'priceHighToLow',
  },
  {
    name: 'Ratings',
    value: 'ratings',
  },
]

export const menuItems = [
  {
    title: 'Cart',
    img: "/assets/images/ic_cart.svg",
    path: ROUTES.ENQUIRY_SUMMARY,
    id: 'cart',
  },
  {
    title: 'My Bookings',
    img: '/assets/images/nav/my-booking.svg',
    path: ROUTES.UNPAID,
    id: 'myBookings',
  },
  // {
  //   title: 'Chats',
  //   img: '/assets/images/nav/chat.svg',
  //   path: ROUTES.CHAT,
  //   id: 'chats',
  // },
  {
    title: 'Profile Page',
    img: '/assets/images/nav/profile-page.svg',
    path: ROUTES.PROFILE,
    id: 'profile',
  },
  {
    title: 'Host Your Space',
    img: '/assets/images/nav/host.svg',
    path: ROUTES.HOST_LANDING,
    id: 'hostYourSpace',
  },
  {
    title: 'Terms of Use',
    img: '/assets/images/nav/terms.svg',
    path:'/policy/guest-terms-of-use',
    id: 'termsOfUse',
  },
  {
    title: 'Privacy Policy',
    img: '/assets/images/nav/privacy.svg',
    path: '/policy/privacy-policy',
    id: 'privacy',
  },
  {
    title: 'Help',
    img: '/assets/images/nav/help.svg',
    path:`https://wa.me/+919677790546?text=Hi%20there!%20I'm%20in%20need%20of%20assistance.%20Can%20you%20please%20help%20me.%20Thank%20You!%20`,
    id: 'help',
  },
]


export const fourColorPalette = [
  {
    dark: '#6053AE',
    medium: '#8F7EF3',
    light: '#DFDAFF',
    extraLight: '#F3F1FF',
  },
  {
    dark: '#AD6800',
    medium: '#F4AD43',
    light: '#F4CF97',
    extraLight: '#F2F0DF',
  },
  {
    dark: '#228514',
    medium: '#2B941C',
    light: '#A9E39B',
    extraLight: '#EEFCEC',
  },
  {
    dark: '#126B93',
    medium: '#0D8CB2',
    light: '#C2E3F2',
    extraLight: '#E7F0F4',
  },
]

// Theme for Button used in Auth Page
export const AuthButtonTheme = (background: string, textColor: string) =>
  createTheme({
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            '&.MuiButton-contained': {
              background: background,
              color: textColor,
            },
            '&.Mui-disabled': {
              backgroundColor: 'grey',
              color: 'white',
            },
          },
        },
      },
    },
  })
