import React from 'react'
import {Box,Typography} from '@mui/material'
const BookingCard = () => {
  return (
    <div><Box
                              
    
    sx={{width: {xs:'100%', sm:'100%',md:'564px',xl:'482ypx'}}}
    border="0.5px solid #868686"
    borderRadius="5px"
    padding={{
      xl: '1.25rem',
      md: '0.8rem',
      sm: '1.25rem',
      xs: '1.25rem 0',
    }}
    gap={{
      xl: '1.75rem',
      md: '0.8rem',
      sm: '1.75rem',
      xs: '0.75rem',
    }}
    
    display="flex"
  
  >
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
      gap="0.625rem"
      paddingLeft={{
        sm: '0rem',
        xs: '1rem',
      }}
    >
      <img
        style={{
          width:
            window.innerWidth > 600 ? '8vw' : '30vw',
          objectFit: 'fill',
          objectPosition: 'center',
          borderRadius: '5px',
        }}
        src={``}
        alt=""
        height="100vh"
      />
    </Box>
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="space-around"
    >
      <Box>
        <Typography
          fontSize={{
            xs: '1.25rem',
          }}
          sx={{
            '@media (max-width: 1024px)': {
              fontSize: '0.8rem',
            },
          }}
          lineHeight="1.4em"
          fontWeight={600}
          fontFamily="Open Sans"
          color="#000000"
        >
          dfgfgfdg
        </Typography>
        <Typography
          fontSize="0.75rem"
          lineHeight="1.2em"
          fontWeight={400}
          fontFamily="Open Sans"
          color="#383838"
          marginBottom="0.569rem"
        >
          hhhh
        </Typography>
      </Box>
      <Box>
        <Typography
          fontSize="0.875rem"
          lineHeight="1.3em"
          fontWeight={400}
          fontFamily="Open Sans"
          marginBottom="0.569rem"
          color="#656565"
          letterSpacing="0.02em"
        >
          Price:{' '}
          <span
            style={{
              fontWeight: '800',
            }}
          >
            ₹
          </span>
        </Typography>
      </Box>
    </Box>
</Box></div>
  )
}

export default BookingCard