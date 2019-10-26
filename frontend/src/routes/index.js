import React from 'react';
import { Route, IndexRoute, IndexRedirect, Redirect } from 'react-router';

// NOTE: here we're making use of the `resolve.root` configuration
// option in webpack, which allows us to specify import paths as if
// they were from the root of the ~/src directory. This makes it
// very easy to navigate to files regardless of how deeply nested
// your current file is.
import AppContainer from 'containers/AppContainer';
import LoginContainer from 'containers/LoginContainer';
import MainContainer from 'containers/MainContainer';
import PessoaContainer from '../containers/PessoaContainer';
import ChangePasswordContainer from 'containers/ChangePasswordContainer';
import RecoverPasswordContainer from 'containers/RecoverPasswordContainer';
import WelcomeContainer from 'containers/WelcomeContainer';
import CadUserContainer from 'containers/CadUserContainer';

import Dashboard from 'components/Home/Dashboard';
import NotFound from 'components/Common/NotFound';
import ExameListContainer from '../containers/ExameListContainer';
import ExameContainer from '../containers/ExameContainer';

export default (store) => (
	<Route path='/' component={AppContainer}>
		<IndexRedirect to="/admin/welcome" />
		<Route path="admin" component={MainContainer}>
			<IndexRoute component={Dashboard} />
			<Route path='caduser' component={CadUserContainer} />
			<Route path='change_password' component={ChangePasswordContainer} />
			<Route path='authexams/view' component={ExameListContainer} />

			<Route path='pessoa/create' component={PessoaContainer} />
			<Route path='authexam/create' component={ExameContainer} />

			<Route path='welcome' component={WelcomeContainer} />
		</Route>
		
		<Route path='login' component={LoginContainer} />
		<Route path='recover_password' component={RecoverPasswordContainer} />

		{/* URL don't match any of above, render not found component */}
		<Route path='*' component={NotFound} />
	</Route>
);