import { Box, Typography } from '@mui/material'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { RootState } from '../../store'
import PaymentSummary from '../elements/Payment/PaymentSummary'
import TestProceedButton from '../elements/Payment/TestProceedButton'
import PaymentProcessingModal from '../elements/Payment/PaymentProcessingModal'
import PaymentProceedButton from '../elements/Payment/PaymentProceedButton'

const TestPayment = () => {
  const enquiries = useSelector<RootState, any>(
    (state) => state.enquiry.enquiries
  )

  const [encReqURL, setEncReqURL] = useState('')
  // console.log('🚀 ~ file: Payment.tsx:44 ~ Payment ~ encReqURL:', encReqURL)
  const [hasIFrameLoaded, setHasIFrameLoaded] = useState(false)
  return (
    <>
      <PaymentProcessingModal
        hasIFrameLoaded={hasIFrameLoaded}
        setHasIFrameLoaded={setHasIFrameLoaded}
        encReqURL={encReqURL}
      />
      <Box
        paddingY={7}
        width={{
          xl: '60%',
          md: '80%',
          sm: '100%',
          xs: '100%',
        }}
        margin="auto"
      >
        <Typography variant="h4" align="center" gutterBottom={true}>
          Payment Testing
        </Typography>
        <PaymentProceedButton setEncReqURL={setEncReqURL} />
      </Box>
    </>
  )
}

export default TestPayment
