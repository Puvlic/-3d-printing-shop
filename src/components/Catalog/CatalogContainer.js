import {connect} from "react-redux";
import Catalog from "./Catalog";
import {
    AddProductActionCreator,
    CleanProducts,
    RemoveProductActionCreator,
    SetProductsActionCreator
} from "../Redux/Resucers/CartReducer";
import {
    AddFavoritesActionCreator,
    ClearFavoritesAC,
    RemoveFavoritesActionCreator, SetNewFavorites, SetNewFavoritesAC
} from "../Redux/Resucers/FavoritesReducer";
import {GetProductsActionCreator, GetTypesActionCreator, SetActiveProductAC} from "../Redux/Resucers/CatalogReducer";
import {SetLoginMenuActiveAC} from "../Redux/Resucers/LoginMenuReducer";
import products from "../Cart/Products/Products";

const mapStateToProps = (state) => {
    return {
        types: state.catalogPage.productTypes,
        activeProduct: state.catalogPage.activeProduct,
        favorites: state.favoritePage.products,
        cart: state.cartPage.products,
        cartProducts: state.cartPage.cartProducts,
        products: state.catalogPage.products,
        activeType: state.catalogPage.activeType
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onGetTypes: (types) => dispatch(GetTypesActionCreator(types)),
        onSetActiveProduct: (id) => dispatch(SetActiveProductAC(id)),
        onAddFavorite: (product) => dispatch(AddFavoritesActionCreator(product)),
        onRemoveFavorite: (product) => dispatch(RemoveFavoritesActionCreator(product)),
        onAddInCart: (product) => dispatch(AddProductActionCreator(product)),
        onRemoveFromCart: (product) => dispatch(RemoveProductActionCreator(product)),
        onGetProducts: (products) => dispatch(GetProductsActionCreator(products)),
        onSetLoginMenuActive: (active) => dispatch(SetLoginMenuActiveAC(active)),
        onCleanProducts: () => dispatch(CleanProducts()),
        onSetProductsActionCreator: (products) => dispatch(SetProductsActionCreator(products)),
        onCleanFavorites: () => dispatch(ClearFavoritesAC()),
        onSetNewFavorites: (products) => dispatch(SetNewFavoritesAC(products)),
    }
}

export const CatalogContainer = connect(mapStateToProps, mapDispatchToProps) (Catalog)