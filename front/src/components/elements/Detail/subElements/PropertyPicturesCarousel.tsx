import Box from '@mui/material/Box'
import React, { useState, useCallback } from 'react';
import Grid from '@mui/material/Grid'
import { useSelector } from 'react-redux'
import { RootState } from '../../../../store'
import '../../../styles/Detail/picCarousel.css'
import { S3_BASE_URL } from '../../../../utils/consts'
import ImageViewer from 'react-simple-image-viewer'
import '../../../styles/Detail/picCarousel.scss'
import CloseIcon from '@mui/icons-material/Close';


import ImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';
import Modal from '@mui/material/Modal';

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
  p: 4,
}

function PropertyPicturesCarousel() {
  // at least 4 images required
  const propertyPictures: string[] = useSelector(
    (state: RootState) => state.details.property.propertyPictures
  )

  const [open, setOpen] = React.useState(false);
  const handleOpen = () =>{ setOpen(true);
  }
  const handleClose = () => {
    setOpen(false);
    setIsViewerOpen(false);
    
  };
  //full image viewer
  const [currentImage, setCurrentImage] = useState(0);
    const [isViewerOpen, setIsViewerOpen] = useState(false);
    const [startIndex, setStartIndex] = useState(0)
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
    
    


  return (
    <>
    <Grid container spacing={1} alignItems="center">
      {propertyPictures?.slice(0, 1).map((item, index) => (
        <Grid item xs={6} key={index}>
          <Box style={{ borderRadius: '11px', height: '59.1vh' }}>
            <img
              onClick={()=>openImageViewer(0)}
              style={{
                objectFit: 'cover',
                height: '100%',
                width: '100%',
                margin: 'auto',
                borderTopLeftRadius: '15px',
                borderBottomLeftRadius: '15px',
              }}
              src={`${S3_BASE_URL}${item}`}
              alt="img"
            />
          </Box>
        </Grid>
      ))}

      <Grid container item xs={6} columnSpacing={1} rowGap={1}>
        {propertyPictures?.slice(1).map((item, index) => (
          <Grid item xs={6} sx={{ height: '29vh' }} key={index+1}>
            <img
              // onClick={(e:any) => {
              //   e.target.requestFullscreen()
              // }}
              onClick={ () => openImageViewer(index+1) }
              style={{
                objectFit: 'cover',
                width: '100%',
                height: '100%',
                margin: 'auto',
                borderRadius: ['0', '0 15px 0 0', '0', '0 0 15px 0'][index % 4],
              }}
              src={`${S3_BASE_URL}${item}`}
              alt="img"
            />
          </Grid>
        ))}

       
      
        <Modal
        open={open}
        onClose={handleClose}
        disableScrollLock={true}
        disableEnforceFocus
      >
        <Box sx={style}>
      
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
         
      
      
   
        {/* <Grid item xs={6} sx={{ height: '29vh' }}>
					<img id="fullImg1"
					onClick={()=>{openFullScreen("fullImg1")}}
						style={{
							objectFit: 'cover',
							width: '100%',
							height: '100%',
							margin: 'auto',
						}}
						src={`${S3_BASE_URL}${propertyPictures[1]}`}
						alt=''
					/>
				</Grid>
				<Grid item xs={6} sx={{ height: '29vh' }}>
					<img id="fullImg2"
					onClick={()=>{openFullScreen("fullImg2")}}
						style={{
							objectFit: 'cover',
							height: '100%',
							width: '100%',
							margin: 'auto',
							borderTopRightRadius:'15px',
						}}
						src={`${S3_BASE_URL}${propertyPictures[2]}`}
						alt=''
					/>
				</Grid>
				<Grid item xs={6} sx={{ height: '29vh' }}>
					<img id="fullImg3"
					onClick={()=>{openFullScreen("fullImg3")}}
						style={{
							objectFit: 'cover',
							width: '100%',
							height: '100%',
							margin: 'auto',
						}}
						src={`${S3_BASE_URL}${propertyPictures[3]}`}
						alt=''
					/>
				</Grid>
				<Grid item xs={6} sx={{ height: '29vh' }}>
					<img id="fullImg4"
					onClick={()=>{openFullScreen("fullImg4")}}
						style={{
							objectFit: 'cover',
							height: '100%',
							width: '100%',
							margin: 'auto',
							borderBottomRightRadius:'15px',
						}}
						src={`${S3_BASE_URL}${propertyPictures[4]}`}
						alt=''
					/>
				</Grid> */}
      </Grid>
    </Grid>
    </>
  )
}

export default PropertyPicturesCarousel
