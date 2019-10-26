import { combineReducers } from 'redux';
import { routerReducer as router } from 'react-router-redux';

// Reducers
import pessoas from './pessoas/reducer';
import exames from './exames/reducer';
import login from './login/reducer';
import caduser from './caduser/reducer';

export default combineReducers({
	exames,
	pessoas,
	login,
	caduser,
	router	
});