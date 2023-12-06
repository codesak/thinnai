import { Button, Divider, Typography } from '@mui/material'
import Box from '@mui/material/Box'
import { Dispatch, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { loadPayments } from '../../../actions/payment'
import { RootState } from '../../../store'
import NavBar from '../Explore/NavBar'
import Search from '../Explore/Search'
import Loading from '../Loading/Loading'
import { S3_BASE_URL } from '../../../utils/consts'

const PaymentsReturns = () => {
  const dispatch: Dispatch<any> = useDispatch()

  const paymentLoading = useSelector<RootState, any>(
    (state) => state.payment.loading
  )

  //To Open Search Options
  const [searchState, setSearchState] = useState(false)
  const openSearch = () => {
    setSearchState(true)
  }

  //To change SearchBar to Searched Details
  const [stateSearched, setStateSearched] = useState(false)
  const searched = () => {
    setSearchState(false)
    setStateSearched(true)
  }

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  //Responsive Booking Menu FullScreen
  const [viewBook, setViewBook] = useState(false)

  useEffect(() => {
    dispatch(loadPayments())
  }, [dispatch])

  const payments = useSelector<RootState, any>(
    (state) => state.payment.payments?.payments
  )

  return (
    <Box
      margin={{
        sm: '1.375rem 1.875rem 0px 1.875rem',
        xs: '0px 1.25rem',
      }}
    >
      {!viewBook && (
        <Box
          height={70}
          display={{ xs: 'flex', sm: 'none' }}
          justifyContent="center"
        >
          <Box
            width="100%"
            fontWeight="700"
            fontSize="1.25rem"
            display="flex"
            alignItems="center"
          >
            <Button>
              <img
                width="12px"
                src="/assets/images/detail/arrowBack.svg"
                alt=""
              />
            </Button>
          </Box>
        </Box>
      )}
      <Box
        position="relative"
        display={{ xl: 'block', md: 'block', sm: 'block', xs: 'none' }}
      >
        {!viewBook && (
          <NavBar
            stateSearched={stateSearched}
            setStateSearched={setStateSearched}
            searchTabOpen={openSearch}
            state={searchState}
            searchTabClose={() => setSearchState(false)}
            searched={searched}
          />
        )}
        {searchState && (
          <Box
            position="absolute"
            width="590px"
            top="81px"
            left="29.5%"
            zIndex="5"
          >
            <Search onClick={searched} />
          </Box>
        )}
      </Box>
      <Box
        margin={{
          xl: '3.75rem 2.5rem 0px 2.5rem',
          md: '3.75rem 2.5rem 0px 2.5rem',
          sm: '3.125rem 0px 0px 0px',
          xs: '3.125rem 0px 0px 0px',
        }}
      >
        <Typography
          letterSpacing="0.015em"
          fontWeight={600}
          fontFamily="Montserrat"
          fontSize="2.25rem"
          mb="3.75rem"
        >
          Payments & Returns
        </Typography>
        {paymentLoading && (
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Box
              width={{
                md: '30%',
                sm: '40%',
                xs: '60%',
              }}
            >
              <Loading />
            </Box>
          </Box>
        )}
        {!paymentLoading && (
          <Box>
            {payments &&
              payments.map((payment: any) => (
                <>
                  <Box
                    key={payment._id}
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                    marginX={1}
                    paddingX="1.25rem"
                    paddingTop="0.938rem"
                    mb="0.938rem"
                  >
                    <Box
                      marginBottom="0.938rem"
                      display="flex"
                      alignItems="center"
                      gap={4}
                    >
                      <Box
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                      >
                        <img
                          width="53px"
                          src={`${S3_BASE_URL}${payment.host.profileImage}`}
                          alt=""
                        />
                      </Box>
                      <Box>
                        <Box>
                          <Typography
                            fontSize="1.5rem"
                            fontWeight="600"
                            fontFamily="Open Sans"
                          >
                            Thinnai Host {payment.host.firstName}
                          </Typography>
                          <Typography
                            fontSize="1.25rem"
                            fontWeight="400"
                            fontFamily="Open Sans"
                            color="#1A191E"
                          >
                            {payment.paymentType} on{' '}
                            {new Date(
                              payment.paymentDate.toString()
                            ).toLocaleDateString('default', {
                              month: 'long',
                              day: 'numeric',
                            })}
                          </Typography>
                        </Box>
                      </Box>
                    </Box>
                    <Typography
                      sx={{
                        fontSize: '1.5rem',
                        textTransform: 'none',
                        color:
                          payment.paymentType === 'Debited'
                            ? '#FF0000'
                            : '#2B941C',
                      }}
                    >
                      ₹ {payment.paymentAmount}
                    </Typography>
                  </Box>
                  <Box marginBottom="0.938rem">
                    <Divider />
                  </Box>
                </>
              ))}
          </Box>
        )}
      </Box>
    </Box>
  )
}

export default PaymentsReturns
