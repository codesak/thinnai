import { Button, useMediaQuery } from '@mui/material'
import Box from '@mui/material/Box'
import React, { useCallback } from 'react';
import CssBaseline from '@mui/material/CssBaseline'
import Grid from '@mui/material/Grid'
import { Dispatch, useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { Autoplay, Navigation, Pagination } from 'swiper'
import 'swiper/css'
import 'swiper/css/pagination'
import { Swiper, SwiperSlide } from 'swiper/react'
import { loadPropertyWithSlug } from '../../actions/details'
import { RootState } from '../../store'
import { ROUTES } from '../../utils/routing/routes'
import AboutPlace from '../elements/Detail/AboutPlace'
import Book from '../elements/Detail/Book'
import LoadingAboutPlace from '../elements/Detail/LoadingAboutPlace'
import BottomButtonPaymentSummary from '../elements/Detail/mobileSubElements/BottomButtonPaymentSummary'
import PropertyPicturesCarousel from '../elements/Detail/subElements/PropertyPicturesCarousel'
import NavBar from '../elements/Explore/NavBar'
import Search from '../elements/Explore/Search'
import '../styles/Detail/detail.css'
import '../styles/Detail/detail.scss'
import { S3_BASE_URL } from '../../utils/consts'
import Whatsapp from '../elements/Common/Whatsapp'
import ImageViewer from 'react-simple-image-viewer'
import PaymentProcessingModal from '../elements/Payment/PaymentProcessingModal';
import '../../components/styles/Detail/picCarousel.scss'

import ImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';
import Modal from '@mui/material/Modal';
import CloseIcon from '@mui/icons-material/Close';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '100%',
  height:'100%',
  bgcolor: 'black',
  border: 'none',
  boxShadow: 24,
  p: 1,
  display:'flex',
  justifyContent:'center',
  alignItems:'center',
  flexDirection:'column'
}

