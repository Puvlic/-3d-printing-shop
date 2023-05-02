import {
    AddFavoritesActionCreator, ClearFavoritesAC,
    RemoveFavoritesActionCreator,
    SetFavoritesActiveAC, SetNewFavoritesAC
} from "../Redux/Resucers/FavoritesReducer";
import {connect} from "react-redux";
import Favorites from "./Favorites";
import {SetActiveProductAC} from "../Redux/Resucers/CatalogReducer";


const mapStateToProps = (state) => {
    return {
        products: state.favoritePage.products,
        active: state.favoritePage.active
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onSetActiveProduct: (product) => dispatch(SetActiveProductAC(product)),
        onSetActive: (favoritesActive) => dispatch(SetFavoritesActiveAC(favoritesActive)),
        onRemoveFavorites: (product) => dispatch(RemoveFavoritesActionCreator(product)),
        onCleanFavorites: () => dispatch(ClearFavoritesAC()),
        onSetNewFavorites: (products) => dispatch(SetNewFavoritesAC(products)),
    }
}

const FavoriteContainer = connect(mapStateToProps, mapDispatchToProps) (Favorites)

export default FavoriteContainer