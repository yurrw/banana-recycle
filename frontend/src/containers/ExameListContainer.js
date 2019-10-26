// Redux
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// Actions
import * as actions from '../state/exames/actions';

// Components
import DocumentsList from '../components/Exames/ExameList';

function mapStateToProps(state) {
	return {
		exames: state.exames
	};
}

function mapDispatchToProps(dispatch) {
	return { 
		actions: bindActionCreators(actions, dispatch)
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(DocumentsList);