import {connect} from "react-redux";
import DeliveryType from "./DeliveryType";
import {
    SetNewExpressDeliveryAddressAC,
    SetNewExpressDeliveryCardNumberAC, SetNewPickupAddressAC,
    SetNewPickupCardNumberAC, SetNewPostalDeliveryAddressAC, SetNewPostalDeliveryCardNumberAC
} from "../../Redux/Resucers/GetOrdersReducer";
import {CleanProducts} from "../../Redux/Resucers/CartReducer";

const mapStateToProps = (state) => {
    return {
        ED_cardNumber: state.getOrdersPage.expressDelivery.cardNumber,
        ED_address: state.getOrdersPage.expressDelivery.address,
        P_cardNumber: state.getOrdersPage.pickup.cardNumber,
        P_address: state.getOrdersPage.pickup.address,
        PD_cardNumber: state.getOrdersPage.postalDelivery.cardNumber,
        PD_address: state.getOrdersPage.postalDelivery.address
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onSetNewExpressDeliveryCardNumber: (text) => dispatch(SetNewExpressDeliveryCardNumberAC(text)),
        onSetNewExpressDeliveryAddress: (text) => dispatch(SetNewExpressDeliveryAddressAC(text)),
        onSetNewPickupCardNumber: (text) => dispatch(SetNewPickupCardNumberAC(text)),
        onSetNewPickupAddress: (text) => dispatch(SetNewPickupAddressAC(text)),
        onSetNewPostalDeliveryCardNumber: (text) => dispatch(SetNewPostalDeliveryCardNumberAC(text)),
        onSetNewPostalDeliveryAddress: (text) => dispatch(SetNewPostalDeliveryAddressAC(text)),
        onCleanProducts: () => dispatch(CleanProducts())
    }
}

const DeliveryTypeContainer = connect(mapStateToProps, mapDispatchToProps) (DeliveryType)

export default DeliveryTypeContainer