// Redux
import { connect } from 'react-redux';
import { withRouter } from "react-router";

// Components
import Main from '../components/Welcome/Main';

function mapStateToProps(state) {
	return {
	};
}

function mapDispatchToProps(dispatch) {
	return {
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Main));