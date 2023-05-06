const SET_ACTIVE_PRODUCT = 'SET-ACTIVE-PRODUCT'
const SET_ACTIVE_TYPE = 'SET-ACTIVE-TYPE'
const GET_PRODUCTS = 'GET-PRODUCTS'
const GET_TYPES = 'GET-TYPES'

debugger

const PT = {
    all: "Все",
    animals: "Животные",
    super_heroes: "Супер-герои",
    city: "Город"
}

let InitiateCatalog = {
    productTypes: [],
    activeProduct: null,
    activeType: 1,
    products: []
}

debugger

const CatalogReducer = (state = InitiateCatalog, active) => {
    switch (active.type) {
        case SET_ACTIVE_PRODUCT: {
            let activeProduct
            for (let i = 0; i < state.products.length; i++) {
                if (state.products[i].id === active.id) {
                    activeProduct = state.products[i]
                    break
                }
            }
            return {
                ...state,
                activeProduct: activeProduct
            }
        }
        case SET_ACTIVE_TYPE: {
            return {
                ...state,
                activeType: active.productType
            }
        }
        case GET_PRODUCTS: {
            return {
                ...state,
                products: active.products
            }
        }
        case GET_TYPES: {
            return {
                ...state,
                productTypes: active.types
            }
        }
        default:
            return state
    }
}

export const GetTypesActionCreator = (types) => ({type: GET_TYPES, types: types})
export const SetActiveTypeActionCreator = (type) => ({type: SET_ACTIVE_TYPE, productType: type})
export const SetActiveProductAC = (id) => ({type: SET_ACTIVE_PRODUCT, id:id})
export const GetProductsActionCreator = (products) => ({type: GET_PRODUCTS, products: products})

export default CatalogReducer