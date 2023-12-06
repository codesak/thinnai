import { loadBooking } from '../../../../actions/booking'
import { S3_BASE_URL, fourColorPalette } from '../../../../utils/consts'
import { BOOKING_VIEW_TYPE, ROUTES } from '../../../../utils/routing/routes'
import { Accordion, AccordionDetails, AccordionSummary, Box, Button, Divider, Typography } from '@mui/material'
import { Dispatch, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import style from '../../../styles/BookingTracking/cards/confirmedCard.module.css'
import PlaceIcon from '@mui/icons-material/Place';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
interface IConfirmedCardProps {
  item: any
  color: any
  index: number
  isInvitedBooking?: boolean
}

const CancelledCard = ({
  item,
  color,
  index,
  isInvitedBooking = false,
}: IConfirmedCardProps) => {
  const dispatch: Dispatch<any> = useDispatch()
  const navigate = useNavigate()
  const [expanded, setExpanded] = useState<string | false>(false)

  const onClickDetails = () => {
    if (isInvitedBooking) {
      navigate(`${ROUTES.INVITED_TO}/${item._id}`)
    } else {
      dispatch(
        loadBooking(item._id, () =>
          navigate(`${ROUTES.CANCELLED}/${BOOKING_VIEW_TYPE.DETAILS}`, {
             state: {
              item
            }
          }
        )
        )
      )
    }
  }
  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false)
    }

  return (
    <Box
    key={index}
    bgcolor={fourColorPalette[index % 4].extraLight}
    marginBottom='2rem'
    borderRadius="1rem"
    display="flex"
    gap={{
      xl: '2rem',
      md: '2rem',
      sm: '2rem',
      xs: '1.5rem',
    }}
    flexDirection={{
      xl: 'row',
      md: 'row',
      sm: 'column',
      xs: 'column',
    }}
  >
    <Box width={{ md: '40%', sm: '100%' }}>
      <img
        style={{
          width: '100%',
          maxHeight: '316px',
          objectFit: 'fill',
        }}
        className={style.unpaidImg}
        src={`${S3_BASE_URL}${item.property.propertyPictures[0]}`}
        alt=""
      />
      
    </Box>
    <Box
      paddingRight={{
        xl: '2rem',
        md: '2rem',
        xs: '1rem',
      }}
      paddingLeft={{
        xl: '2rem',
        md: '2rem',
        xs: '1rem',
      }}
      width={{
        xl: '61.50%',
        md: '61.50%',
        sm: '90%',
        xs: '100%',
      }}
      margin="auto"
    >
      <Box
        marginBottom={{
          md: '1rem',
        }}
      >
        <Box
          fontSize={{ md: '1.5rem', sm: '1.9rem', xs: '1.4rem' }}
          className="aboutPlace__header"
          sx={{
            fontFamily: 'Open Sans',
            fontStyle: 'normal',
            fontWeight: '600',
            lineHeight: '1.5em',
            color: '#000000',
          }}
        >
          {item.property.propertyName}
        </Box>
      </Box>

      <Box display="flex" justifyContent="space-between">
        <Box textAlign="left">
          <Typography
            fontSize={{
              xl: '1.125rem',
              md: '1.125rem',
              sm: '1rem',
              xs: '0.8rem',
            }}
            marginBottom="0.5rem"
            fontWeight="300"
            color="#383838"
          >
            No. of guests :{' '}
            <span style={{ color: fourColorPalette[index % 4].medium }}>
              {item?.requestData.guestCount}
            </span>
          </Typography>
          <Typography
            fontSize={{
              xl: '1.125rem',
              md: '1.125rem',
              sm: '1rem',
              xs: '0.8rem',
            }}
            fontWeight="300"
            color="#383838"
            textTransform='capitalize'
          >
            Guest type :{' '}
            <span style={{ color: fourColorPalette[index % 4].medium }}>
              {item?.inquiry.groupType.replaceAll('_',' ')}
            </span>
          </Typography>
        </Box>
        <Box textAlign="left">
          <Typography
            fontSize={{
              xl: '1.125rem',
              md: '1.125rem',
              sm: '1rem',
              xs: '0.8rem',
            }}
            fontWeight="300"
            marginBottom="0.5rem"
            color="#383838"
          >
            Time :{' '}
            <span style={{ color: fourColorPalette[index % 4].medium }}>
              {new Date(item.requestData.bookingFrom).toLocaleTimeString('default', {
                hour: 'numeric',
                minute: 'numeric',
                hour12: true,
              })}{' '}
              -{' '}
              {new Date(item.requestData.bookingTo).toLocaleTimeString('default', {
                hour: 'numeric',
                minute: 'numeric',
                hour12: true,
              })}
            </span>
          </Typography>
          <Typography
            fontSize={{
              xl: '1.125rem',
              md: '1.125rem',
              sm: '1rem',
              xs: '0.8rem',
            }}
            fontWeight="300"
            color="#383838"
          >
            Date :{' '}
            <span style={{ color: fourColorPalette[index % 4].medium }}>
              {new Date(item.requestData.bookingFrom)
                .toLocaleDateString('default', {
                  year: 'numeric',
                  month: 'numeric',
                  day: 'numeric',
                })
                .split('/')
                .join('.')}
            </span>
          </Typography>
        </Box>
      </Box>
      <Box
        display="flex"
        gap="0.625rem"
        justifyContent="flex-end"
        marginTop="1.5rem"
        marginBottom="1.5rem"
      >
        <Button
          sx={{
            border: '0',
            background: fourColorPalette[index % 4].light,
            outline: 'none',
            borderRadius: '6px',
            paddingX: '4vw',
            textTransform: 'none',
            fontSize: '1rem',
            cursor: 'pointer',
            color: fourColorPalette[index % 4].dark,
            fontWeight: '600',
            width: '33.3%',
            fontFamily: 'Open Sans',
            height: '40px',
            '@media (max-width: 430px)': {
              fontSize: '0.75rem',
            },
            '@media (max-width: 342px)': {
              fontSize: '0.5rem',
            },
          }}
          onClick={onClickDetails}
        >
          Details
        </Button>
      </Box>
        <Box
          marginTop={{
            xl: '1.25rem',
            md: '1.25rem',
            sm: '0.688rem',
            xs: '0.688rem',
          }}
        >
          <Divider
            // sx={{
            //   borderColor: '#EECBBC',
            //   '@media (min-width: 900px)': {
            //     display: 'none',
            //   },
            // }}
          />
          <Accordion
            expanded={expanded === 'panel1'}
            onChange={handleChange('panel1')}
            sx={{
              background: 'transparent',
              border: 'none',
              boxShadow: 'none',
            }}
          >
            <AccordionSummary
              sx={{
                margin: 0,
                padding: '0px',
              }}
              expandIcon={
                <ExpandMoreIcon
                  sx={{
                    color:'inherit'
                  }}
                />
              }
              aria-controls="panel1bh-content"
              id="panel1bh-header"
            >
              <Typography
                color={fourColorPalette[index % 4].dark}
                fontSize={{
                  xl: '1rem',
                  md: '1rem',
                  sm: '0.75rem',
                  xs: '0.75rem',
                }}
                fontFamily="Open Sans"
                fontWeight="400"
                lineHeight={{
                  xl: '34px',
                  md: '34px',
                  sm: '16px',
                  xs: '16px',
                }}
              >
                Why did my booking got cancelled?
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography
              color={fourColorPalette[index % 4].medium}
                fontSize={{
                  xl: '1rem',
                  md: '1rem',
                  sm: '0.75rem',
                  xs: '0.75rem',
                }}
                fontFamily="Open Sans"
                fontWeight="400"
                lineHeight={{
                  xl: '34px',
                  md: '34px',
                  sm: '16px',
                  xs: '16px',
                }}
              >
                {item?.cancellationReason?.length !== 0 ? item?.cancellationReason :'No Reason Given'}
              </Typography>
            </AccordionDetails>
          </Accordion>
        </Box>
    </Box>
  </Box>
  )
}

export default CancelledCard
