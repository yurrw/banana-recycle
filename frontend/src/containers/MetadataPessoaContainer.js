// Redux
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// Actions
import * as actions from '../state/pessoas/metadata/actions';

// Components
import Metadata from '../components/Pessoas/Metadata';

function mapStateToProps(state) {
	return {
		pessoa: state.pessoas.current
	};
}

function mapDispatchToProps(dispatch) {
	return { 
		actions: bindActionCreators(actions, dispatch)
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(Metadata);