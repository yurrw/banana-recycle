// Redux
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// Actions
import * as actions from '../state/exames/actions';

// Components
import Metadata from '../components/Exames/Metadata';

function mapStateToProps(state) {
	return {
		exame: state.exame.current
	};
}

function mapDispatchToProps(dispatch) {
	return { 
		actions: bindActionCreators(actions, dispatch)
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(Metadata);