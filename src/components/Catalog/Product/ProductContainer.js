import Product from "./Product";
import {connect} from "react-redux";
import {GetProductsActionCreator, SetActiveProductAC} from "../../Redux/Resucers/CatalogReducer";
import {
    AddFavoritesActionCreator,
    ClearFavoritesAC,
    RemoveFavoritesActionCreator, SetNewFavoritesAC
} from "../../Redux/Resucers/FavoritesReducer";
import {
    AddProductActionCreator,
    CleanProducts,
    RemoveProductActionCreator,
    SetProductsActionCreator
} from "../../Redux/Resucers/CartReducer";
import {SetLoginMenuActiveAC} from "../../Redux/Resucers/LoginMenuReducer";

const mapStateToProps = (state) => {
    return {
        activeProduct: state.catalogPage.activeProduct,
        products: state.catalogPage.products,
        favorites: state.favoritePage.products,
        cart: state.cartPage.products,
        href: window.location.href
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setActiveProduct: (id) => dispatch(SetActiveProductAC(id)),
        onGetProducts: (products) => dispatch(GetProductsActionCreator(products)),
        onAddFavorite: (product) => dispatch(AddFavoritesActionCreator(product)),
        onRemoveFavorite: (product) => dispatch(RemoveFavoritesActionCreator(product)),
        onAddInCart: (product) => dispatch(AddProductActionCreator(product)),
        onRemoveFromCart: (product) => dispatch(RemoveProductActionCreator(product)),
        onCleanProducts: () => dispatch(CleanProducts()),
        onSetProductsActionCreator: (products) => dispatch(SetProductsActionCreator(products)),
        onSetLoginMenuActive: (active) => dispatch(SetLoginMenuActiveAC(active)),
        onCleanFavorites: () => dispatch(ClearFavoritesAC()),
        onSetNewFavorites: (products) => dispatch(SetNewFavoritesAC(products)),
    }
}

export const ProductContainer = connect(mapStateToProps, mapDispatchToProps) (Product)