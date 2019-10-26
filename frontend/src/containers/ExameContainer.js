// Redux
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../state/exames/actions';
import { withRouter } from 'react-router';

// Components
import Exame from '../components/Exames/Exame';

function mapStateToProps(state) {
	return {
		exame: state.pessoas.current,
		selected: state.pessoas.selected,
		upload: state.pessoas.upload,
		hasEdited: state.pessoas.hasEdited,
		salvarBtEnabled: state.pessoas.salvarBtEnabled,
		nextPage: state.pessoas.nextPage
	};
}

function mapDispatchToProps(dispatch) {
	return { 
		actions: bindActionCreators(actions, dispatch)
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Exame));