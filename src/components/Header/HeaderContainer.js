import {SetCartActiveAC} from "../Redux/Resucers/CartReducer";
import {connect} from "react-redux";
import Header from "./Header";
import {SetFavoritesActiveAC} from "../Redux/Resucers/FavoritesReducer";
import {SetActiveInsetActionCreator, SetPhoneMenuActiveAC} from "../Redux/Resucers/HeaderReducer";
import {SetActiveTypeActionCreator} from "../Redux/Resucers/CatalogReducer";
import {RemoveUserActionCreator, SetLoginMenuActiveAC} from "../Redux/Resucers/LoginMenuReducer";
import {SetActiveAC} from "../Redux/Resucers/UserContextMenuReducer";

let MapStateToProps = (state) => {
    return {
        Location: state.header.activeInset,
        phoneMenuActive: state.header.phoneMenuActive,
        url: window.location.href,
        isLogged: state.loginMenu.userIsLogged
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onCartSetActive: (active) => dispatch(SetCartActiveAC(active)),
        onFavoritesSetActive: (active) => dispatch(SetFavoritesActiveAC(active)),
        onSetActiveInset: (inset) => dispatch(SetActiveInsetActionCreator(inset)),
        onSetActiveProductType: (type) => dispatch(SetActiveTypeActionCreator(type)),
        onSetLoginMenuActive: (loginMenuActive) => dispatch(SetLoginMenuActiveAC(loginMenuActive)),
        onRemoveUser: () => dispatch(RemoveUserActionCreator()),
        onSetContextMenuActiveAC: (active) => dispatch(SetActiveAC(active)),
        onSetPhoneMenuActiveAC: (active) => dispatch(SetPhoneMenuActiveAC(active)),
    }
}

const HeaderContainer = connect(MapStateToProps, mapDispatchToProps) (Header)

export default HeaderContainer