import { setCredentials, setMessage } from './login/actions';
import { push } from 'react-router-redux';

export const checkStatus = (response, dispatch) => {
	if ( response.status >= 200 && response.status < 300 ) {
		return response;
	} else {
		if ( typeof dispatch !== "undefined" ) checkAuth(response, dispatch);
		const error = new Error(response.statusText);
		error.response = response;
		throw error;
	}
};

const checkAuth = (response, dispatch) => {
	if ( response.status === 401 ) {
		dispatch(setCredentials(null, null));
		dispatch(setMessage("O seu login expirou. Por favor, identifique-se novamente."));
		dispatch(push('/login'));
	} else if ( response.status === 403 ) {
		dispatch(setMessage("Usuário e/ou senha inválidos"));
	}
};