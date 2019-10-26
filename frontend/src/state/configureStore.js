import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';
import rootReducer from './rootReducer';
import { routerMiddleware } from 'react-router-redux';

export default function configureStore (initialState = {}, history) {

	const loggerMiddleware = createLogger();
	let middleware = applyMiddleware(thunk, routerMiddleware(history), loggerMiddleware);

	// Create final store and subscribe router in debug env ie. for devtools
	const store = middleware(createStore)(rootReducer, initialState);

	if (module.hot) {
		module.hot.accept('./rootReducer', () => {
			const nextRootReducer = require('./rootReducer').default;
			store.replaceReducer(nextRootReducer);
		});
	}
	return store;
}