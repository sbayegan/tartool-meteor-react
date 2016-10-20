import React, { Component } from 'react';
import Modal from 'react-modal';
import { Meteor } from 'meteor/meteor';

import { createContainer } from 'meteor/react-meteor-data';
import {Tab, Tabs, TabList, TabPanel} from 'react-tabs';
import ReactDOM from 'react-dom';


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
		this.handleLogin = this.handleLogin.bind(this);
		this.handleRegister = this.handleRegister.bind(this);
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

	logout(){
		Meteor.logout();
	}

	handleLogin(event){
		event.preventDefault();

		let email = ReactDOM.findDOMNode(this.refs.loginEmail).value.trim();
		let password = ReactDOM.findDOMNode(this.refs.loginPassword).value;
		let closeModal = this.closeModal;

		Meteor.loginWithPassword(email,password,function(error) {
			if(error){
				 //TODO: DELIVER THE ERROR REASON
				console.log(error);
			}
			else{
				closeModal();
			}
		});
	}

	handleRegister(event){
		event.preventDefault();

		let name = ReactDOM.findDOMNode(this.refs.registerName).value.trim();
		let email = ReactDOM.findDOMNode(this.refs.registerEmail).value.trim();
		let password = ReactDOM.findDOMNode(this.refs.registerPassword).value;
		let passwordRepeat = ReactDOM.findDOMNode(this.refs.registerPasswordRepeat).value;

		let closeModal = this.closeModal; // TODO: The user needs to see email activation message, so this might be deleted

		if(password != passwordRepeat){
			//TODO: show warning
			console.log("WARNING: Passwords don't match");
		}
		Accounts.createUser({
			email:email,
			password:password,
			profile:name
		},function(error) {
			if(error){
				// TODO: Deliver the reason
				console.log(error);
			}else{
				//TODO: Ask the user to verify their email address and REMOVE THE FOLLOWING AUTO LOGIN
				Meteor.loginWithPassword(email,password,function(Error) {
					if(Error){}
					else{closeModal();}
				});
			}
		});
	}

	render() {
		return (
			<div>
			<div className="authentication-box">
				{
					this.props.currentUser ?
						<span onClick={this.logout}>LogOUT</span> : <span onClick={this.openModal}>Login/Register</span>
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
								<form onSubmit={this.handleLogin.bind(this)}>
									<div className="form-group">
										<label htmlFor="email">Email address:</label>
										<input type="email" className="form-control" id="email" ref="loginEmail"/>
									</div>
									<div className="form-group">
										<label htmlFor="pwd">Password:</label>
										<input type="password" className="form-control" id="pwd" ref="loginPassword"/>
									</div>
									<button type="submit" className="btn btn-default">Login</button>
								</form>
							</TabPanel>
							<TabPanel className="">
								<form onSubmit={this.handleRegister.bind(this)}>
									<div className="form-group">
										<label htmlFor="name">Name:</label>
										<input type="text" className="form-control" id="name" ref="registerName"/>
									</div>
									<div className="form-group">
										<label htmlFor="email">Email address:</label>
										<input type="email" className="form-control" id="email" ref="registerEmail"/>
									</div>
									<div className="form-group">
										<label htmlFor="pwd">Password:</label>
										<input type="password" className="form-control" id="pwd" ref="registerPassword"/>
									</div>
									<div className="form-group">
										<label htmlFor="pwd">Re-enter password:</label>
										<input type="password" className="form-control" id="pwd" ref="registerPasswordRepeat"/>
									</div>
									<button type="submit" className="btn btn-default">Register</button>
								</form>
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
