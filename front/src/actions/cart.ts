import axios from 'axios'
import { Dispatch } from 'redux'
import { TOKEN_KEY } from '../utils/consts'
import setAuthToken from '../utils/setAuthToken'
export const getCart = () => async (dispatch: Dispatch<any>) => {
    try {
        const response = await axios.get('/api/cart/getCart');
        const data = response.data;
        dispatch({type:'FETCH_CART',payload: data})
    } catch (error) {
        dispatch({type:'CLEAR_CART'})
    }
    
}



export const deleteEnquiryInCart =
  (enquiryId: number) => async (dispatch: Dispatch<any>) => {
    try {
      const res = await axios.delete(`/api/cart/removeEnquiry/${enquiryId}`)

      dispatch({ type: 'DELETE_ENQUIRY', payload: enquiryId })
    } catch (error) {
      console.log(error)
    }
  }

export const clearCart = () => async (dispatch: Dispatch<any>) => {
  try {
    const res = await axios.delete(`/api/cart`)
    dispatch({ type: 'CLEAR_CART' })
  } catch (error) {
    console.log(error)
  }
}

export const getProperties = () => async (dispatch: Dispatch<any>) => {
  try {
    const res = await axios.post(`/api/property/guest/properties`, {
      directBooking: true,
    })
    dispatch({ type: 'DIRECT_BOOKING_PROPERTIES', payload: res.data })
  } catch (error) {
    console.log(error)
  }
}

export const highestPriceProp = () => async (dispatch: Dispatch<any>) => {
  try {
    const response = await axios.get('/api/cart/getCart');
    const cart = response.data.enquiries
    if(cart.length > 0) {
      let highest:any = {}
      let max:number=0;
      cart.forEach((item:any)=> {
        let temp:any = Object.values(item.priceBreakdown).reduce((total:any,value:any) => {
          return total+value
        },0)

        const {addOnServicePrice,cleaningPrice,cutleryDiscount,gstAmount,nominalPrice,serviceCharge,totalPrice} = item.priceBreakdown
        if(max < temp) {
          max=Number(temp.toFixed(2))
          highest = item
        }
        let round = null;
        if(totalPrice) {
          round = serviceCharge+gstAmount+totalPrice
        }
        else {
          round = addOnServicePrice+cleaningPrice+cutleryDiscount+gstAmount+nominalPrice+serviceCharge
        }
        highest.actualAmount = Number(round.toFixed(2))
      })
      dispatch({type:'HIGHEST_PROP',payload: highest})
    }
    else {

    }
  } catch(error) {
    console.log(error)
  }
}

