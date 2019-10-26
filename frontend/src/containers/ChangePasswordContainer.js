// Redux
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { changePassword } from '../state/login/actions';

// Components
import ChangePassword from '../components/Login/ChangePassword';

function mapStateToProps(state) {
	return {};
}

function mapDispatchToProps(dispatch) {
	return { 
		changePassword: bindActionCreators(changePassword, dispatch)
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(ChangePassword);