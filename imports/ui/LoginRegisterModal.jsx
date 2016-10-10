import React, { Component } from 'react';
import Modal from 'react-modal';
import { Meteor } from 'meteor/meteor';

import { createContainer } from 'meteor/react-meteor-data';
import {Tab, Tabs, TabList, TabPanel} from 'react-tabs';

import AccountsUIWrapper from './Accounts/AccountsUIWrapper.jsx';

const customStyles = {
	content : {
		top                   : '50%',
		left                  : '50%',
		right                 : 'auto',
		bottom                : 'auto',
		marginRight           : '-50%',
		transform             : 'translate(-50%, -50%)'
	}
};

// Feed component - represents the whole feed
export default class LoginRegisterModal extends Component {
	constructor(props) {
		super(props);
		this.state = {
			modalIsOpen: false,
		};
		this.openModal = this.openModal.bind(this);
		this.closeModal = this.closeModal.bind(this);
	}

	openModal() {
		this.setState({
			modalIsOpen: true,
		});
	}

	afterOpenModal() {
		// references are now sync'd and can be accessed.
		//this.refs.subtitle.style.color = '#f00';
	}

	closeModal() {
		this.setState({
			modalIsOpen: false,
		});
	}
	render() {
		return (
			<div>
			<div className="authentication-box">
				{
					this.props.currentUser ?
						"LOGGED IN" : <span onClick={this.openModal}>Login or Register</span>
				}
			</div>
				<div>
					<button onClick={this.openModal}>Open Modal</button>
					<Modal
						isOpen={this.state.modalIsOpen}
						onAfterOpen={this.afterOpenModal}
						onRequestClose={this.closeModal}
						style={customStyles}
						 >

						<Tabs onSelect={this.handleSelect} selectedIndex={0}>
							<TabList className="">
								<Tab>Log-In</Tab>
								<Tab>Register</Tab>
							</TabList>
							<TabPanel className="">
								Log-In <br/>
								Log-In <br/>
								Log-In <br/>
								Log-In <br/>
								Log-In <br/>
								Log-In <br/>
								Log-In <br/>
								Log-In <br/>
								Log-In <br/>
								Log-In <br/>
								Log-In <br/>
								Log-In <br/>
								Log-In
							</TabPanel>
							<TabPanel className="">
								Register <br/>
								Register <br/>
								Register <br/>
								Register <br/>
								Register <br/>
								Register <br/>
								Register <br/>
								Register <br/>
								Register <br/>
								Register <br/>
								Register <br/>
								Register <br/>
								Register
							</TabPanel >
						</Tabs>
					</Modal>
				</div>
			</div>
		);
	}
}

export default createContainer(() => {
	return {
		currentUser: Meteor.user()
	};
}, LoginRegisterModal);
