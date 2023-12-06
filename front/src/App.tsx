import { loadAppSettings } from './actions/appSettings'
import { loadUser, logout } from './actions/guestAuth'
import { loadLandingProperty } from './actions/landing'
import { loadProfile } from './actions/profile'
import CofnirmInvitedToBooking from './components/Pages/ConfirmInvitedToBooking'
import Policy from './components/elements/HostLanding/Policy'
import Loading from './components/elements/Loading/Loading'
import NotFound from './components/elements/NotFound/NotFound'
import './components/styles/main.css'
import store from './store'
import { TOKEN_KEY } from './utils/consts'
import PrivateRoute from './utils/routing/PrivateRoute'
import { BOOKING_VIEW_TYPE, ROUTES } from './utils/routing/routes'
import setAuthToken from './utils/setAuthToken'
import { Box } from '@mui/material'
import { createBrowserHistory } from 'history'
import { Fragment, lazy, Suspense, useEffect } from 'react'
import { SkeletonTheme } from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { Provider } from 'react-redux'
import {
  Route,
  Routes,
  unstable_HistoryRouter as HistoryRouter,
} from 'react-router-dom'
import Notification from './components/elements/Notification/Notification'
import TestPaymentResponse from './components/Pages/TestPaymentResponse'
import Invoice from './components/Pages/Invoice'
import Unpaid from './components/Pages/BookingTrackingPages/Unpaid'
import EditBooking from './components/Pages/EditBooking'
import '../src/components/styles/app.css'
import ViewDetails from './components/Pages/BookingTrackingPages/ViewDetails'
import Success from './components/Pages/Success'
import { lazyRetry } from './utils/helper'
import GoogleVerification from './components/elements/GuestAuth/GoogleVerification'
import Wrap from './components/Wrap'



const GuestLogin = lazy(() => lazyRetry(() => import('./components/AuthPages/GuestLogin')))

const GuestDataIdManager = lazy(
  () => lazyRetry(() => import('./components/Pages/GuestDataIdManager'))
)

const Cancelled = lazy(
  () => lazyRetry(() => import('./components/Pages/BookingTrackingPages/Cancelled')))
const Completed = lazy(
  () => lazyRetry(() => import('./components/Pages/BookingTrackingPages/Completed'))
)
const Confirmed = lazy(
  () => lazyRetry(() => import('./components/Pages/BookingTrackingPages/Confirmed'))
)
const Reset_password= lazy(() => lazyRetry(() => import('./components/AuthPages/ResetPassword')))
const Invited = lazy(
  () => lazyRetry(() =>import('./components/Pages/BookingTrackingPages/Invited'))
)
const Enquiry = lazy(
  () => lazyRetry(() => import('./components/Pages/BookingTrackingPages/Enquiry'))
)
const EnquiryStatus = lazy(
  () => lazyRetry(() => import('./components/Pages/BookingTrackingPages/EnquiryStatus'))
)
const Ongoing = lazy(
  () => lazyRetry(() => import('./components/Pages/BookingTrackingPages/Ongoing'))
)
const Requests = lazy(
  () => lazyRetry(() => import('./components/Pages/BookingTrackingPages/Requests'))
)

const Data = lazy(() => lazyRetry(() => import('./components/elements/Profile/Data')))
const MyFriendList = lazy(
  () => lazyRetry(() => import('./components/elements/Profile/MyFriendList'))
)
const MyReviews = lazy(() => lazyRetry(() => import('./components/elements/Profile/MyReviews')))
const PaymentsReturns = lazy(
  () => lazyRetry(() => import('./components/elements/Profile/PaymentsReturns'))
)
const PersonalInfo = lazy(
  () => lazyRetry(() => import('./components/elements/Profile/PersonalInfo'))
)
const PrivacySharing = lazy(
  () => lazyRetry(() => import('./components/elements/Profile/PrivacySharing'))
)
const Services = lazy(() => lazyRetry(() => import('./components/elements/Profile/Services')))
const Sharing = lazy(() => lazyRetry(() => import('./components/elements/Profile/Sharing')))
const CcAvenue = lazy(() => lazyRetry(() => import('./components/Pages/CcAvenue')))
const HostLanding = lazy(
  () => lazyRetry(() => import('./components/elements/HostLanding/HostLanding'))
)
const Chat = lazy(() => lazyRetry(() => import('./components/Pages/Chat')))
const Congratulations = lazy(() => lazyRetry(() => import('./components/Pages/PaymentStatus')))
const PaymentStatus = lazy(() => lazyRetry(() => import('./components/Pages/PaymentStatus')))

const Detail = lazy(() => lazyRetry(() => import('./components/Pages/Detail')))
const EnquiryToSending = lazy(
  () => lazyRetry(() => import('./components/Pages/EnquiryToSending'))
)
const Explore = lazy(() => lazyRetry(() => import('./components/Pages/Explore')))
const BookingTrackingContainer = lazy(
  () => lazyRetry(() => import('./components/Pages/BookingTrackingContainer')))

