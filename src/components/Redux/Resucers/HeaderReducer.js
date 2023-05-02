const SET_ACTIVE_INSET = 'SET-ACTIVE-INSET'

const GetLocation = () => {
    let href = window.location.href
    let location = href.split('/')
    return '/' + location[location.length - 1]
}

const location = GetLocation()

debugger

let InitialAction = {
    activeInset: location
}

const HeaderReducer = (state = InitialAction, action) => {
    switch (action.type) {
        case SET_ACTIVE_INSET: {
            return {
                ...state,
                activeInset: action.inset
            }
            debugger
        }
        default:
            return state
    }
}

export const SetActiveInsetActionCreator = (inset) => ({type: SET_ACTIVE_INSET, inset: inset})

export default HeaderReducer