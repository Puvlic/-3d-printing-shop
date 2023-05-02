const ADD_FAVORITES = 'ADD-FAVORITES'
const REMOVE_FAVORITES = 'REMOVE-FAVORITES'
const SET_ACTIVE = 'SET-ACTIVE'
const CLEAN_FAVORITES = 'CLEAN-FAVORITES'
const SET_NEW_FAVORITES = 'SET-NEW-FAVORITES'

let InitiateFavorites = {
    products: [],
    active: false
}

const FavoritesReducer = (state = InitiateFavorites, active) => {
    switch (active.type) {
        case ADD_FAVORITES: {
            return {
                ...state,
                products: [...state.products, active.product]
            }
        }
        case REMOVE_FAVORITES: {
            debugger
            return {
                ...state,
                products: state.products.filter(product => product.id != active.product.id)
            }
            debugger
        }
        case SET_ACTIVE: {
            return {
                ...state,
                active: active.favoritesActive
            }
        }
        case CLEAN_FAVORITES: {
            return {
                ...state,
                products: []
            }
        }
        case SET_NEW_FAVORITES: {
            return {
                ...state,
                products: active.products
            }
        }
        default:
            return state
    }
}

export const AddFavoritesActionCreator = (product) => ({type: ADD_FAVORITES, product: product})
export const RemoveFavoritesActionCreator = (product) => ({type: REMOVE_FAVORITES, product: product})
export const SetFavoritesActiveAC = (favoritesActive) => ({type: SET_ACTIVE, favoritesActive: favoritesActive})
export const ClearFavoritesAC = () => ({type: CLEAN_FAVORITES})
export const SetNewFavoritesAC = (products) => ({type: SET_NEW_FAVORITES, products: products})
export default FavoritesReducer;