import React, {Component} from 'react';
import {Meteor} from 'meteor/meteor';

import {createContainer} from 'meteor/react-meteor-data';

import Resource from './Resource.jsx';
import AccountsUIWrapper from './Accounts/AccountsUIWrapper.jsx';

// This is what I need to implement tab functionality


// Feed component - represents the whole feed
class App extends Component {
	render() {
		return (
			<div>
				<div className="top-bar">
					<div className="name"> TarTool </div>
					<div className="logo-and-name">
						<img className="logo" src="logo.png" alt="logo"/>
					</div>
					<form onSubmit={this.handleSubmit.bind(this)}>
						<input
							   type="text"
							   ref="searchInput"
							   placeholder=" Find techies"
						/>
					</form>
				</div>
				<div className="under-top-bar-area">
					<div className="tab-menu-area">
					</div>
				</div>
				{this.props.children}
			</div>

		);
	}

	handleSubmit(event) {
		event.preventDefault();

		// Find the text field via the React ref
		const text = ReactDOM.findDOMNode(this.refs.searchInput).value.trim();

		// Clear form
		ReactDOM.findDOMNode(this.refs.searchInput).value = '';
	}


}

export default AppContainer = createContainer(() => {
	return {
		currentUser: Meteor.user()
	};
}, App);

