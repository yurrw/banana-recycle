// Redux
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { resetPassword } from '../state/login/actions';

// Components
import RecoverPassword from '../components/Login/RecoverPassword';

function mapStateToProps(state) {
	return {};
}

function mapDispatchToProps(dispatch) {
	return {
		resetPassword: bindActionCreators(resetPassword, dispatch)
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(RecoverPassword);