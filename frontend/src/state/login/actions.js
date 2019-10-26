import fetch from 'isomorphic-fetch';
import { push } from 'react-router-redux';
import { checkStatus } from '../util';
import { ROOT } from '../../constants/root';

export function getToken(username, password) {
	return function(dispatch, getState) {

		// Builds credentials
		const URL = `${ROOT}/auth/login/`;
		const auth = new Buffer(username + ':' + password).toString('base64');
		// Set visual UI
		dispatch(isFetching(true));

		return fetch(URL, {
			method: 'POST',
			headers: {
				'Authorization': 'Basic ' + auth,
				'Content-Type': 'application/json'
			}
		})
		.then((response) => checkStatus(response, dispatch))
		.then((response) => response.json())
		.then((json) => {
			dispatch(setCredentials(json.token, username));
			dispatch(push("/"));
		})
		.catch((e) => {
			console.trace()
			dispatch(isFetching(false));
			console.warn(e);
			// in case of fire the problem is down here
			// Caso choosenbyuder = undefined the o clear no loadstorage
			localStorage.clear();
		});
	};
}
// @TODO: erro do logout relacionada ao link abaixo
// https://stackoverflow.com/questions/35760943/how-can-i-enable-cors-on-django-rest-framework/38162454#38162454
export function logout() {
	return function(dispatch, getState) {
		const URL = `${ROOT}/auth/logout/`;
		return fetch(URL, {
			method: 'POST',
			headers: {
				'Authorization': 'Token ' + getState().login.credentials.token				
			}			
		})
		.then((response) => checkStatus(response, dispatch))
		.then(() => {
			console.trace();
			dispatch(setCredentials(null, null));
			dispatch(push('/login'));
		})
		.catch((e) => {
			dispatch(setCredentials(null, null));
			dispatch(push('/login'));
		});		
	};
}

export function isTokenValid() {
	return function(dispatch, getState) {		
		dispatch(isFetching(true));
		const URL = `${ROOT}/auth/token/`;
		return fetch(URL, {
			method: 'POST',
			headers: {
				'Authorization': 'Token ' + getState().login.credentials.token,
				'Content-Type': 'application/json'
			}
		})
		.then((response) => checkStatus(response, dispatch))
		.then(() => dispatch(isFetching(false)))
		.catch((e) => {
			dispatch(isFetching(false));
			console.warn(e);
		});
	};
}

export function changePassword(newPw, currPw, onSuccess, onError) {
	Event('Login', 'resetPassword', 'Alterou a senha de acesso.');
	return function(dispatch, getState) {

		const URL = `${ROOT}/user/change_password/`;
		const json = { new_password: newPw, old_password: currPw };

		return fetch(URL, {
			method: 'PUT',
			headers: {
				'Authorization': 'Token ' + getState().login.credentials.token,
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(json)
		})
		.then((response) => checkStatus(response, dispatch))
		.then(() => onSuccess())
		.catch((e) => {
			onError();
			console.warn(e);
		});
	};
}

export function resetPassword(email, onSuccess, onError) {
	Event('Login', 'resetPassword', 'Tentou resetar a senha.');
	return function(dispatch, getState) {

		const URL = `${ROOT}/user/reset_password/`;
		const json = { email: email };

		return fetch(URL, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(json)
		})
		.then((response) => checkStatus(response, dispatch))
		.then(() => onSuccess())
		.catch((e) => {
			onError();
			console.warn(e);
		});
	};
}

export function getProjectPermission(onSuccess, onError) {
	return function(dispatch, getState) {

		const URL = `${ROOT}/user/get_permissions/`;
		//const json = { new_password: newPw, old_password: currPw };

		return fetch(URL, {
			method: 'GET',
			headers: {
				'Authorization': 'Token ' + getState().login.credentials.token,
				'Content-Type': 'application/json'
			}
		})
		.then((response) => checkStatus(response, dispatch))
		.then(response => response.json())
		.then(data => {
			dispatch(setProjectAccess(data));
		})
		.catch((e) => {
			onError();
			console.warn(e);
		});
	};
}

export function setSetAll(login) {
	return {
		type: "SET_ALL",
		login
	};
}
export function setChoosenByUser(isMariana, isBrumadinho) {
	return {
		type: "SET_CHOOSEN_BY_USER",
		isMariana,
		isBrumadinho
	};
}
export function setCredentials(token, username) {
	return {
		type: "SET_CREDENTIALS",
		token,
		username
	};	
}

export function setProjectAccess(projectaccess) {
	return {
		type: "SET_PROJECT_ACCESS",
		projectaccess
	};
}

export function setMessage(message) {
	return {
		type: "SET_MESSAGE",
		message
	};	
}

function isFetching(bool) {
	return {
		type: "IS_FETCHING",
		bool
	};	
}