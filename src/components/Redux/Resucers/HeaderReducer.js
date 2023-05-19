const SET_ACTIVE_INSET = 'SET-ACTIVE-INSET'
const SET_PHONE_MENU_ACTIVE = 'SET-PHONE-MENU-ACTIVE'

const GetLocation = () => {
    let href = window.location.href
    let location = href.split('/')
    return '/' + location[location.length - 1]
}

const location = GetLocation()

let InitialAction = {
    activeInset: location,
    phoneMenuActive: false
}

const HeaderReducer = (state = InitialAction, action) => {
    switch (action.type) {
        case SET_ACTIVE_INSET: {
            return {
                ...state,
                activeInset: action.inset
            }
        }
        case SET_PHONE_MENU_ACTIVE: {
            return {
                ...state,
                phoneMenuActive: action.active
            }
        }
        default:
            return state
    }
}

export const SetActiveInsetActionCreator = (inset) => ({type: SET_ACTIVE_INSET, inset: inset})
export const SetPhoneMenuActiveAC = (active) => ({type: SET_PHONE_MENU_ACTIVE, active: active})

export default HeaderReducer