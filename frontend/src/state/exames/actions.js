// import { push } from 'react-router-redux';
import { checkStatus } from '../util';
import { ROOT } from '../../constants/root';

export function getExames() {
	return function(dispatch, getState) {		
		// const URL = `${ROOT}/document/` + JSON.stringify(getState().login.choosenbyuser);
		const URL = `${ROOT}/document/`;
		dispatch(isFetchingDocuments(true));
		// console.log(": " + JSON.stringify(getState().login.choosenbyuser))
		
		return fetch(URL, {
			method: 'GET',
			headers: {
				'Authorization': 'Token ' + getState().login.credentials.token,
				'Content-Type': 'application/json'
			}
			// body: JSON.stringify(getState().login.choosenbyuser)
		})
		.then((response) => checkStatus(response, dispatch))
		.then((response) => response.json())
		.then((json) => {
			dispatch(isFetchingDocuments(false));
			dispatch(setDocuments(json));
		})
		.catch((e) => {
			dispatch(isFetchingDocuments(false));
			console.warn(e);			
		});
	};
}

function isFetchingDocuments(bool) {
	return {
		type: "IS_FETCHING_DOCUMENTS",
		bool
	};	
}

function setDocuments(documents) {
	return {
		type: "SET_DOCUMENTS",
		documents
	};	
}

export function setCurrentPage(currentPage) {
	return {
		type: "SET_DOCUMENTS_CURRENT_PAGE",
		currentPage
	};	
}

