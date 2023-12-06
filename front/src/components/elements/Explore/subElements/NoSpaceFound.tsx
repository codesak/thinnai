import { Box, Typography } from '@mui/material'
import React from 'react'

const NoSpaceFound = () => {
  return (
    <>
    <Box display='flex' flexDirection={{xs:'column',sm:'row'}} alignItems='center' gap={{xs:'16px', sm:'48px'}} width='100%' height='100%' border='2px solid #D9D9D9' borderRadius='10px' padding={{xs:'1rem', sm:'1.7rem 0rem 1.7rem 4rem'}}>

        <Box width={{xs:'55px',sm:'110px'}}><img style={{width:'100%', height:'100%', objectFit:'cover'}} src="assets/images/filterErrorIcon.svg" alt="img" /></Box>

        <Box gap={{xs:'16px',sm:'8px'}} display='flex' flexDirection='column'>
            <Typography fontFamily='Montserrat' fontStyle='normal' fontWeight='600' fontSize={{xs:'15px',sm:'25px'}} lineHeight={{xs:'18px',sm:'35px'}} color='#000000' textTransform='capitalize' textAlign={{xs:'center', sm:'left'}} whiteSpace='nowrap'>Oops! it’s time to relax, the filters.   </Typography>
            <Typography width={{xs:'80vw',sm:'100%'}} fontFamily='Montserrat' fontStyle='normal' fontWeight='400' fontSize={{xs:'12px',sm:'20px'}} lineHeight={{xs:'18px',sm:'30px'}} color='#000000' textAlign={{xs:'center', sm:'left'}}>Kindly change or remove few filters applied to look at more spaces in your preferred locality.</Typography>
        </Box>

    </Box>
    </>
  )
}

export default NoSpaceFound