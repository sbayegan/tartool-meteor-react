import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';

import { createContainer } from 'meteor/react-meteor-data';



 
// Feed component - represents the whole feed
export default class URLEngine extends Component {

 
  render() {
    return (
    <div>
          { this.props.currentUser ?
            <div>
              <form>
              URL: <input type="text"/><br/>
              <input type="submit" value="Submit"/>
              </form>
              <hr/>
            </div> :
              ""
          }

    </div>
    );
  }
}

export default createContainer(() => {
  return {
    currentUser: Meteor.user()
  };
}, URLEngine);