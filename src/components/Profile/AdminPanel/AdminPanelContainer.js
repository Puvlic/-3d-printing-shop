import {connect} from "react-redux";
import AdminPanel from "./AdminPanel";
import {SetChangeOrderIdAC} from "../../Redux/Resucers/AdminPanelReducer";
import {GetProductsActionCreator} from "../../Redux/Resucers/CatalogReducer";

const mapStateToProps = (state) => {
    return {
        activeInset: state.adminPanelPage.activeInset,
        catalogProducts: state.catalogPage.products,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onSetChangeOrderIdAC: (order_id) => dispatch(SetChangeOrderIdAC(order_id)),
        onGetProducts: (products) => dispatch(GetProductsActionCreator(products)),
    }
}

const AdminPanelContainer = connect (mapStateToProps, mapDispatchToProps) (AdminPanel)

export default AdminPanelContainer