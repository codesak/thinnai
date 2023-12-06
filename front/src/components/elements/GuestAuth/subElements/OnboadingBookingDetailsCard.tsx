import { Box, Grid, Typography } from '@mui/material'
import { S3_BASE_URL } from '../../../../utils/consts'

const OnboardingBookingDetailsCard = ({ booking }: { booking: any }) => {
  return (
    <Grid
      className="unregistered-guest-booking-details"
      container
      width={{
        xl: '50%',
        md: '50%',
        sm: '100%',
        xs: '100%',
      }}
    >
      <Grid item xs={false} sm={false} md={1}></Grid>
      <Grid item xs={12} sm={12} md={11}>
        <Box height={{ xl: 120, sm: 120, md: 120, xs: 50 }} />
        <Box position="sticky" top={0}>
          <Box
            bgcolor="#F7F5FF"
            padding={{
              xl: '3.75rem 3.875rem',
              md: '3.75rem 3.875rem',
              sm: '2.5rem 1.688rem 0.5rem 1.688rem',
              xs: '2.5rem 1.688rem 0.5rem 1.688rem',
            }}
            borderRadius="30px"
            height="fit-content"
          >
            <Typography
              marginBottom={{
                xl: '1.688rem',
                md: '1.688rem',
                sm: '1.688rem',
                xs: '1.688rem',
              }}
              color="#272F3D"
              fontFamily="Montserrat"
              fontWeight={700}
              fontSize={{
                xl: '2.5rem',
                md: '2.5rem',
                sm: '1.25rem',
                xs: '1.25rem',
              }}
              letterSpacing="0.015em"
            >
              {booking.property.propertyName}
            </Typography>
            <Box
              display={{
                xl: 'block',
                md: 'block',
                sm: 'none',
                xs: 'none',
              }}
            >
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                marginBottom={{
                  xl: '2.679rem',
                  md: '2.679rem',
                }}
              >
                <Typography
                  color="#383838"
                  fontFamily="Open Sans"
                  fontWeight={400}
                  lineHeight="1.4em"
                  fontSize={{
                    xl: '1.563rem',
                    md: '1.563rem',
                    sm: '0.938rem',
                    xs: '0.938rem',
                  }}
                  letterSpacing="-0.065em"
                >
                  Date :{' '}
                  <span style={{ color: '#6053AE' }}>
                    {new Date(booking.bookingFrom)
                      .toLocaleDateString('default', {
                        year: 'numeric',
                        month: 'numeric',
                        day: 'numeric',
                      })
                      .split('/')
                      .join('.')}
                  </span>
                </Typography>
                <Typography
                  color="#383838"
                  fontFamily="Open Sans"
                  fontWeight={400}
                  lineHeight="1.4em"
                  fontSize={{
                    xl: '1.563rem',
                    md: '1.563rem',
                    sm: '0.938rem',
                    xs: '0.938rem',
                  }}
                  letterSpacing="-0.065em"
                >
                  Time :{' '}
                  <span style={{ color: '#6053AE' }}>
                    {new Date(booking.bookingFrom).toLocaleTimeString(
                      'default',
                      {
                        hour: 'numeric',
                        minute: 'numeric',
                        hour12: true,
                      }
                    )}{' '}
                    -{' '}
                    {new Date(booking.bookingTo).toLocaleTimeString('default', {
                      hour: 'numeric',
                      minute: 'numeric',
                      hour12: true,
                    })}
                  </span>
                </Typography>
              </Box>
            </Box>
            <Box
              marginBottom={{
                xl: '3.688rem',
                md: '3.688rem',
                sm: '1.125rem',
                xs: '1.125rem',
              }}
              height={{
                xl: '513px',
                md: '513px',
                sm: '300px',
                xs: '187px',
              }}
              borderRadius="15px"
              overflow="hidden"
            >
              <img
                width="100%"
                style={{
                  objectFit: 'cover',
                }}
                height="100%"
                src={`${S3_BASE_URL}${booking.property.propertyPictures[0]}`}
                alt=""
              />
            </Box>
            <Box
              display={{
                xl: 'none',
                md: 'none',
                sm: 'block',
                xs: 'block',
              }}
            >
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                marginBottom={{
                  xl: '2.679rem',
                  md: '2.679rem',
                  sm: '1.813rem',
                  xs: '1.813rem',
                }}
              >
                <Typography
                  color="#383838"
                  fontFamily="Open Sans"
                  fontWeight={400}
                  lineHeight="1.4em"
                  fontSize={{
                    xl: '1.563rem',
                    md: '1.563rem',
                    sm: '0.938rem',
                    xs: '0.938rem',
                  }}
                  letterSpacing="-0.065em"
                >
                  Date :{' '}
                  <span style={{ color: '#6053AE' }}>
                    {new Date(booking.bookingFrom)
                      .toLocaleDateString('default', {
                        year: 'numeric',
                        month: 'numeric',
                        day: 'numeric',
                      })
                      .split('/')
                      .join('.')}
                  </span>
                </Typography>
                <Typography
                  color="#383838"
                  fontFamily="Open Sans"
                  fontWeight={400}
                  lineHeight="1.4em"
                  fontSize={{
                    xl: '1.563rem',
                    md: '1.563rem',
                    sm: '0.938rem',
                    xs: '0.938rem',
                  }}
                  letterSpacing="-0.065em"
                >
                  Time :{' '}
                  <span style={{ color: '#6053AE' }}>
                    {new Date(booking.bookingFrom).toLocaleTimeString(
                      'default',
                      {
                        hour: 'numeric',
                        minute: 'numeric',
                        hour12: true,
                      }
                    )}{' '}
                    -{' '}
                    {new Date(booking.bookingTo).toLocaleTimeString('default', {
                      hour: 'numeric',
                      minute: 'numeric',
                      hour12: true,
                    })}
                  </span>
                </Typography>
              </Box>
            </Box>
            <Box
              display={{
                xl: 'block',
                md: 'block',
                sm: 'none',
                xs: 'none',
              }}
            >
              <Typography
                marginBottom={{
                  xl: '0.625rem',
                  md: '0.625rem',
                  sm: '1.688rem',
                  xs: '1.688rem',
                }}
                color="#272F3D"
                fontFamily="Montserrat"
                fontWeight={600}
                lineHeight="1.4em"
                fontSize={{
                  xl: '1.563rem',
                  md: '1.563rem',
                  sm: '1.25rem',
                  xs: '1.25rem',
                }}
                letterSpacing="0.015em"
              >
                About the space
              </Typography>
              <Typography
                color="#383838"
                fontFamily="Open Sans"
                fontWeight={400}
                lineHeight="1.8em"
                fontSize={{
                  xl: '1.125rem',
                  md: '1.125rem',
                  sm: '0.938rem',
                  xs: '0.938rem',
                }}
              >
                {booking.property.propertyDescription}
              </Typography>
            </Box>
          </Box>
        </Box>
      </Grid>
    </Grid>
  )
}

export default OnboardingBookingDetailsCard
