import {connect} from "react-redux";
import AdminPanelHeader from "./AdminPanelHeader";
import {SetActiveInset} from "../../../Redux/Resucers/AdminPanelReducer";

const mapStateToProps = (state) => {
    return {
        activeInset: state.adminPanelPage.activeInset,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onSetActiveInset: (activeInset) => dispatch(SetActiveInset(activeInset)),
    }
}

const AdminPanelHeaderContainer = connect (mapStateToProps, mapDispatchToProps) (AdminPanelHeader)

export default AdminPanelHeaderContainer