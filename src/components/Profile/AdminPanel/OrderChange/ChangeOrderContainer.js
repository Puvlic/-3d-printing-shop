import {connect} from "react-redux";
import ChangeOrder from "./ChangeOrder";
import {
    SetChangeOrderAddressTextAC,
    SetChangeOrderCountAC,
    SetChangeOrderIdAC, SetChangeOrderProductIdAC, SetChangeOrderStatusTextAC, SetChangeOrderUserIdAC
} from "../../../Redux/Resucers/AdminPanelReducer";

const mapStateToProps = (state) => {
    return {
        addressText: state.adminPanelPage.changeOrderInfo.addressText,
        count: state.adminPanelPage.changeOrderInfo.count,
        product_id: state.adminPanelPage.changeOrderInfo.product_id,
        statusText: state.adminPanelPage.changeOrderInfo.statusText,
        user_id: state.adminPanelPage.changeOrderInfo.user_id
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onSetChangeOrderAddressText: (text) => dispatch(SetChangeOrderAddressTextAC(text)),
        onSetChangeOrderCount: (count) => dispatch(SetChangeOrderCountAC(count)),
        onSetChangeOrderProductId: (id) => dispatch(SetChangeOrderProductIdAC(id)),
        onSetChangeOrderStatusText: (text) => dispatch(SetChangeOrderStatusTextAC(text)),
        onSetChangeOrderUserId: (id) => dispatch(SetChangeOrderUserIdAC(id))
    }
}

const ChangeOrderContainer = connect (mapStateToProps, mapDispatchToProps) (ChangeOrder)

export default ChangeOrderContainer