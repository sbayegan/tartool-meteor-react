import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';

import { createContainer } from 'meteor/react-meteor-data';

import Resource from './Resource.jsx';
import AccountsUIWrapper from './Accounts/AccountsUIWrapper.jsx';


// Feed component - represents the whole feed
export default class NotFound extends Component {
	render() {
		return (
				<header>
					<h1>404-Not Found</h1>
					<p>The page you requested does not exist</p>
				</header>
		);
	}
}

