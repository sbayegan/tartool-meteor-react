import React from 'react';
import { Router, Route, browserHistory } from 'react-router';

import App from '../ui/AppContainer.jsx'
import Feed from '../ui/Feed.jsx';
import Profile from '../ui/Profile.jsx';
import Library from '../ui/Library.jsx';
import Login from '../ui/Login.jsx';
import NotFound from '../ui/NotFound.jsx';


/**
 * Please note that no one's username can be library or food
 *
 * Two good links to help you setup authenticated routing
 * https://alexgaribay.com/2015/10/13/authenticated-routes-with-meteor-and-react-router/
 * http://www.mrscottmcallister.com/custom-authentication-in-meteor/
 * http://blog.stackpie.com/creating-authenticated-routes-meteor-react-app/
 */

const requireAuth = (nextState, replace) => {
	if (!Meteor.loggingIn() && !Meteor.userId()) {
		replace({
			pathname: '/login',
			state: { nextPathname: nextState.location.pathname },
		});
	}
};

export const renderRoutes = () => (
<Router history={browserHistory}>
	<Route path="/" component={App}>
		<Route path="food" component={Feed}/>
		<Route path="techie/:id" component={Profile}/>
		<Route path="library" component={Library} onEnter={ requireAuth }/>
		<Route path="login" component={Login}/>
		<Route path="*" component={NotFound}/>
	</Route>
	</Router>
);





