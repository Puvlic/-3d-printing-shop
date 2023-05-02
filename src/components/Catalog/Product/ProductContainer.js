import Product from "./Product";
import {connect} from "react-redux";

const mapStateToProps = (state) => {
    return {
        activeProduct: state.catalogPage.activeProduct,
        products: state.catalogPage.products,
        href: window.location.href
    }
}

const mapDispatchToProps = (dispatch) => {
    return {

    }
}

export const ProductContainer = connect(mapStateToProps, mapDispatchToProps) (Product)