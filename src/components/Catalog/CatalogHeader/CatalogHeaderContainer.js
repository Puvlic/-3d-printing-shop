import {connect} from "react-redux";
import CatalogHeader from "./CatalogHeader";
import {SetActiveTypeActionCreator} from "../../Redux/Resucers/CatalogReducer";

const mapStateToProps = (state) => {
    return {
        productTypes: state.catalogPage.productTypes,
        activeProductType: state.catalogPage.activeType
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onSetActiveType: (type) => dispatch(SetActiveTypeActionCreator(type))
    }
}

const CatalogHeaderContainer = connect(mapStateToProps, mapDispatchToProps) (CatalogHeader)

export default CatalogHeaderContainer