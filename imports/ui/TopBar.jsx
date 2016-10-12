import React, {Component} from 'react';
import {Meteor} from 'meteor/meteor';

import {createContainer} from 'meteor/react-meteor-data';
import LoginRegisterModal from './LoginRegisterModal.jsx';
import AccountsUIWrapper from './Accounts/AccountsUIWrapper.jsx';


// Feed component - represents the whole feed
export default class TopBar extends Component {


	render() {
		return (
			<div>
				<div className="top-bar">
					<div className="name"> TarTool</div>
					<img className="logo" src="/logo.png" alt="logo"/>
					{/*
					<form onSubmit={this.handleSubmit.bind(this)}>
						<input
							type="text"
							ref="searchInput"
							placeholder="find techies"
						/>
					</form>
					*/}
				</div>
				<LoginRegisterModal/>
			</div>
		);
	};

	handleSubmit(event) {
		event.preventDefault();

		// Find the text field via the React ref
		const text = ReactDOM.findDOMNode(this.refs.searchInput).value.trim();

		// Clear form
		ReactDOM.findDOMNode(this.refs.searchInput).value = '';
	}
}

export default createContainer(() => {
	return {
		currentUser: Meteor.user()
	};
}, TopBar);