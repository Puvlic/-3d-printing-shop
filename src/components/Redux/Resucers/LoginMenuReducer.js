const SET_ACTIVE = 'SET-ACTIVE'
const SET_USER = 'SET-USER'
const SET_REGISTER_ACTIVE = 'SET-REGISTER-ACTIVE'
const REMOVE_USER = 'REMOVE-USER'
const USERNAME_CHANGE = 'USERNAME-CHANGE'
const PASSWORD_CHANGE = 'PASSWORD-CHANGE'
const REGISTER_USERNAME_CHANGE = 'REGISTER-USERNAME-CHANGE'
const REGISTER_PASSWORD_CHANGE = 'REGISTER-PASSWORD-CHANGE'
const REGISTER_NAME_CHANGE = 'REGISTER-NAME-CHANGE'
const REGISTER_SURNAME_CHANGE = 'REGISTER-SURNAME-CHANGE'
const REGISTER_EMAIL_CHANGE = 'REGISTER-EMAIL-CHANGE'

const InitiateState = {
    usernameText: "",
    passwordText: "",
    register: {
        usernameText: "",
        passwordText: "",
        nameText: "",
        surnameText: "",
        emailText: ""
    },
    userIsLogged: false,
    active: false,
    registerActive: false,
}

const LoginMenuReducer = (state = InitiateState, active) => {
    switch (active.type) {
        case SET_ACTIVE: {
            return {
                ...state,
                active: active.loginMenuActive
            }
        }
        case USERNAME_CHANGE: {
            return {
                ...state,
                usernameText: active.text
            }
        }
        case PASSWORD_CHANGE: {
            return {
                ...state,
                passwordText: active.text
            }
        }
        case REGISTER_USERNAME_CHANGE: {
            return {
                ...state,
                register: {
                    usernameText: active.text,
                    passwordText: state.register.passwordText,
                    nameText: state.register.nameText,
                    surnameText: state.register.surnameText,
                    emailText: state.register.emailText
                }
            }
        }
        case REGISTER_PASSWORD_CHANGE: {
            return {
                ...state,
                register: {
                    usernameText: state.register.usernameText,
                    passwordText: active.text,
                    nameText: state.register.nameText,
                    surnameText: state.register.surnameText,
                    emailText: state.register.emailText
                }
            }
        }
        case REGISTER_NAME_CHANGE: {
            return {
                ...state,
                register: {
                    usernameText: state.register.usernameText,
                    passwordText: state.register.passwordText,
                    nameText: active.text,
                    surnameText: state.register.surnameText,
                    emailText: state.register.emailText
                }
            }
        }
        case REGISTER_SURNAME_CHANGE: {
            return {
                ...state,
                register: {
                    usernameText: state.register.usernameText,
                    passwordText: state.register.passwordText,
                    nameText: state.register.nameText,
                    surnameText: active.text,
                    emailText: state.register.emailText
                }
            }
        }
        case REGISTER_EMAIL_CHANGE: {
            return {
                ...state,
                register: {
                    usernameText: state.register.usernameText,
                    passwordText: state.register.passwordText,
                    nameText: state.register.nameText,
                    surnameText: state.register.surnameText,
                    emailText: active.text,
                }
            }
        }
        case SET_USER: {
                return {
                    ...state,
                    usernameText: '',
                    passwordText: '',
                    active: false,
                    userIsLogged: active.isLogged,
                }
        }
        case REMOVE_USER: {
            return {
                ...state,
                userIsLogged: false
            }
        }
        case SET_REGISTER_ACTIVE: {
            return {
                ...state,
                registerActive: active.active
            }
        }

        default:
            return state
    }
}

export const SetLoginMenuActiveAC = (loginMenuActive) => ({type: SET_ACTIVE, loginMenuActive: loginMenuActive})
export const SetUserActionCreator = (isLogged) => ({type: SET_USER, isLogged: isLogged})
export const UsernameChangeActionCreator = (text) => ({type: USERNAME_CHANGE, text: text})
export const PasswordChangeActionCreator = (text) => ({type: PASSWORD_CHANGE, text: text})
export const RemoveUserActionCreator = () => ({type: REMOVE_USER})
export const SetRegisterActiveAC = (active) => ({type:SET_REGISTER_ACTIVE, active:active})
export const RegisterUsernameChangeActionCreator = (text) => ({type:REGISTER_USERNAME_CHANGE, text:text})
export const RegisterPasswordChangeActionCreator = (text) => ({type:REGISTER_PASSWORD_CHANGE, text:text})
export const RegisterNameChangeActionCreator = (text) => ({type:REGISTER_NAME_CHANGE, text:text})
export const RegisterSurnameChangeActionCreator = (text) => ({type:REGISTER_SURNAME_CHANGE, text:text})
export const RegisterEmailChangeActionCreator = (text) => ({type:REGISTER_EMAIL_CHANGE, text:text})

export default LoginMenuReducer