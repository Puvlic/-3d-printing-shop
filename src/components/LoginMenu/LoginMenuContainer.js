import {connect} from "react-redux";
import LoginMenu from "./LoginMenu";
import {
    PasswordChangeActionCreator, RegisterEmailChangeActionCreator,
    RegisterInfoChangeActionCreator, RegisterNameChangeActionCreator,
    RegisterPasswordChangeActionCreator, RegisterSurnameChangeActionCreator,
    RegisterUsernameChangeActionCreator,
    SetLoginMenuActiveAC,
    SetRegisterActiveAC,
    SetUserActionCreator,
    UsernameChangeActionCreator
} from "../Redux/Resucers/LoginMenuReducer";
import {CleanProducts, SetProductsActionCreator} from "../Redux/Resucers/CartReducer";

const mapStateToProps = (state) => {
    return {
        loginMenuActive: state.loginMenu.active,
        registerIsOpen: state.loginMenu.registerActive,
        password: state.loginMenu.passwordText,
        username: state.loginMenu.usernameText,
        registerName: state.loginMenu.register.nameText,
        registerSurname: state.loginMenu.register.surnameText,
        registerUsername: state.loginMenu.register.usernameText,
        registerPassword: state.loginMenu.register.passwordText,
        registerEmail: state.loginMenu.register.emailText
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        onSetLoginMenuActive: (loginMenuActive) => dispatch(SetLoginMenuActiveAC(loginMenuActive)),
        onSetUser: (isLogged) => dispatch(SetUserActionCreator(isLogged)),
        onUsernameChange: (text) => dispatch(UsernameChangeActionCreator(text)),
        onPasswordChange: (text) => dispatch(PasswordChangeActionCreator(text)),
        onSetRegisterActive: (active) => dispatch(SetRegisterActiveAC(active)),
        onRegisterUsernameChange: (text) => dispatch(RegisterUsernameChangeActionCreator(text)),
        onRegisterPasswordChange: (text) => dispatch(RegisterPasswordChangeActionCreator(text)),
        onRegisterNameChange: (text) => dispatch(RegisterNameChangeActionCreator(text)),
        onCleanProducts: () => dispatch(CleanProducts()),
        onSetProductsActionCreator: (products) => dispatch(SetProductsActionCreator(products)),
        onRegisterSurnameChange: (text) => dispatch(RegisterSurnameChangeActionCreator(text)),
        onRegisterEmailChange: (text) => dispatch(RegisterEmailChangeActionCreator(text))
    }
}

const LoginMenuContainer = connect(mapStateToProps, mapDispatchToProps) (LoginMenu)

export default LoginMenuContainer