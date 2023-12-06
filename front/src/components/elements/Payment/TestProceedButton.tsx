import { Button } from '@mui/material'
import { Dispatch, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { sendEnquiries } from '../../../actions/enquiry'
import { recordPayment } from '../../../actions/payment'
import { startLoading } from '../../../actions/root'
import { RootState } from '../../../store'
import { ROUTES } from '../../../utils/routing/routes'
import payment from '../../styles/Payment/payment.module.css'
import axios from 'axios'

const DUMMY_ORDER_INFO = {
  orderId: 1,
  payableAmount: 100,
  name: 'test',
  phoneNumber: '1234567890',
  email: 'test@email.com',
  address: 'Hyderabad',
  city: 'Hyderabad',
  state: 'TG',
  pincode: 500001,
  merchant_param1: 'test_host',
  merchant_param2: 'test_guest',
  merchant_param3: 'test_payment_description',
  dummyParam: 'dummy_param_value',
}

const TestProceedButton = ({ setEncReqURL }: { setEncReqURL: any }) => {
  const dispatch: Dispatch<any> = useDispatch()
  const navigate = useNavigate()

  const enquiryLoading = useSelector<RootState, boolean>(
    (state) => state.enquiry.loading
  )
  const enquiries = useSelector<RootState, any>(
    (state) => state.enquiry.enquiries
  )
  const index = enquiries.reduce(
    (iMax: any, x: any, i: any, arr: any) =>
      x.amount > arr[iMax].amount ? i : iMax,
    0
  )
  const amount =
    useSelector<RootState, any>(
      (state) => state.enquiry.enquiries[index]?.amount
    ) ?? 0

  const onClick = async () => {
    try {
      const res = await axios.post('/api/ccavenue/encrypt', {
        ...DUMMY_ORDER_INFO,
      })
      // console.log('🚀 ~ file: ProceedButton.tsx:50 ~ onClick ~ res:', res)
      setEncReqURL(res.data)
      await dispatch(startLoading('LOADING_DETAILS'))
      //   await dispatch(
      //     recordPayment({ host: enquiries[index].host, paymentAmount: amount })
      //   )
      //   dispatch(sendEnquiries(() => navigate(ROUTES.CONGRATULATIONS)))
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <>
      <Button
        className={payment.proceedBtnDesktop}
        variant="contained"
        onClick={onClick}
        data-toggle="modal"
        data-target="#exampleModal"
      >
        {enquiryLoading ? 'Loading...' : 'Proceed'}
      </Button>
    </>
  )
}

export default TestProceedButton
