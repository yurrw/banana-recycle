import { push } from 'react-router-redux';
import { checkStatus } from '../util';
import { ROOT } from '../../constants/root';

let timeout;

// Wait 5 seconds then wipe message
const timeoutToWipeMessage = (dispatch) => {
	timeout = setTimeout(() => {
		dispatch(setDocumentStatus("IDLE"));
		dispatch(setDocumentMessage(""));
	}, 5000);
};

export function clearForm() {
	return {
		type: "CLEAR_FORM"
	};
}

export function selectDocument(document, index) {
	return {
		type: "SELECT_DOCUMENT",
		document,
		index
	};	
}

function isSelectingDocument(id) {
	return {
		type: "IS_SELECTING_DOCUMENT",
		id
	};	
}

function isFetchingDocuments(bool) {
	return {
		type: "IS_FETCHING_DOCUMENTS",
		bool
	};	
}

function setDocumentId(id) {
	return {
		type: "SET_DOCUMENT_ID",
		id
	};	
}

function setDocuments(documents) {
	return {
		type: "SET_DOCUMENTS",
		documents
	};	
}

function setDocumentStatus(status) {
	return {
		type: "SET_DOCUMENT_STATUS",
		status
	};	
}

function setDocumentMessage(message) {
	return {
		type: "SET_DOCUMENT_MESSAGE",
		message
	};	
}

function setDocumentProgress(progress) {
	return {
		type: "SET_DOCUMENT_PROGRESS",
		progress
	};	
}

export function saveDocument(document, files, points, id) {
	return function(dispatch, getState) {		
		const isEdit = id !== null;
		const URL = isEdit ? `${ROOT}/document/${id}/` : `${ROOT}/document/`;

		const data = new FormData();

		// Changes to something django accepts, then revert back.
		if (document.groups.length === 0) {
			document.groups[0] = {id: 2, name: "Repositório Dinâmico de Documentos"};
		}
		let proj = document.projects[0];
		let group = document.groups[0];
		document.projects[0] = document.projects[0].id;
		document.groups[0] = document.groups[0].id;

		data.append('document', JSON.stringify(document));

		console.log(document);
		document.projects[0] = proj;
		document.groups[0] = group;
		
		files.map((file) => data.append('files[]', file));
		
		// This creates two new keys in the FormData.
		// One is the img[] array, which is similar to the files[] array. It's plain files.
		// The other is the points[] array, which is a JSON of points with a new array (img) specifying
		// caption for the images and the filename of the images we should refer with the given point
		const newPoints = [];
		points.map((point) => {
			const filenames = [];
			point.img.map((file) => {
				data.append('img[]', file.src);
				filenames.push({caption: file.caption, filename: file.src.name});
			});
			newPoints.push({lat: point.lat, lng: point.lng, img: filenames});			
		});
		data.append('points', JSON.stringify(newPoints));

		clearInterval(timeout);

		const xhr = new XMLHttpRequest();

		xhr.upload.onprogress = (e) => {			
			if (e.lengthComputable) {
				const percentComplete = Math.round(100 * (e.loaded / e.total));
				dispatch(setDocumentProgress(percentComplete));
			} else console.warn("Size unknown!");
		};

		xhr.open(isEdit ? 'PUT' : "POST", URL, true);

		xhr.onreadystatechange = function () {
			if ( xhr.readyState === XMLHttpRequest.DONE ) {				
				if ( xhr.status >= 200 && xhr.status < 300 ) {

					// Dispatch actions to visual feedback
					dispatch(setDocumentStatus('SUCCESS'));
					dispatch(setDocumentMessage("Salvo com sucesso!"));
					dispatch(setDocumentProgress(0));

					// Parse response in case we are not editing
					if ( !isEdit ) {
						const id = parseInt(JSON.parse(JSON.parse(xhr.response)).documentId);
						dispatch(setDocumentId(id));
						dispatch(push(`/admin/documents/view/${id}`));						
					}			
						
					// Start countdown to wipe feedback message
					timeoutToWipeMessage(dispatch);
				} else {
					// Something went wrong...
					dispatch(setDocumentStatus('ERROR'));
					const errorDetails = xhr.responseText.split('\n')[1];
					dispatch(setDocumentMessage(`${xhr.statusText} - ${errorDetails}`));
					dispatch(setDocumentProgress(0));
					timeoutToWipeMessage(dispatch);
					console.warn(xhr.statusText);
				}
			}
		};

		xhr.setRequestHeader("Authorization", 'Token ' + getState().login.credentials.token);

		dispatch(setDocumentStatus('IN_PROGRESS'));
		xhr.send(data);
	};
}

