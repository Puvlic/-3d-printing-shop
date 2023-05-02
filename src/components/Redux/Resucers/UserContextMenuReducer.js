const initiateState = {
    active: false
}

const UserContextMenuReducer = (state = initiateState, action) => {
    switch (action.type) {
        case "SET_ACTIVE": {
            return {...state, active: action.active}
        }
        default:
            return state
    }
}

export const SetActiveAC = (active) => ({type:"SET_ACTIVE", active:active})

export default UserContextMenuReducer
