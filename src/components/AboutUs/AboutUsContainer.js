import {connect} from "react-redux";
import AboutUs from "./AboutUs";
import {GetProductsActionCreator} from "../Redux/Resucers/CatalogReducer";

const mapStateToProps = (state) => {
    return {
        products: state.catalogPage.products,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onGetProducts: (products) => dispatch(GetProductsActionCreator(products)),
    }
}

const AboutUsContainer = connect(mapStateToProps, mapDispatchToProps) (AboutUs)

export default AboutUsContainer