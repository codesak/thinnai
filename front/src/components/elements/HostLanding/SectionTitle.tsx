import { Box, Typography } from '@mui/material'

const SectionTitle = ({ subTitle, title }: any) => {
  return (
    <Box>
      <Typography
        fontFamily="Montserrat"
        lineHeight={{
          xl: '29px',
          md: '29px',
          sm: '20px',
          xs: '20px',
        }}
        fontSize={{
          xl: '24px',
          md: '24px',
          sm: '16px',
          xs: '16px',
        }}
        fontWeight="400"
        color="rgba(0, 0, 0, 0.5)"
      >
        {subTitle}
      </Typography>
      <Typography
        fontFamily="Montserrat"
        lineHeight={{
          xl: '52px',
          md: '52px',
          sm: '29px',
          xs: '29px',
        }}
        fontSize={{
          xl: '43px',
          md: '43px',
          sm: '24px',
          xs: '24px',
        }}
        fontWeight={600}
        color="black"
      >
        {title}
      </Typography>
    </Box>
  )
}

export default SectionTitle
