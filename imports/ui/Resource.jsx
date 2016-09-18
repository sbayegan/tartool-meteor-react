import React, { Component, PropTypes } from 'react';
 
// Task component - represents a single todo item
export default class Resource extends Component {
  render() {
    return (
      <div>{this.props.resource.text}<hr/></div>
    );
  }
}
Resource.propTypes = {
  // This component gets the task to display through a React prop.
  // We can use propTypes to indicate it is required
  resource: PropTypes.object.isRequired,
};