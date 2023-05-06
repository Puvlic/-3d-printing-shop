import Orders from "./Orders";
import {connect} from "react-redux";

const mapStateToProps = (state) => {
    return {
        products: state.cartPage.products,
        activeInset: state.ordersPage.activeInset
    }
}

const mapDispatchToProps = (dispatch) => {
    return {

    }
}

const OrdersContainer = connect (mapStateToProps, mapDispatchToProps) (Orders)
export default OrdersContainer