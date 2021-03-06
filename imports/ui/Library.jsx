import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';

import { createContainer } from 'meteor/react-meteor-data';

import Resource from './Resource.jsx';
import AccountsUIWrapper from './Accounts/AccountsUIWrapper.jsx';


// Feed component - represents the whole feed
export class Library extends Component {
	render() {
		return (
				<header>
					<h1>Library</h1>
				</header>
		);
	}
}


export default createContainer(() => {
	return {
		currentUser: Meteor.user()
	};
}, Library);

