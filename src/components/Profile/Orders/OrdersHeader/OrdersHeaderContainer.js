import {connect} from "react-redux";
import OrdersHeader from "./OrdersHeader";
import {SetProfileActiveInset} from "../../../Redux/Resucers/OrdersReducer";

const mapStateToProps = (state) => {
    return {
        activeInset: state.ordersPage.activeInset
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onSetActiveInset: (inset) => dispatch(SetProfileActiveInset(inset))
    }
}

const OrdersHeaderContainer = connect(mapStateToProps, mapDispatchToProps) (OrdersHeader)

export default OrdersHeaderContainer