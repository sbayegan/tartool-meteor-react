import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';

import { createContainer } from 'meteor/react-meteor-data';

import Resource from './Resource.jsx';
import AccountsUIWrapper from './Accounts/AccountsUIWrapper.jsx';


// Feed component - represents the whole feed
export default class Profile extends Component {
	render() {
		return (
				<header>
					<h1>Profile of <h2>{this.props.params.id}</h2></h1>
				</header>
		);
	}
}

