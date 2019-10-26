import React, { PropTypes } from 'react';
import DocumentItem from './ExameItem';
import Pagination from '../Common/Pagination';

export default class ExameList extends React.Component {
	
	componentWillMount() {
		// this.props.actions.clearForm();
		this.props.actions.getExames();		
	}

	filterByPage(array, itemsPerPage, page) {
		const endIndex = itemsPerPage * page - 1;
		const startIndex = endIndex - itemsPerPage + 1;
		return array.slice(startIndex, endIndex + 1);
	}

	getTotalPages() {
		const { itemsPerPage } = this.props.exames.pagination;
		return Math.ceil(this.filterByState().length / itemsPerPage);
	}

	getTotalDocuments() {
		return this.filterByState().length;
	}

	getDocuments() {
		const { itemsPerPage, currentPage } = this.props.exames.pagination;
		return this.filterByPage(this.filterByState(), itemsPerPage, currentPage);
	}

	filterByState() {
		const { list } = this.props.exames;
		return list;
	}

	render () {
		const { actions, exames } = this.props;
		// Shows loader if fetching documents and list is empty
		if ( exames.isFetching && exames.list.length === 0 ) {
			return (
				<div style={{display: "flex"}}>
					<span style={{margin: "auto"}}>
						Carregando Documentos
						&nbsp;
						<i className="fas fa-circle-notch fa-spin fa-fw" />
					</span>
				</div>
			);
		}
		return (
			<div>
				<div>
					{this.getDocuments().map((doc, i) => 
						<DocumentItem							
							isSelecting={exames.isSelecting}	
							index={i}
							key={i} 
							title={doc.title} 
							id={doc.id}							
						/>
					)}
				</div>
				<Pagination 
					pagination={this.props.exames.pagination} 
					setPage={actions.setCurrentPage}
					totalPages={this.getTotalPages()} 
					totalDocuments={this.getTotalDocuments()}
				/>
			</div>
		);
	}
}

ExameList.propTypes = {
	actions: PropTypes.object.isRequired,
	exames: PropTypes.object.isRequired
};