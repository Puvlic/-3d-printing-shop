import {connect} from "react-redux";
import GetOrders from "./GetOrders";

const mapStateToProps = (state) => {
    return {
        products: state.cartPage.products
    }
}

const mapDispatchToProps = (dispatch) => {
    return {

    }
}

const GetOrdersContainer = connect (mapStateToProps, mapDispatchToProps) (GetOrders)

export default GetOrdersContainer