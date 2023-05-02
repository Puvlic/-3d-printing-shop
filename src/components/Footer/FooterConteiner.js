import {connect} from "react-redux";
import Footer from "./Footer";

const mapStateToProps = (state) => {
    return {
        state: state
    }
}

const mapDispatchToProps = (dispatch) => {
    return {

    }
}

const FooterContainer = connect(mapStateToProps, mapDispatchToProps) (Footer)

export default  FooterContainer