const Detail = () => {
  const dispatch: Dispatch<any> = useDispatch()
  const navigate = useNavigate()
  const { propertySlug } = useParams<{ propertySlug: string }>()
  const xsDevice = useMediaQuery('(max-width:382px)')

  const property = useSelector<RootState, any>(
    (state) => state.details.property
  )
  const detailsLoading = useSelector<RootState, boolean>(
    (state) => state.details.loading
  )
  const appSettingsLoading = useSelector<RootState, boolean>(
    (state) => state.appSettings.loading
  )

  useEffect(() => {
    if (!property._id && detailsLoading === false) {
      if (propertySlug) {
        dispatch(
          loadPropertyWithSlug(propertySlug, () => navigate(ROUTES.EXPLORE))
        )
      } else {
        navigate(ROUTES.EXPLORE)
      }
    }
  }, [detailsLoading])

  //To Open Search Options
  const [searchState, setSearchState] = useState(false)

  const openSearch = () => {
    setSearchState(true)
  }

  //Responsive Booking Menu FullScreen
  const [viewBook, setViewBook] = useState(false)

  useEffect(() => {
    function handleResize() {
      window.innerWidth >= 900 && setViewBook(false)
    }
    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  })
  
    useEffect(() => {
      window.scrollTo(0, 0);
    }, []);
 
  const myRef = useRef<null | HTMLDivElement>(null)
  useEffect(() => {
    if (myRef.current != null) {
      myRef.current.scrollTo(0, 0)
      window.scrollTo(0, 0)
    }
  }, [viewBook])

  //To change SearchBar to Searched Details
  const [stateSearched, setStateSearched] = useState(false)
  const searched = () => {
    setSearchState(false)
    setStateSearched(true)
  }

  const parentRef = useRef<null | HTMLDivElement>(null)

  // at least 4 images required
  const propertyPictures: string[] = useSelector(
    (state: RootState) => state.details.property.propertyPictures
  )
  //full images viewer
  const [startIndex, setStartIndex] = useState(0)
  const [currentImage, setCurrentImage] = useState(0);
    const [isViewerOpen, setIsViewerOpen] = useState(false);
    const openImageViewer = useCallback((index) => {
      setCurrentImage(index);
      setIsViewerOpen(true);
      
      setStartIndex(index)
      handleOpen()
    }, []);
  
    const closeImageViewer = () => {
      setCurrentImage(0);
      setIsViewerOpen(false);
    };
    const [imageMaker, setImageMaker] = useState<any>([])
    for(let i=0;i<propertyPictures?.length;i++){
      const data = {
        original: `${S3_BASE_URL + propertyPictures[i]}`,
        thumbnail: `${S3_BASE_URL + propertyPictures[i]}`,
      }
     imageMaker.push(data)
    }
    const [encReqURL, setEncReqURL] = useState('')
    const [hasIFrameLoaded, setHasIFrameLoaded] = useState(false)


    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => {
      setOpen(false);
      setIsViewerOpen(false);
      
    };
  return (
    <Box ref={parentRef} position="relative">
      <PaymentProcessingModal
        hasIFrameLoaded={hasIFrameLoaded}
        setHasIFrameLoaded={setHasIFrameLoaded}
        encReqURL={encReqURL}
      />
      {/* <Whatsapp/> */}
      {(detailsLoading || appSettingsLoading || !property) && <LoadingAboutPlace />}
      {!detailsLoading && !appSettingsLoading && (
        <>
        <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        disableScrollLock={true}
      >
        <Box sx={style} className="imgView">
      <div className='button__' onClick={()=>handleClose()}><CloseIcon/></div>
        <ImageGallery 
         items={imageMaker}  
         startIndex={startIndex}
         infinite={false}
         lazyLoad={true}
         showThumbnails={false}
         showFullscreenButton={false}
         useBrowserFullscreen={false}
         showPlayButton={false}
         disableThumbnailScroll={true}
         />
        </Box>
      </Modal>
          <Box fontFamily="Montserrat" ref={myRef} fontStyle="normal">
            {!viewBook && (
              <>
                <Box
                  height={50}
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
                    <Button onClick={() => navigate(ROUTES.EXPLORE)}>
                      <img src="/assets/images/detail/arrowBack.svg" alt="" />
                    </Button>
                  </Box>
                </Box>
                <Box
                  display={{
                    xs: 'block',
                    sm: 'none',
                  }}
                >
                  <Swiper
                    pagination={{
                      clickable: true,
                    }}
                    style={{
                      width: '96%',
                      borderRadius: '10px',
                      height: 'fit-content',
                    }}
                    autoplay={false}
                    draggable={true}
                    navigation={true}
                    modules={[Pagination, Autoplay, Navigation]}
                    className="mySwiper img-swiper"
                  >
                    {propertyPictures?.map((item, index) => (
                      <SwiperSlide 
                      key={index}
                        style={{
                          width: '100%',
                          height: xsDevice ? '30vh' : '40vh',
                          marginTop: '0',
                        }}
                      >
                        <img
                        id={index + 'i'}
                        onClick={ () => openImageViewer(index) }
                          style={{
                            width: '100%',
                            margin: 'auto',
                            height: '100%',
                          }}
                          src={`${S3_BASE_URL}${item}`}
                          alt="img"
                        />
                      </SwiperSlide>
                    ))}
                  </Swiper>
                </Box>
              </>
            )}
            <Box
              position="relative"
              display={{ xl: 'block', md: 'block', sm: 'block', xs: 'none' }}
              margin={{
                xl: '0 2.5rem',
                md: '0 2.5rem',
                sm: '0 2rem',
                xs: '0 1.5rem',
              }}
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
                  display={{ md: 'block', xs: 'none' }}
                  position="absolute"
                  width={{
                    xl: '485px',
                    md: '450px',
                    sm: '485px',
                    xs: '485px',
                  }}
                  top="315%"
                  left={{
                    xl: '47.6%',
                    md: '44.9%',
                    sm: '47.6%',
                    xs: '47.6%',
                  }}
                  sx={{ transform: 'translate(-50%, -50%)' }}
                  zIndex="5"
                >
                  <Search onClick={searched} />
                </Box>
              )}
            </Box>
            {!viewBook && (
              <Box
                sx={{
                  marginLeft: {
                    xl: '7rem',
                    md: '3.5rem',
                    sm: '2rem',
                  },
                  marginRight: {
                    xl: '7rem',
                    md: '3.5rem',
                    sm: '2rem',
                  },
                }}
                position="relative"
              >
                {searchState && (
                  <Box
                    position="absolute"
                    onClick={() => setSearchState(false)}
                    sx={{
                      background: 'rgba(0, 0, 0, 0.63)',
                      top: 0,
                      bottom: 0,
                      left: 0,
                      right: 0,
                      zIndex: 3,
                    }}
                  />
                )}
                <Box height={{ xl: 20, md: 20, sm: 0, xs: 0 }} />
                <Box
                  display="flex"
                  justifyContent="center"
                  marginX={{
                    xl: '4.938rem',
                    md: '4.938rem',
                    sm: '1.875rem',
                    xs: '1rem',
                  }}
                >
                  <Box
                    // borderRadius={{ xs: '20px' }}
                    // height={{ xl: '45vh', md: '45vh', sm: '30vh', xs: '30vh' }}
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    width="100%"
                    sx={{ overflow: 'hidden' }}
                    margin={{
                      xl: '0 0rem',
                      md: '0 0rem',
                      sm: '0 1rem',
                      xs: '0 1.5rem',
                    }}
                  >
                    <Box
                      display={{
                        xs: 'none',
                        sm: 'block',
                      }}
                      width="100%"
                      className="photoCarousel"
                      // maxHeight='50vh'
                    >
                      <PropertyPicturesCarousel />
                    </Box>
                  </Box>
                </Box>
                <Box height={{ xl: 50, md: 50, sm: 0, xs: 0 }} />
                <Box
                  marginX={{
                    xl: '4.938rem',
                    md: '4.938rem',
                    sm: '1.875rem',
                    xs: '1rem',
                  }}
                >
                  <Grid container>
                    <CssBaseline />
                    <Grid item xl={7.5} md={7.5} sm={12} xs={12}>
                      <AboutPlace/>
                    </Grid>
                    <Grid
                      item
                      xl={4.5}
                      md={4.5}
                      sm={false}
                      xs={false}
                      display={{
                        xl: 'block',
                        md: 'block',
                        sm: 'none',
                        xs: 'none',
                      }}
                    >
                      <Box
                        position={{
                          xl: 'sticky',
                          md: 'sticky',
                        }}
                        top={'2rem'}
                        marginBottom="1rem"
                      >
                        <Book />
                      </Box>
                    </Grid>
                  </Grid>
                </Box>
              </Box>
            )}
            {/* Mobile Only*/}
            {viewBook && (
              <Box display={{ xs: 'block', md: 'none' }}>
                <Book
                  dataFromDetails={viewBook}
                  setViewBookFromDetails={setViewBook}
                />
              </Box>
            )}

            {/* Shown in Book component above to handle navigation internally */}
            {!viewBook && (
              <BottomButtonPaymentSummary
                viewBook={viewBook}
                setViewBook={setViewBook}
                onNextBooking={null}
              />
            )}
          </Box>
        </>
      )}
    </Box>
  )
}

export default Detail
