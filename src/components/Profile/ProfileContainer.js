import {connect} from "react-redux";
import Profile from "./Profile";
import {SetActiveAC} from "../Redux/Resucers/UserContextMenuReducer";
import {RemoveUserActionCreator} from "../Redux/Resucers/LoginMenuReducer";

const mapStateToProps = (state) => {
    return {

    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onSetActiveAC: (active) => dispatch(SetActiveAC(active)),
        onRemoveUser: () => dispatch(RemoveUserActionCreator()),
    }
}

const ProfileContainer = connect(mapStateToProps, mapDispatchToProps) (Profile)

export default ProfileContainer