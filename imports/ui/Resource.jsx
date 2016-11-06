import React, {Component, PropTypes} from 'react';

// Task component - represents a single todo item
export default class Resource extends Component {
	render() {
		return (
			<div className="resource-circle">
				{this.props.resource.title}
				<hr/>
			</div>
		);
	}
}
Resource.propTypes = {
	// This component gets the task to display through a React prop.
	// We can use propTypes to indicate it is required
	resource: PropTypes.object.isRequired,
};