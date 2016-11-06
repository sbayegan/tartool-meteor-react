import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';

import { createContainer } from 'meteor/react-meteor-data';

import Resource from './Resource.jsx';
import AccountsUIWrapper from './Accounts/AccountsUIWrapper.jsx';


// Feed component - represents the whole feed
export class Channels extends Component {
	render() {
		return (
				<header>
					<h1>Channels</h1>
				</header>
		);
	}
}


export default createContainer(() => {
	return {
		currentUser: Meteor.user()
	};
}, Channels);

