import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';

import { createContainer } from 'meteor/react-meteor-data';

import Resource from './Resource.jsx';
import AccountsUIWrapper from './Accounts/AccountsUIWrapper.jsx';


 
// Feed component - represents the whole feed
export default class Feed extends Component {
  getTasks() {
    return [
      { _id: 1, text: 'This is task 1' },
      { _id: 2, text: 'This is task 2' },
      { _id: 3, text: 'This is task 3' },
    ];
  }
 
  renderTasks() {
    return this.getTasks().map((resource) => (
      <Resource key={resource._id} resource={resource} />
    ));
  }
 
  render() {
    return (

      <div className="container">
      <AccountsUIWrapper />
        <header>
          <h1>Resource Feed</h1>
        </header>
          { this.props.currentUser ?
            <div>LOGGED IN</div> : ""
          }
          {this.renderTasks()}

      </div>
    );
  }
}

export default createContainer(() => {
  return {
    currentUser:  Meteor.user()
  };
}, Feed);