const GuestLanding = lazy(() => lazyRetry(() => import('./components/Pages/GuestLanding')))
const Payment = lazy(() => lazyRetry(() => import('./components/Pages/Payment')))
const TestPayment = lazy(() => lazyRetry(() => import('./components/Pages/TestPayment')))
const Profile = lazy(() => lazyRetry(() => import('./components/Pages/Profile')))
const Alerts = lazy(() => lazyRetry(() => import('./components/elements/Common/Alerts')))

if (localStorage.getItem(TOKEN_KEY)) {
  setAuthToken(localStorage.getItem(TOKEN_KEY))
}
let history: any = createBrowserHistory()

const App = () => {
  const isAuthenticated = store.getState().register.isAuthenticated

  useEffect(() => {
    store.dispatch(loadAppSettings())
    store.dispatch(loadLandingProperty())
    // store.dispatch(
    //   loadUser({
    //     redirectToRegister: () => history.replace(ROUTES.GUEST_REGISTRATION),
    //     redirectToInvited: (bookingId: string) =>
    //       history.replace(`${ROUTES.INVITED_TO}/${bookingId}`),
    //   })
    // )
    store.dispatch(loadProfile())
    const handleTokenChange = (e: StorageEvent) => {
      if (e.key === TOKEN_KEY && e.oldValue && !e.newValue) {
        store.dispatch(logout())
      }
    }
    window.addEventListener('storage', handleTokenChange)
    return function cleanup() {
      window.removeEventListener('storage', handleTokenChange)
    }
  }, [])

  return (
    <div className='app'>
      <SkeletonTheme baseColor="#cacaca" highlightColor="#a3a3a3">
        <Provider store={store}>
          <HistoryRouter history={history}>
            <Suspense
              fallback={
                <Box
                  height="100vh"
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                >
                  <Box
                    width={{
                      xl: '40%',
                      md: '40%',
                      sm: '35%',
                      xs: '40%',
                    }}
                  >
                    <Loading />
                  </Box>
                </Box>
              }
            >
              <Fragment>
                <section>
                  {isAuthenticated && <Notification />}
                  <Alerts />
                  <Routes>
                    <Route path={ROUTES.ROOT}>
                      {/* PUBLIC ROUTES */}
                      <Route index element={<GuestLanding />} />
                      <Route path={ROUTES.EXPLORE} element={<Explore />} />
                      <Route path='invoice' element={<Invoice />} />
                      <Route
                        path={ROUTES.HOST_LANDING}
                        element={<HostLanding />}
                      />
                      <Route path={ROUTES.LOGIN} element={<GuestLogin />} />
                      <Route path='/googleverification' element={<GoogleVerification />} />
                      <Route
                        path={`${ROUTES.ONBOARD}/:bookingId`}
                        element={<GuestLogin />}
                      />
                      <Route
                        path={`${ROUTES.PROPERTY_DETAIL}/:propertySlug`}
                        element={<Detail />}
                      />
                      <Route
                        path={ROUTES.RESET_PASSWORD + '/:Id'}
                        element={
                          <PrivateRoute>
                            <Reset_password />
                          </PrivateRoute>
                        }
                      />
                      <Route path={ROUTES.PROPERTY_DETAIL} element={<Detail />} />
                      <Route
                        path={ROUTES.GUEST_REGISTRATION}
                        element={<GuestDataIdManager />}
                      />
                      <Route path={'/test/payment'} element={<TestPayment />} />
                      <Route
                        path={'/test/payment/response'}
                        element={<TestPaymentResponse />}
                      />

                      {/* PROTECTED ROUTES */}
                      <Route
                        path={ROUTES.PAYMENT}
                        element={
                          <PrivateRoute>
                            <Payment />
                          </PrivateRoute>
                        }
                      />
                      <Route
                        path={ROUTES.PAYMENT_STATUS}
                        element={<PaymentStatus />}
                      />
                      <Route
                        path={ROUTES.GUEST_MANAGE_PROFILE}
                        element={
                          <PrivateRoute>
                            <GuestDataIdManager />{' '}
                          </PrivateRoute>
                        }
                      />
                      <Route
                        path={ROUTES.CHAT}
                        element={
                          <PrivateRoute>
                            <Chat />
                          </PrivateRoute>
                        }
                      />
                      <Route
                        path={ROUTES.CONGRATULATIONS}
                        element={
                          <PrivateRoute>
                            <Congratulations />
                          </PrivateRoute>
                        }
                      />
                      <Route
                        path='/enquiry-summary/:id'
                        element={
                          <PrivateRoute>
                            <ViewDetails />
                          </PrivateRoute>
                        }
                      />
                      <Route
                        path={ROUTES.ENQUIRY_SUMMARY}
                        element={
                          <PrivateRoute>
                            <EnquiryToSending />
                          </PrivateRoute>
                        }
                      />
                      {/* Success */}
                      <Route
                          path='success'
                          element={
                            <PrivateRoute>
                              <Success />
                            </PrivateRoute>
                          }
                        />
                      {/* PROFILE */}
                      <Route path={ROUTES.PROFILE}>
                        <Route
                          index
                          element={
                            <PrivateRoute>
                              <Profile />
                            </PrivateRoute>
                          }
                        />
                        <Route
                          path={ROUTES.FRIEND_LIST}
                          element={
                            <PrivateRoute>
                              <MyFriendList />
                            </PrivateRoute>
                          }
                        />
                        <Route
                          path={ROUTES.MY_REVIEWS}
                          element={
                            <PrivateRoute>
                              <MyReviews />
                            </PrivateRoute>
                          }
                        />
                        <Route
                          path={ROUTES.PERSONAL_INFO}
                          element={
                            <PrivateRoute>
                              <PersonalInfo />
                            </PrivateRoute>
                          }
                        />
                        <Route
                          path={ROUTES.PAYMENTS_REQUESTS}
                          element={
                            <PrivateRoute>
                              <PaymentsReturns />
                            </PrivateRoute>
                          }
                        />
                      
                        {/* Privacy and Sharing */}
                        <Route
                          path={ROUTES.PRIVACY_SHARING}
                          element={
                            <PrivateRoute>
                              <PrivacySharing />
                            </PrivateRoute>
                          }
                        >
                          <Route index element={<Data />} />
                          <Route path={ROUTES.SHARING} element={<Sharing />} />
                          <Route path={ROUTES.SERVICES} element={<Services />} />
                        </Route>
                      </Route>
                      {/* END OF PROFILE */}

                      {/* TRACK */}
                      <Route path={ROUTES.BOOKING_TRACKER} element={<PrivateRoute><BookingTrackingContainer /></PrivateRoute>}>
                        <Route
                          path={ROUTES.ONGOING}
                          element={
                            <PrivateRoute>
                              <Ongoing />
                            </PrivateRoute>
                          }
                        />
                        <Route
                          path={ROUTES.ENQUIRY}
                          element={
                            <PrivateRoute>
                              <Enquiry />
                            </PrivateRoute>
                          }
                        />
                        <Route
                          path={ROUTES.REQUESTS}
                          element={
                            <PrivateRoute>
                              <Requests />
                            </PrivateRoute>
                          }
                        />
                        <Route
                          path={ROUTES.CONFIRMED}
                          element={
                            <PrivateRoute>
                              <Confirmed />
                            </PrivateRoute>
                          }
                        />
                        <Route
                          path={ROUTES.COMPLETED}
                          element={
                            <PrivateRoute>
                              <Completed />
                            </PrivateRoute>
                          }
                        />
                        <Route
                          path={ROUTES.UNPAID}
                          element={
                            <PrivateRoute>
                              <Unpaid />
                            </PrivateRoute>
                          }
                        />
                        <Route
                          path={`${ROUTES.CONFIRMED}/:viewType`}
                          element={
                            <PrivateRoute>
                              <Confirmed />
                            </PrivateRoute>
                          }
                        />
                        <Route
                          path={`${ROUTES.CANCELLED}/:viewType`}
                          element={
                            <PrivateRoute>
                              <Confirmed />
                            </PrivateRoute>
                          }
                        />
                        <Route
                          path={`${ROUTES.COMPLETED}/:viewType`}
                          element={
                            <PrivateRoute>
                              <Completed />
                            </PrivateRoute>
                          }
                        />
                        <Route
                          path={`${ROUTES.UNPAID}/:viewType`}
                          element={
                            <PrivateRoute>
                              <Unpaid />
                            </PrivateRoute>
                          }
                        />
                        <Route
                          path={ROUTES.INVITED_TO}
                          element={
                            <PrivateRoute>
                              <Invited />
                            </PrivateRoute>
                          }
                        />
                        <Route
                          path={`${ROUTES.INVITED_TO}/:bookingId`}
                          element={
                            <PrivateRoute>
                              <Invited />
                            </PrivateRoute>
                          }
                        />
                        <Route
                          path={ROUTES.CANCELLED}
                          element={
                            <PrivateRoute>
                              <Cancelled />
                            </PrivateRoute>
                          }
                        />
                      </Route>
                      <Route path={ROUTES.EDIT} element={<PrivateRoute><EditBooking/></PrivateRoute>}/>
                      {/* End Of Track */}
                      <Route
                          path={ROUTES.ENQUIRY_STATUS}
                          element={
                            <PrivateRoute>
                              <EnquiryStatus />
                            </PrivateRoute>
                          }
                        />
                      <Route
                        path={`${ROUTES.CONFIRM_INVITATION}/:bookingId`}
                        element={
                          <PrivateRoute>
                            <CofnirmInvitedToBooking />
                          </PrivateRoute>
                        }
                      />
                      <Route
                        path={ROUTES.POLICY_BASE + '/:policyId'}
                        element={
                          
                            <Policy />
                          
                        }
                      />
                    </Route>

                    {/* <Route path='*' element={<Navigate to={ROUTES.ROOT} />} /> */}
                    {/* Universal Route */}
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </section>
              </Fragment>
            </Suspense>
          </HistoryRouter>
        </Provider>
      </SkeletonTheme>
    </div>
  )
}

export default Wrap(App)
