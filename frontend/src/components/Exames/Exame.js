import React, { PropTypes } from 'react';

// Containers
import MetadataContainer from '../../containers/MetadataPessoaContainer';

// Components
import ActionBar from './ActionBar';
// @TODO: TESTAR CADASTRAR BRUMADINHO E CADASTRAR MARIANA
export default class Exame extends React.Component {

	constructor(props) {
		super(props);
		this.state = { files: [], savedFiles: [] };
		// this.props.router.setRouteLeaveHook(this.props.route, () => {
		// 	if ( this.props.hasEdited ) return 'Você possui alterações não salvas. Tem certeza que deseja continuar?';
		// });

		// window.onbeforeunload = () => {
		// 	if ( this.props.hasEdited ) return 'Changes may be lost!';
		// };
	}	

	componentWillMount() {
		// const { id } = this.props.params;
		//document.log.reverse();

		// Now get the document from BD
		// if ( this.isEdit && parseInt(id) !== this.props.selected ) this.props.actions.viewDocument(id);
	}

	componentDidUpdate(prevProps) {
		// Checks if we have id and filePath is not empty, meaning the user has just created a new
		// document after exported file from FTP
		// if ( typeof this.props.params.id !== "undefined" && this.filePath.length > 0 ) location.reload();

		// Checks if there is no params (is creating) and before it was an edit, meaning
		// user has clicked on new document while editing
		// if ( typeof this.props.params.id === "undefined" && this.isEdit ) location.reload();
		// this.isEdit = typeof this.props.params.id !== "undefined";

		// If we have saved our progress, than refresh files to show correct UI
		if ( prevProps.upload.status === "IN_PROGRESS" && this.props.upload.status === "SUCCESS" ) this.refreshFiles();
	}

	onDrop(files) {
		this.setState({files});
	}

	handleDeletePessoa() {
		const { title } = this.props.exame;
		const m = `Tem certeza que deseja deletar o documento ${title}? Esse procedimento não pode ser desfeito!`;
		if ( !confirm(m) ) return;
		// this.props.actions.deleteDocument(this.props.params.id);
	}

	generateDoc() {
		const { 
			title, url, hasOwner, isPublic, datetime, startCoverageDate,
			endCoverageDate, description, rects, points, projects, groups
		} = this.props.exame;
		return {
			title,
			hasOwner: hasOwner ? 1 : 0,
			isPublic: isPublic ? 1 : 0,
			datetime,
			startCoverageDate,
			endCoverageDate,
			description,
			rects,
			points,
			url,
			files: this.state.files,
			projects: projects,
			groups: groups
		};
	}
	
	getContent() {
		const { actions, upload } = this.props;
		const formattedDoc = this.generateDoc();

		return this.isEdit === null
			? <i className="fas fa-circle-notch fa-spin fa-fw" />
			: (
			<div>
				<MetadataContainer />
				<hr />
				<ActionBar
					upload={upload}
					onSave={actions.saveDocument}
					onDelete={this.handleDeletePessoa.bind(this)}
					pessoa={formattedDoc}
					showDelete={this.isEdit}
				/>
				<div style={{marginTop: "10px", cursor: "pointer", textAlign: "center"}}>
					<a onClick={() => window.scrollTo(0, 0)}>&uarr; Voltar ao Topo</a>
				</div>
			</div>
			);
	}

	render () {
		const title = this.isEdit ? "Modificar Liberacao" : "Liberar Exame";
		return (
			<div className="row">
				<div className="col-sm-12">
					<div className="panel panel-default">
						<div className="panel-body">
							<div>
								<h2 style={{textAlign: "center"}}>{title}</h2>
								<hr />
								{this.getContent()}								
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

Exame.propTypes = {
	actions: PropTypes.object.isRequired,
	exame: PropTypes.object.isRequired,
	upload: PropTypes.object.isRequired,
	router: PropTypes.object.isRequired,
	route: PropTypes.object.isRequired
};
