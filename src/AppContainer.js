import {connect} from "react-redux";
import App from "./App";
import {SetCartActiveAC} from "./components/Redux/Resucers/CartReducer";
import {SetFavoritesActiveAC} from "./components/Redux/Resucers/FavoritesReducer";
import {SetUserActionCreator} from "./components/Redux/Resucers/LoginMenuReducer";

const mapStateToProps = (state) => {
    return {
        cartActive: state.cartPage.active,
        favoritesActive: state.favoritePage.active,
        cartProducts: state.cartPage.products,
        favorites: state.favoritePage.products
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onCartSetActive: (active) => dispatch(SetCartActiveAC(active)),
        onFavoritesSetActive: (active) => dispatch(SetFavoritesActiveAC(active)),
        onSetUser: (isLogged) => dispatch(SetUserActionCreator(isLogged)),
    }
}

const AppContainer = connect(mapStateToProps, mapDispatchToProps) (App)

export default AppContainer