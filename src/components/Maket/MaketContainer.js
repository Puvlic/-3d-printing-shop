import Maket from "./Maket";
import {connect} from "react-redux";
import {
    AddUploadFileActionCreator,
    ChangeCurrentUploadImgActionCreator,
    SelectFileActionCreator
} from "../Redux/Resucers/MaketReducer";

const mapStateToProps = (state) => {
    return {
        uploadFileTypes: state.maket._uploadFileTypes,
        currentUploadImg: state.maket.currentUploadImg,
        selectedFile: state.maket.selectedFile
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onAddUploadFile: (file) => dispatch(AddUploadFileActionCreator(file)),
        onChangeCurrentUploadFile: (url) => dispatch(ChangeCurrentUploadImgActionCreator(url)),
        onSelectFile: (file) => dispatch(SelectFileActionCreator(file))
    }
}

const MaketContainer = connect(mapStateToProps, mapDispatchToProps) (Maket)
export default MaketContainer