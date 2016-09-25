import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';

import { createContainer } from 'meteor/react-meteor-data';

import Resource from './Resource.jsx';
import AccountsUIWrapper from './Accounts/AccountsUIWrapper.jsx';


// Feed component - represents the whole feed
export default class Library extends Component {
	render() {
		return (
				<header>
					<h1>LOGIN PAGE</h1>
					<p>This is under active construction</p>
				</header>
		);
	}
}

