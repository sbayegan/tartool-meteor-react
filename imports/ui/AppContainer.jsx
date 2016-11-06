import React, {Component} from 'react';
import {Meteor} from 'meteor/meteor';

import {createContainer} from 'meteor/react-meteor-data';

import ReactDOM from 'react-dom';

import TopBar from './TopBar';
import Feed from './Feed.jsx';
import URLEngine from './URLEngine.jsx';
import Library from './Library.jsx';
import Channels from './Channels.jsx';

import {Tab, Tabs, TabList, TabPanel} from 'react-tabs';

// This is what I need to implement tab functionality


// Feed component - represents the whole feed
class App extends Component {
	render() {
		return (
			<div>
				<TopBar/>
				<div className="under-top-bar-area">
					<Tabs onSelect={this.handleSelect} selectedIndex={0}>
						<TabList className="tab-menu-area">
							<Tab>Home</Tab>
							<Tab>Library</Tab>
							<Tab>Filter</Tab>
						</TabList>
						<TabPanel className="tab-content-area">
								<URLEngine/>
								<Feed/>
						</TabPanel>
						<TabPanel className="tab-content-area">
							<Library/>
						</TabPanel >
						<TabPanel className="tab-content-area">
							<Channels/>
						</TabPanel>
					</Tabs>
				</div>
				{this.props.children}
			</div>

		);
	};


}

export default createContainer(() => {
	return {
		currentUser: Meteor.user()
	};
}, App);

