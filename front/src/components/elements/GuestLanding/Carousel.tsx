import { loadProperty } from '../../../actions/details'
import { startLoading } from '../../../actions/root'
import { RootState } from '../../../store'
import { ROUTES } from '../../../utils/routing/routes'
// import GroupsIcon from '@mui/icons-material/Groups';
// import StarIcon from '@mui/icons-material/Star';
// import PanoramaFishEyeIcon from '@mui/icons-material/PanoramaFishEye';
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import CssBaseline from '@mui/material/CssBaseline'
import Grid from '@mui/material/Grid'
import { motion } from 'framer-motion'
import { Dispatch } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { S3_BASE_URL } from '../../../utils/consts'

interface props {
  onClick?: () => void
}

interface spaceProps {
  id: string
  propertyPictures: string[]
  propertyName: string
  slugString: string
  city: string
  state: string
  price: number
}

const Carousel = ({ onClick }: props) => {
  const dispatch: Dispatch<any> = useDispatch()
  const navigate = useNavigate()

  const spaces: spaceProps[] = useSelector<RootState, spaceProps[]>(
    (state) => state.landing.spaces
  )

  const leftScroll = () => {
    var slide = document.getElementById('carousel') as HTMLElement
    slide.scrollLeft = slide.scrollLeft - 684
  }
  const rightScroll = () => {
    const slide = document.getElementById('carousel') as HTMLElement
    slide.scrollLeft = slide.scrollLeft + 450
  }

  const handleClick = (id: string, slug: string) => {
    dispatch(startLoading('LOADING_DETAILS'))
    dispatch(
      loadProperty(id, () => navigate(ROUTES.PROPERTY_DETAIL + `/${slug}`))
    )
  }

  return (
    <Box
      marginTop={{
        xl: '0px',
        md: '0px',
        sm: '3.125rem',
        xs: '0px',
      }}
      padding={{ md: 14, xs: '3.25rem 2.5rem' }}
      sx={{ position: 'relative' }}
    >
      <Box
        position="absolute"
        width="100%"
        left="0"
        top={{ md: '0', sm: '130px', xs: '130px' }}
      >
        <Box height={{ sm: 80, xs: 90 }} />
        <img
          style={{ width: '100%' }}
          src="/assets/images/page/Vector1.svg"
          alt=""
        />
      </Box>
      <Box
        position="absolute"
        width="100%"
        left="0"
        top={{ md: '0', xs: '130px' }}
      >
        <Box height={{ sm: 100, xs: 120 }} />
        <img
          style={{ width: '100%' }}
          src="/assets/images/page/Vector2.svg"
          alt=""
        />
      </Box>
      <Box>
        <Box
          fontSize={{ md: '2.25rem', xs: '2.25rem' }}
          textAlign={{ xs: 'center', md: 'left' }}
          sx={{
            fontStyle: 'normal',
            fontWeight: '600',
            lineHeight: '52px',
          }}
          marginBottom={{
            xs: '1rem',
          }}
        >
          Explore Spaces
        </Box>
      </Box>
      <Box
        display="flex"
        justifyContent={{ md: 'flex-start', xs: 'space-between' }}
        gap={3}
        sx={{
          position: 'absolute',
        }}
        right={{ md: '100px', xs: '0px' }}
        top={{ md: '50px', xs: '45%' }}
        width={{ md: 'auto', xs: '100%' }}
        zIndex="1"
      >
        <Box
          onClick={leftScroll}
          display="flex"
          alignItems="center"
          justifyContent="center"
          color="#1A191E"
          width={{ md: '55px', xs: '36px' }}
          sx={{
            background: 'white',
            aspectRatio: '1',
            cursor: 'pointer',
            boxShadow: '0px 2px 20px rgba(61, 58, 53, 0.12)',
            borderRadius: '50%',
          }}
        >
          <ArrowBackIcon
            sx={{
              fontSize: '1.375rem',
              '@media (max-width: 410px)': {
                fontSize: '1.125rem',
              },
            }}
          />
        </Box>
        <Box
          onClick={rightScroll}
          display="flex"
          alignItems="center"
          justifyContent="center"
          color="white"
          width={{ md: '55px', xs: '36px' }}
          sx={{
            background: '#1A191E',
            aspectRatio: '1',
            cursor: 'pointer',
            // width:'55px',
            borderRadius: '50%',
          }}
        >
          <ArrowForwardIcon
            sx={{
              fontSize: '1.375rem',
              '@media (max-width: 410px)': {
                fontSize: '1.125rem',
              },
            }}
          />
        </Box>
      </Box>
      <Box padding={{ xl: '0 0.625rem' }} marginLeft="-45px">
        <Grid
          container
          gap={{ md: 12, xs: 3 }}
          padding={{
            md: '1.875rem 5.125rem',
            sm: '1.875rem 1rem',
            xs: '1.875rem 0px',
          }}
          wrap="nowrap"
          direction="row"
          className="carousel-cont"
          id="carousel"
          sx={{
            overflowX: 'scroll',
            '&::WebkitScrollbar': { display: 'none' },
            scrollBehavior: 'smooth',
          }}
        >
          <CssBaseline />
          {spaces.map((item: any, index: number) => (
            <Grid
              item
              key={index}
              xl={4}
              md={4}
              xs={12}
              display="flex"
              flexDirection="column"
              component={motion.div}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.2,
                default: { ease: 'linear' },
              }}
              flexGrow="1"
              padding={1.8}
              minWidth={{ md: '330px', sm: '310px', xs: '97%' }}
              width="100%"
              sx={{
                borderRadius: '6px',
                border: '1px dashed #000000',
                background: '#FFFFFF',
                zIndex: '1',
              }}
              className="carousel__slide"
              onClick={() => {
                handleClick(item._id, item.slugString)
              }}
            >
              <Box
                margin="auto"
                width="100%"
                height="210px"
                sx={{ position: 'relative' }}
              >
                <img
                  style={{
                    width: '100%',
                    height: '100%',
                    borderRadius: '6px',
                    objectFit: 'cover',
                  }}
                  src={`${S3_BASE_URL}${item.propertyPictures[0]}`}
                  alt=""
                />
                {/* <Box sx={{position:'absolute',bottom:'2px',left:'5px',color:'white',fontWeight:'700'}}>
                            {item.name}<StarIcon fontSize="small"/>
                          </Box> */}
              </Box>
              <Box height={10} />
              <Box display="flex" flexDirection="column">
                <Box
                  display="flex"
                  justifyContent="space-between"
                  padding={1.2}
                >
                  <Box display="flex" flexDirection="column" gap={1}>
                    <Box sx={{ color: '#000000', fontWeight: '700' }}>
                      {item.propertyName}
                    </Box>
                    <Box
                      sx={{
                        fontSize: '0.719rem',
                        fontWeight: '600',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.25rem',
                      }}
                    >
                      <LocationOnIcon style={{ fontSize: '0.875rem' }} />
                      {item.city}
                    </Box>
                    {/* <Box sx={{fontSize:'11.5px',fontWeight:'600',display:'flex',alignItems:'center',gap:'4px'}}><GroupsIcon style={{fontSize:"14px"}}/>{item.guests} Guests Allowed</Box> */}
                    {/* <Box>
                                    <PanoramaFishEyeIcon style={{fontWeight:'300',fontSize:'21px'}}/>
                                    <PanoramaFishEyeIcon style={{fontWeight:'300',fontSize:'21px'}}/>
                                    <PanoramaFishEyeIcon style={{fontWeight:'300',fontSize:'21px'}}/>
                                    <PanoramaFishEyeIcon style={{fontWeight:'300',fontSize:'21px'}}/>
                                    <PanoramaFishEyeIcon style={{fontWeight:'300',fontSize:'21px'}}/>
                                </Box> */}
                  </Box>
                  <Box width={{ xl: '30%' }}>
                    <Box
                      sx={{
                        fontSize: '0.469rem',
                        textAlign: 'center',
                        fontWeight: '600',
                        marginBottom: '2px',
                      }}
                    >
                      Price Starting From
                    </Box>
                    <Button
                      variant="contained"
                      style={{
                        background: '#FFFFFF',
                        color: '#000000',
                        borderRadius: '6px',
                        border: '0.5px solid #000000',
                        fontWeight: '700',
                        width: '100%',
                        height: '28px',
                      }}
                    >
                      ₹{item.price}
                    </Button>
                  </Box>
                </Box>
                {/* <Box sx={{fontSize:'10.5px',padding:'0 10px'}}>{item.description}</Box> */}
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>
      <Box height={20} />
      <Box display="flex">
        <Button
          variant="contained"
          sx={{
            transition: 'all 0.2s',
            margin: '0 auto',
            background: '#FFFFFF',
            color: '#000000',
            border: '1px solid #000000',
            fontFamily: 'Montserrat',
            fontStyle: 'normal',
            fontWeight: '600',
            fontSize: '1.125rem',
            lineHeight: '24px',
            borderRadius: '10px',
            textTransform: 'capitalize',
            padding: '0.563rem 2.188rem',
            '&:hover': {
              background: '#FFFFFF',
              boxShadow: '0px 12px 15px rgba(0, 0, 0, 0.1)',
              transform: 'scale(1.05)',
            },
          }}
          onClick={onClick}
        >
          View All Spaces
        </Button>
      </Box>
      {/* <Box
          padding={{md:'45px 135px',xs:'45px 20px'}}
          height={{md:'369px',xs:'189px'}}
          width={{md:'634px',xs:'294px'}}
          right={{md:'50px',xs:'15px'}}
          bottom={{md:'0',xs:'110px'}}
          borderRadius={{md:'80px 0 80px',xs:'80px 0 25px'}}
          sx={{
            background: '#F4CF97',
            mixBlendMode: 'normal',
            position:'absolute',
            zIndex:'-1'
          }}
          display='flex'
          justifyContent='flex-end'
          alignItems='flex-end'
        >
            <Box 
               sx={{
                fontFamily: 'Open Sans',
                fontStyle: 'normal',
                fontWeight: '600',
                lineHeight: '52px',
                textDecorationLine: 'underline',
               }}
               position='relative'
               display={{md:'block',xs:'none'}}
               top={{md:'0',xs:'90px'}}
               left={{md:'0',xs:'-45%'}}
               fontSize= {{md:'18px',xs:'14px'}}
            >
                Explore All
            </Box>
        </Box>
        <Box 
            sx={{
            fontFamily: 'Open Sans',
            fontStyle: 'normal',
            fontWeight: '600',
            lineHeight: '52px',
            textDecorationLine: 'underline',
            }}
            position='relative'
            display={{md:'none',xs:'block'}}
            top={{md:'0',xs:'50px'}}
            textAlign='center'
            // left={{md:'0',xs:'-45%'}}
            width='100%'
            fontSize= {{md:'18px',xs:'14px'}}
        >
            Explore All
        </Box>
        <Box  component='span' top={{md:'15px',xs:'45px'}} style={{display:'flex',width:'250px', height:'2px',background:'#1A191E',margin:'auto',position:'relative',}}/> */}
    </Box>
  )
}

export default Carousel
