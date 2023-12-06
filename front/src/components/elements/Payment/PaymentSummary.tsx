import { Box, Divider } from '@mui/material'
import ProceedButton from './ProceedButton'
import SummaryData from './SummaryData'
import TotalAmount from './TotalAmount'

const PaymentSummary = ({amount}:any) => {
  return (
    <Box>
      <Box
        border="1px solid #C5C5C5"
        boxShadow="2px 4px 8px 7px rgba(0, 0, 0, 0.04)"
        borderRadius="20px"
        height="fit-content"
      >
        <Box padding="20px 20px 0px 20px">
          <Box marginBottom="40px" fontSize="24px" textAlign="center">
            Payment Summary
          </Box>
          <Divider />
        </Box>
        {/* Payment summary */}
        <SummaryData />
        <Box padding="0px 50px 50px 50px">
          <Divider />
          <TotalAmount/>
        </Box>
      </Box>
      <Box marginTop="51px" display="flex" justifyContent="center">
        <ProceedButton />
      </Box>
    </Box>
  )
}

export default PaymentSummary
