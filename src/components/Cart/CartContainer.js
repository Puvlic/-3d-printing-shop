import {
    AddProductCountActiveCreator, CleanProducts,
    RemoveProductActionCreator,
    RemoveProductCountActiveCreator,
    SetCartActiveAC, SetCartProductsActionCreator, SetProductsActionCreator
} from "../Redux/Resucers/CartReducer";
import {connect} from "react-redux";
import Cart from "./Cart";
import {SetActiveProductAC} from "../Redux/Resucers/CatalogReducer";
import products from "./Products/Products";

const mapStateToProps = (state) => {
    return {
        activeProduct: state.catalogPage.activeProduct,
        products: state.cartPage.products,
        cartProducts: state.cartPage.cartProducts,
        active: state.cartPage.active
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        onSetActiveProduct: (id) => dispatch(SetActiveProductAC(id)),
        onRemoveProduct: (product) => dispatch(RemoveProductActionCreator(product)),
        onSetActive: (cartActive) => dispatch(SetCartActiveAC(cartActive)),
        onAddProductCount: (id) => dispatch(AddProductCountActiveCreator(id)),
        onRemoveProductCount: (id) => dispatch(RemoveProductCountActiveCreator(id)),
        onCleanProducts: () => dispatch(CleanProducts()),
        onSetProductsActionCreator: (products) => dispatch(SetProductsActionCreator(products)),
        onSetCartProductsActionCreator: (products) => dispatch(SetCartProductsActionCreator(products))
    }
}

const CartContainer = connect(mapStateToProps, mapDispatchToProps) (Cart)

export default CartContainer