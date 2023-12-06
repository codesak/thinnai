import {Action} from '../utils/consts'
const initialState = {
    items:[],
    properties:[],
    amount: 0,
    bookingType: '',
    loading:true,
    highestProp:{}
};

const cartReducer = (state = initialState, action: Action) => {
    const {type,payload} = action;
    switch (type) {
        case 'LOADING_CART':
        {
            return {
                ...state,loading:true
            }
        }
        case 'FETCH_CART':
        {
            return {
                ...state,items:payload.enquiries,amount:payload.amount,bookingType: payload.bookingType,loading:false
            }
        }
        case 'DELETE_ENQUIRY':
            {
                const newEnquiries = state.items.filter(
                    (enquiry: any) => enquiry._id !== payload
                  )
                if (newEnquiries)
                  return {
                    ...state,items:newEnquiries,bookingType: ''
                  }
                  else return {
                    ...state,items:newEnquiries
                  }
            }
        case 'CLEAR_CART': {
            return {
                ...state,items:[],amount:0,bookingType: '',highestProp:{},loading:false
            }
        }
        case 'DIRECT_BOOKING_PROPERTIES': {
            return {
                ...state,properties:payload
            }
        }
        case 'HIGHEST_PROP': {
            return {
                ...state,highestProp:payload
            }
        }
        default:
			return state;
    }
}

export default cartReducer