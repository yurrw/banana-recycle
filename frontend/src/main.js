import React from 'react';
import ReactDOM from 'react-dom';
import createBrowserHistory from 'history/lib/createBrowserHistory';
import { useRouterHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import makeRoutes from './routes';
import App from './containers/App';
import configureStore from './state/configureStore';

// Local Storage facilities
import throttle from 'lodash/throttle';
import { loadState, saveState } from './localStorage';

// Configure history for react-router
const browserHistory = useRouterHistory(createBrowserHistory)({
	basename: __BASENAME__
});

browserHistory.listen((location) => {
	
});

// Create redux store and sync with react-router-redux. We have installed the
// react-router-redux reducer under the key "router" in src/routes/index.js,
// so we need to provide a custom `selectLocationState` to inform
// react-router-redux of its location.
const persistedState = loadState();
//const initialState = window.__INITIAL_STATE__;
export const store = configureStore(persistedState, browserHistory);
const history = syncHistoryWithStore(browserHistory, store, {
	selectLocationState: (state) => state.router
});

store.subscribe(throttle(() => {
	saveState({
		login: { projectaccess: store.getState().login.projectaccess,
			groupaccess: store.getState().login.groupaccess,
			credentials: store.getState().login.credentials,
			choosenbyuser: store.getState().login.choosenbyuser }

	});
}, 1000));

// Now that we have the Redux store, we can create our routes. We provide
// the store to the route definitions so that routes have access to it for
// hooks such as `onEnter`.
const routes = makeRoutes(store);

// Now that redux and react-router have been configured, we can render the
// React application to the DOM!
ReactDOM.render(
	<App history={history} routes={routes} store={store} />,
	document.getElementById('my-react-app')
);