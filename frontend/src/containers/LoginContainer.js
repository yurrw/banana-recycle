// Redux
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../state/login/actions';

// Components
import Main from '../components/Login/Main';

function mapStateToProps(state) {
	return {
		login: state.login
	};
}

function mapDispatchToProps(dispatch) {
	return { actions: bindActionCreators(actions, dispatch) };
}

export default connect(mapStateToProps, mapDispatchToProps)(Main);