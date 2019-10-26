// Redux
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../state/caduser/actions';
import { withRouter } from 'react-router';

// Components
import Main from '../components/CadUser/Main';

function mapStateToProps(state) {
	return {
		caduser: state.caduser
	};
}

function mapDispatchToProps(dispatch) {
	return { 
		actions: bindActionCreators(actions, dispatch)
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Main));