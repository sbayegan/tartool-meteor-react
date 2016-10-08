import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';

import { createContainer } from 'meteor/react-meteor-data';

import Resource from './Resource.jsx';
import AccountsUIWrapper from './Accounts/AccountsUIWrapper.jsx';


 
// Feed component - represents the whole feed
export default class Feed extends Component {
  getResources() {
    return [
      { _id: 1, text: 'This is Resource 1' },
      { _id: 2, text: 'This is Resource 2' },
      { _id: 3, text: 'This is Resource 3' },
    ];
  }

  renderResources() {
    return this.getResources().map((resource) => (
      <Resource key={resource._id} resource={resource} />
    ));
  }
 
  render() {
    return (
    <div>
      <AccountsUIWrapper />

          { this.props.currentUser ?
            <div>LOGGED IN</div> : ""
          }


          {this.renderResources()}
    </div>
    );
  }
}

export default createContainer(() => {
  return {
    currentUser: Meteor.user()
  };
}, Feed);