import React from 'react';
import { Router, Route, browserHistory } from 'react-router';

import Feed from '../ui/Feed.jsx';

export const renderRoutes = () => (
<Router history={browserHistory}>
	<Route path="/" component={Feed}>
		<Route path="food" component={Feed}/>
	</Route>
	</Router>
);





