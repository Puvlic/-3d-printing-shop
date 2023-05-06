const SET_NEW_EXPRESS_DELIVERY_CARD_NUMBER = "SET-NEW-EXPRESS-DELIVERY-CARD-NUMBER"
const SET_NEW_EXPRESS_DELIVERY_ADDRESS = "SET-NEW-EXPRESS-DELIVERY-ADDRESS"
const SET_NEW_PICKUP_CARD_NUMBER = "SET-NEW-PICKUP-CARD-NUMBER"
const SET_NEW_PICKUP_ADDRESS = "SET-NEW-PICKUP-ADDRESS"
const SET_NEW_POSTAL_DELIVERY_CARD_NUMBER = "SET-NEW-POSTAL-DELIVERY-NUMBER"
const SET_NEW_POSTAL_DELIVERY_CARD_ADDRESS = "SET-NEW-POSTAL-DELIVERY-ADDRESS"

let InitiateGetOrders = {
    expressDelivery: {
        cardNumber: "",
        address: ""
    },
    pickup: {
        cardNumber: "",
        address: "Терновского 172"
    },
    postalDelivery: {
        cardNumber: "",
        address: ""
    }

}

const GetOrdersReducer = (state = InitiateGetOrders, action) => {
    switch (action.type) {
        case SET_NEW_EXPRESS_DELIVERY_CARD_NUMBER: {
            return {
                ...state,
                expressDelivery: {
                    cardNumber: action.text,
                    address: state.expressDelivery.address
                }
            }
        }
        case SET_NEW_EXPRESS_DELIVERY_ADDRESS: {
            return {
                ...state,
                expressDelivery: {
                    cardNumber: state.expressDelivery.cardNumber,
                    address: action.text
                }
            }
        }
        case SET_NEW_PICKUP_CARD_NUMBER: {
            return {
                ...state,
                pickup: {
                    cardNumber: action.text,
                    address: state.pickup.address
                }
            }
        }
        case SET_NEW_POSTAL_DELIVERY_CARD_NUMBER: {
            return {
                ...state,
                postalDelivery: {
                    cardNumber: action.text,
                    address: state.postalDelivery.address
                }
            }
        }
        case SET_NEW_POSTAL_DELIVERY_CARD_ADDRESS: {
            return {
                ...state,
                postalDelivery: {
                    cardNumber: state.postalDelivery.cardNumber,
                    address: action.text
                }
            }
        }
        default:
            return state
    }
}

export const SetNewExpressDeliveryCardNumberAC = (text) => ({type: SET_NEW_EXPRESS_DELIVERY_CARD_NUMBER, text:text})
export const SetNewExpressDeliveryAddressAC = (text) => ({type: SET_NEW_EXPRESS_DELIVERY_ADDRESS, text:text})
export const SetNewPickupCardNumberAC = (text) => ({type: SET_NEW_PICKUP_CARD_NUMBER, text:text})
export const SetNewPickupAddressAC = (text) => ({type: SET_NEW_PICKUP_ADDRESS, text:text})
export const SetNewPostalDeliveryCardNumberAC = (text) => ({type: SET_NEW_POSTAL_DELIVERY_CARD_NUMBER, text:text})
export const SetNewPostalDeliveryAddressAC = (text) => ({type: SET_NEW_POSTAL_DELIVERY_CARD_ADDRESS, text:text})

export default GetOrdersReducer