import {connect} from "react-redux";
import UserContextMenu from "./UserContextMenu";
import {SetActiveAC} from "../Redux/Resucers/UserContextMenuReducer";
import {RemoveUserActionCreator} from "../Redux/Resucers/LoginMenuReducer";

const mapStateToProps = (state) => {
    return {
        active: state.userContextMenu.active
    }
}

const mapStateToDispatch = (dispatch) => {
    return {
        onSetActiveAC: (active) => dispatch(SetActiveAC(active)),
        onRemoveUser: () => dispatch(RemoveUserActionCreator()),
    }
}

const UserContextMenuContainer = connect (mapStateToProps, mapStateToDispatch) (UserContextMenu)

export default UserContextMenuContainer