export function deleteDocument(id, index) {
	return function(dispatch, getState) {		

		const URL = `${ROOT}/document/${id}/`;
		return fetch(URL, {
			method: 'DELETE',
			headers: {
				'Authorization': 'Token ' + getState().login.credentials.token,
				'Content-Type': 'application/json'
			}
		})
		.then((response) => checkStatus(response, dispatch))
		.then((response) => response.json())
		.then((json) => {
			dispatch(push("/admin/documents/view/"));
		})		
		.catch((e) => {
			alert(e);			
		});
	};
}

export function getDocuments() {
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

export function viewDocument(id) {
	return function(dispatch, getState) {

		const URL = `${ROOT}/document/${id}/`;

		dispatch(isSelectingDocument(id));	
		
		return fetch(URL, {
			method: 'GET',
			headers: {
				'Authorization': 'Token ' + getState().login.credentials.token,
				'Content-Type': 'application/json'
			}
		})
		.then((response) => checkStatus(response, dispatch))
		.then((response) => response.json())
		.then((json) => {
			let authorsTidy = [];

			// se tiver erro eh no reverse
			json.docAuthors.forEach((authorNorder) => {
				console.log(authorNorder);
				if (authorNorder.author === null ) {
					authorsTidy = json.authors;
					return;
				}
				json.authors.forEach((elem) => {
					if (elem.id === authorNorder.author ) {
						authorsTidy.push({
							id: authorNorder.author,
							name: elem.name,
							authorOrderByDoc: authorNorder.authorOrderByDoc
						});
					}
				});
			});

			authorsTidy.sort((a, b) => {
				if (a.authorOrderByDoc > b.authorOrderByDoc) {
					return 1;
				}
				if (a.authorOrderByDoc < b.authorOrderByDoc) {
					return -1;
				}
				// a must be equal to b
				return 0;
			});

			const doc = {
				title: json.title,
				url: json.url,
				folder: json.folder === null ? json.folder : { value: json.folder.id, label: json.folder.name },
				hasOwner: json.hasOwner === 1,
				isPublic: json.isPublic === 1,
				groups: json.groups,				
				points: json.points,
				datetime: json.datetime,
				startCoverageDate: json.startCoverageDate,
				endCoverageDate: json.endCoverageDate,
				description: json.description,
				files: json.files,
				log: json.log,
				projects: json.projects
			};
			dispatch(selectDocument(doc, parseInt(id)));
			dispatch(isSelectingDocument(null));
			dispatch(push(`/admin/documents/view/${id}`));
		})
		.catch((e) => {
			dispatch(isSelectingDocument(null));
			console.warn(e);			
		});
	};
}

export function toogleSaveButtonValue(nextVal) {
	return function(dispatch, getState) {
		dispatch(toogleBTSave(nextVal));
	};
}
export function toogleNextPageValue(nextVal) {
	return function(dispatch, getState) {
		dispatch(toogleNextPage(nextVal));
	};
}
function toogleNextPage(nextPage) {
	return {
		type: "ALLOW_NEXTPAGE",
		nextPage
	};
}

export function allowNextPage( nextPage ) {
	return function(dispatch, getState) {
		dispatch(allowNextPageT(nextPage));
	};
}
function allowNextPageT(nextPage) {
	return {
		type: "ALLOW_NEXTPAGE",
		nextPage
	};
}

function toogleBTSave(value) {
	return {
		type: "TOOGLE_SAVEBT",
		value
	};
}

export function setItemsPerPage(itemsPerPage) {
	return {
		type: "SET_DOCUMENTS_ITEMS_PER_PAGE",
		itemsPerPage
	};	
}

export function setCurrentPage(currentPage) {
	return {
		type: "SET_DOCUMENTS_CURRENT_PAGE",
		currentPage
	};	
}