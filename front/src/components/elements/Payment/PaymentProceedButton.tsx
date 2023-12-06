import { Button } from '@mui/material'
import { Dispatch, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { sendEnquiries } from '../../../actions/enquiry'
import { recordPayment } from '../../../actions/payment'
import { startLoading } from '../../../actions/root'
import { RootState } from '../../../store'
import { ROUTES } from '../../../utils/routing/routes'
import { v4 as uuid } from 'uuid'
import payment from '../../styles/Payment/payment.module.css'
import axios from 'axios'

const PaymentProceedButton = ({ setEncReqURL, onClickReserve, groupType }: { setEncReqURL: any, onClickReserve?:any, groupType?:any }) => {
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
  const amount = useSelector<RootState, any>(
    (state) => state.cart.highestProp.actualAmount
  )
  

  const onClick = async () => {
    if (groupType) {
      onClickReserve()
    }
    const orderId = uuid()
    const DUMMY_ORDER_INFO = {
      orderId: orderId,
      payableAmount: amount ?? 1,
      merchant_param1: 'test_host',
      merchant_param2: 'test_guest',
      merchant_param3: 'test_payment_description',
    }
    try {
      const MINUTES: number = 1
      const res = await axios.post(
        '/api/ccavenue/encrypt',
        {
          ...DUMMY_ORDER_INFO,
        },
        {
          headers: {
            idempotency_key: '1234567890', // TODO: should be a booking id (unique for a given place and time slot)
          },
          timeout: MINUTES * 60000,
        }
      )
      setEncReqURL(res.data)
      await dispatch(startLoading('LOADING_DETAILS'))
      //   await dispatch(
      //     recordPayment({ host: enquiries[index].host, paymentAmount: amount })
      //   )
      // TODO: send enquiries with unpaid status
      // dispatch(sendEnquiries(() => navigate(ROUTES.CONGRATULATIONS)))
    } catch (error: any) {
      if (error.code === 'ECONNABORTED') {
        // Handle timeout error
      } else {
        console.error(error)
      }
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

export default PaymentProceedButton
