import { push } from 'react-router-redux';
import { checkStatus } from '../util';
import { ROOT } from '../../constants/root';

export function criaUsuario(user, password, email) {
	return function(dispatch, getState) {

		const URL = `${ROOT}/auth/create/`;
		const json = { user: user, password: password, email: email };

		return fetch(URL, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'				
			},
			body: JSON.stringify(json)		
		})
		.then((response) => checkStatus(response, dispatch))
		.then(() => {
			console.trace();
			// dispatch(setCredentials(null, null));
			dispatch(push('/login'));
		})
		.catch((e) => {
			// dispatch(setCredentials(null, null));
			dispatch(push('/login'));
		});		
	};
}

// function isFetchingCadastro(bool) {
// 	return {
// 		type: "IS_FETCHING_CADASTRO",
// 		bool
// 	};	
// }

// function setDocuments(documents) {
// 	return {
// 		type: "SET_DOCUMENTS",
// 		documents
// 	};	
// }

export function setCurrentPage(currentPage) {
	return {
		type: "SET_DOCUMENTS_CURRENT_PAGE",
		currentPage
	};	
}