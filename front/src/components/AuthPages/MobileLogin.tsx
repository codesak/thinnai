import { Box, Button, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../utils/routing/routes";

interface MobileLoginProps {
    previousState: any;
}

const MobileLogin = ({previousState}:MobileLoginProps )=> {
    const navigate = useNavigate()
  return (
    <Box width="--webkit-fill-available">
      <Box display={{xs:'flex', sm:'none'}} flexDirection='column' gap='5rem' padding='3rem 2rem'>
        <Button  onClick={()=>previousState()} sx={{alignSelf:'flex-start'}}>
          <img src="assets/images/detail/arrowBack.svg" alt="" /> <Typography paddingLeft='.5rem' fontFamily='Montserrat' fontStyle='normal' fontWeight='700' fontSize='28px' lineHeight='32px' color='#272F3D' textTransform='capitalize'>Back</Typography>
        </Button>

        <Box>
          <img src="assets/images/loginfirst.svg" alt="img" />
        </Box>

        <Box display='flex' gap='1.2rem' flexDirection='column' justifyContent='center' alignItems='center' marginBottom='3rem'>
          <Typography fontFamily='Montserrat' fontStyle='normal' fontWeight='700' fontSize='22px' lineHeight='27px' color='#272F3D' textTransform='capitalize'>Login</Typography>
          <Typography fontFamily='Open Sans' fontStyle='normal' fontWeight='500' fontSize='14px' lineHeight='22px' color='#50555C' textTransform='capitalize' whiteSpace='nowrap'>
            You should login first to book your thinnai <br /> space or to start
            conversation with the host{" "}
          </Typography>

          <Button onClick={()=>{navigate(ROUTES.LOGIN)}} sx={{ curser:'pointer', marginTop:'1.8rem', width:'9rem', background:'#1A191E', borderRadius:'100px', color:'#ffffff', fontFamily: 'Open Sans', fontWeight:'500', fontSize:'17px', lineHeight:'27px', textTransform:'capitalize'}}>Login</Button>
        </Box>
      </Box>
    </Box>
  );
};

export default MobileLogin;
