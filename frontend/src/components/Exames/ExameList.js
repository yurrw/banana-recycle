import React, { PropTypes } from 'react';
import DocumentItem from './ExameItem';
import Pagination from '../Common/Pagination';

export default class ExameList extends React.Component {
	
	componentWillMount() {
		// this.props.actions.clearForm();
		// this.props.actions.getExames();		
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
		let listItens = [ 
			{ id: "1", title: "R$ 20 Google Play", imgpath: "/playstore.png" }, 
			{ id: "2", title: "R$ 25 Steam", imgpath: "/Steam_Logo.png" },
			{ id: "3", title: "R$ 25 Dota 2", imgpath: "/dota-2-icon-28.jpg" },
			{ id: "4", title: "R$ 25 League of Legends", imgpath: "/lol.png" }
		];
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
					{listItens.map((doc, i) => 
						<DocumentItem							
							isSelecting={exames.isSelecting}	
							index={i}
							key={i}
							imgpath={doc.imgpath}
							title={doc.title} 
							id={doc.id}							
						/>
					)}
				</div>
				<div style={{'margin-right': '30'}}>
					<Pagination 
					pagination={this.props.exames.pagination} 
					setPage={actions.setCurrentPage}
					totalPages={this.getTotalPages()} 
					totalDocuments={listItens.length}
				/>
				</div>
				
			</div>
		);
	}
}

ExameList.propTypes = {
	actions: PropTypes.object.isRequired,
	exames: PropTypes.object.isRequired
};