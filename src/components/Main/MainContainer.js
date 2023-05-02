import {SetActiveInsetActionCreator} from "../Redux/Resucers/HeaderReducer";
import Main from "./Main";
import {connect} from "react-redux";
import {
    GetProductsActionCreator,
    SetActiveProductAC,
    SetActiveTypeActionCreator
} from "../Redux/Resucers/CatalogReducer";
import {AddFavoritesActionCreator, RemoveFavoritesActionCreator} from "../Redux/Resucers/FavoritesReducer";
import {AddProductActionCreator, RemoveProductActionCreator} from "../Redux/Resucers/CartReducer";

const mapStateToProps = (state) => {
    return {
        activeProduct: state.catalogPage.activeProduct,
        favorites: state.favoritePage.products,
        cart: state.cartPage.products,
        productTypes: state.catalogPage.productTypes,
        products: state.catalogPage.products
    }
}

const  mapDispatchToProps = (dispatch) => {
    return {
        onSetActiveProduct: (id) => dispatch(SetActiveProductAC(id)),
        onSetActiveInset: (inset) => dispatch(SetActiveInsetActionCreator(inset)),
        onSetActiveType: (type) => dispatch(SetActiveTypeActionCreator(type)),
        onGetProducts: (products) => dispatch(GetProductsActionCreator(products)),
        onAddFavorite: (product) => dispatch(AddFavoritesActionCreator(product)),
        onRemoveFavorite: (product) => dispatch(RemoveFavoritesActionCreator(product)),
        onAddInCart: (product) => dispatch(AddProductActionCreator(product)),
        onRemoveFromCart: (product) => dispatch(RemoveProductActionCreator(product)),
    }
}

const MainContainer = connect(mapStateToProps, mapDispatchToProps) (Main)

export default MainContainer