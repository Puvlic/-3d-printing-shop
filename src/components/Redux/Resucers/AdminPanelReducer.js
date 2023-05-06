const SET_ACTIVE_INSET = "SET-ACTIVE-INSET"
const SET_CHANGE_ORDER_ID = "SET-CHANGE-ORDER-ID"
const SET_CHANGED_PRODUCT_ID = "SET-CHANGED-PRODUCT-ID"
const SET_CHANGE_ORDER_ADDRESS_TEXT = "SET-CHANGE-ORDER-ADDRESS-TEXT"
const SET_CHANGE_ORDER_COUNT = "SET-CHANGE-ORDER-COUNT"
const SET_CHANGE_ORDER_PRODUCT_ID = "SET-CHANGE-PRODUCT-PRODUCT-ID"
const SET_CHANGE_ORDER_STATUS_TEXT = "SET-CHANGE-ORDER-STATUS-TEXT"
const SET_CHANGE_ORDER_USER_ID = "SET-CHANGE-ORDER-USER-ID"

const InitialState = {
    activeInset: 1,
    changeOrderId: null,
    changeProductId: null,
    changeOrderInfo: {
        addressText: "",
        count: null,
        product_id: null,
        statusText: "",
        user_id: null
    }
}

const AdminPanelReducer = (state = InitialState, action) => {
    switch (action.type) {
        case SET_ACTIVE_INSET: {
            return {
                ...state,
                activeInset: action.activeInset
            }
        }
        case SET_CHANGE_ORDER_ID: {
            return {
                ...state,
                changeOrderId: action.order_id
            }
        }
        case SET_CHANGED_PRODUCT_ID: {
            return {
                ...state,
                changeProductId: action.product_id
            }
        }
        case SET_CHANGE_ORDER_ADDRESS_TEXT: {
            return {
                ...state,
                changeOrderInfo: {
                    addressText: action.text,
                    count: state.changeOrderInfo.count,
                    product_id: state.changeOrderInfo.product_id,
                    statusText: state.changeOrderInfo.statusText,
                    user_id: state.changeOrderInfo.user_id
                }
            }
        }
        case SET_CHANGE_ORDER_COUNT: {
            return {
                ...state,
                changeOrderInfo: {
                    addressText: state.changeOrderInfo.addressText,
                    count: action.count,
                    product_id: state.changeOrderInfo.product_id,
                    statusText: state.changeOrderInfo.statusText,
                    user_id: state.changeOrderInfo.user_id
                }
            }
        }
        case SET_CHANGE_ORDER_PRODUCT_ID: {
            return {
                ...state,
                changeOrderInfo: {
                    addressText: state.changeOrderInfo.addressText,
                    count: state.changeOrderInfo.count,
                    product_id: action.id,
                    statusText: state.changeOrderInfo.statusText,
                    user_id: state.changeOrderInfo.user_id
                }
            }
        }
        case SET_CHANGE_ORDER_STATUS_TEXT: {
            return {
                ...state,
                changeOrderInfo: {
                    addressText: state.changeOrderInfo.addressText,
                    count: state.changeOrderInfo.count,
                    product_id: state.changeOrderInfo.product_id,
                    statusText: action.text,
                    user_id: state.changeOrderInfo.user_id
                }
            }
        }
        case SET_CHANGE_ORDER_USER_ID: {
            return {
                ...state,
                changeOrderInfo: {
                    addressText: state.changeOrderInfo.addressText,
                    count: state.changeOrderInfo.count,
                    product_id: state.changeOrderInfo.product_id,
                    statusText: state.changeOrderInfo.statusText,
                    user_id: action.id
                }
            }
        }
        default:
            return state
    }
}

export const SetActiveInset = (activeInset) => ({type: SET_ACTIVE_INSET, activeInset:activeInset})
export const SetChangeOrderIdAC = (order_id) => ({type: SET_CHANGE_ORDER_ID, order_id: order_id})
export const SetChangeProductIdAC = (product_id) => ({type: SET_CHANGE_ORDER_ID, product_id: product_id})

export const SetChangeOrderAddressTextAC = (text) => ({type: SET_CHANGE_ORDER_ADDRESS_TEXT, text:text})
export const SetChangeOrderCountAC = (count) => ({type: SET_CHANGE_ORDER_COUNT, count:count})
export const SetChangeOrderProductIdAC = (id) => ({type: SET_CHANGE_ORDER_PRODUCT_ID, id:id})
export const SetChangeOrderStatusTextAC = (text) => ({type: SET_CHANGE_ORDER_STATUS_TEXT, text:text})
export const SetChangeOrderUserIdAC = (id) => ({type: SET_CHANGE_ORDER_USER_ID, id:id})



export default AdminPanelReducer