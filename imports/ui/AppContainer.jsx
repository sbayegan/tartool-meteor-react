import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';

import { createContainer } from 'meteor/react-meteor-data';

import Resource from './Resource.jsx';
import AccountsUIWrapper from './Accounts/AccountsUIWrapper.jsx';


// Feed component - represents the whole feed
class App extends Component {
	render() {
		return (
			<div>
				<header>
					App
				</header>

				{this.props.children}
			</div>

		);
	}
}

export default AppContainer = createContainer(() => {
	return {
		currentUser: Meteor.user()
	};
}, App);

