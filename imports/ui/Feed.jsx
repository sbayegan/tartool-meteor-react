import React, {Component} from 'react';
import {Meteor} from 'meteor/meteor';

import {createContainer} from 'meteor/react-meteor-data';

import Resource from './Resource.jsx';
import AccountsUIWrapper from './Accounts/AccountsUIWrapper.jsx';


// Feed component - represents the whole feed
export class Feed extends Component {
	getResources() {
		return this.props.resources
	}

	renderResources() {
		return this.getResources().map((resource) => (
			<Resource key={resource._id} resource={resource}/>
		));
	}

	render() {
		return (
			<div className="feed-wrapper">
				<div className="feed">
					<AccountsUIWrapper />

					{ this.props.currentUser ?
						<div>LOGGED IN</div> : ""
					}


					{this.renderResources()}
				</div>
			</div>
		);
	}
}

export default createContainer(() => {
	Meteor.subscribe('resources');
	return {
		currentUser: Meteor.user(),
		resources: Resources.find({}).fetch()
	};
}, Feed);