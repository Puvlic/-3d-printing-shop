const ADD_PRODUCT = 'ADD-PRODUCT'
const REMOVE_PRODUCT = 'REMOVE-PRODUCT'
const SET_ACTIVE = 'SET-ACTIVE'
const ADD_PRODUCT_COUNT = 'ADD-PRODUCT-COUNT'
const REMOVE_PRODUCT_COUNT = 'REMOVE-PRODUCT-COUNT'
const CLEAN_PRODUCTS = 'CLEAN-PRODUCTS'
const SET_PRODUCTS ='SET-PRODUCTS'
const SET_CART_PRODUCTS = 'SET-CART-PRODUCTS'

const InitiateState = {
    cartProducts: [],
    products: [],
    active: false
}

const CartReducer = (state = InitiateState, active) => {
    switch (active.type) {
        case ADD_PRODUCT: {
            let product = active.product
            product.count = 1
            return {
                ...state,
                products: [...state.products, product]
            }
        }
        case REMOVE_PRODUCT: {
            return {
                ...state,
                products: state.products.filter(product => product.id != active.id)
            }
        }
        case CLEAN_PRODUCTS: {
            return {
                ...state,
                products: []
            }

        }
        case SET_CART_PRODUCTS: {
            return {
                ...state,
                cartProducts: active.products.map(product => {return product})
            }
        }
        case SET_PRODUCTS: {
            return {
                ...state,
                products: active.products.map(product => {return product})
            }
        }
        case ADD_PRODUCT_COUNT: {
            return {
                ...state,
                products: state.products.map(product => {
                    if (product.product_id === active.id) {
                        product.count += 1
                        return product
                    } else {
                        return product
                    }
                }),
            }
        }
        case REMOVE_PRODUCT_COUNT: {
            return {
                ...state,
                products: state.products.map(product => {
                    if (product.product_id === active.id) {
                        product.count -= 1
                        return product
                    } else {
                        return product
                    }
                }),
            }
        }
        case SET_ACTIVE: {
            return {
                ...state,
                active: active.cartActive
            }
        }
        default:
            return state
    }
}

export const AddProductCountActiveCreator = (id) => ({type: ADD_PRODUCT_COUNT, id: id})
export const RemoveProductCountActiveCreator = (id) => ({type: REMOVE_PRODUCT_COUNT, id: id})
export const AddProductActionCreator = (product) => ({type: ADD_PRODUCT, product: product})
export const RemoveProductActionCreator = (product) => ({type: REMOVE_PRODUCT, product: product})
export const SetCartActiveAC = (cartActive) => ({type: SET_ACTIVE, cartActive: cartActive})
export const CleanProducts = () => ({type: CLEAN_PRODUCTS})
export const SetProductsActionCreator = (products) => ({type:SET_PRODUCTS, products: products})
export const SetCartProductsActionCreator = (products) => ({type:SET_PRODUCTS, products: products})

export default CartReducer