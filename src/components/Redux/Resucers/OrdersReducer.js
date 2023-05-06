const SET_ACTIVE_INSET = "SET-ACTIVE-INSET"

const InitiateState = {
    activeInset: 1,
}

const OrdersReducer = (state = InitiateState, action) => {
    switch (action.type) {
        case SET_ACTIVE_INSET: {
            return {
                ...state,
                activeInset: action.inset
            }
        }
        default:
            return state
    }
}

export const SetProfileActiveInset = (inset) => ({type: SET_ACTIVE_INSET, inset:inset})

export default OrdersReducer