import Payment from '../../models/Payment'
import { Types } from 'mongoose'

const recordPayment = async (paymentRecordData: {
  host: string
  guest: string
  paymentDate: string
  paymentAmount: string
  paymentMode: string // 'Wallet', 'Bank', 'Wallet+Bank'
  paymentType: string // 'Credited', 'Debited'
  paymentDescription: string
}) => {
  //**********************************Handler Code**********************************/
  try {
    const {
      host,
      guest,
      paymentDate,
      paymentAmount,
      paymentMode,
      paymentType,
      paymentDescription,
    } = paymentRecordData

    let payments = await Payment.findOne({ user: guest })

    const txDate = new Date(paymentDate)
    const hostId = new Types.ObjectId(host)
    const paymentAmountNumber = Number(paymentAmount)

    if (
      txDate &&
      hostId &&
      paymentAmountNumber &&
      paymentMode &&
      paymentType &&
      paymentDescription
    ) {
      if (!payments) {
        payments = new Payment({
          user: guest,
        })
      }

      payments.payments.push({
        host: hostId,
        paymentDate: txDate,
        paymentAmount: paymentAmountNumber,
        paymentMode,
        paymentType,
        paymentDescription,
      })

      await payments.save()

      return payments
    } else {
      throw new Error('Invalid payment record data')
    }
  } catch (err) {
    console.error(`Err recordPayment:`, err)
    throw new Error('Error in recordPayment:' + err)
  }
}
export default recordPayment
