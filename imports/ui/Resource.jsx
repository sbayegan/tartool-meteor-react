import React, {Component, PropTypes} from 'react';

// Task component - represents a single todo item
export default class Resource extends Component {
	render() {
		return (
			<div className="resource-circle">
				<a href={this.props.resource.url} target="_blank">
					<div className="resource-title">
						{this.props.resource.title}
					</div>
				</a>
				<hr className="resource-horizontal-line-below-title"/>
				<div className="resource-tags-box">
					{
						this.props.resource.tags.map(function(tag) {
							return <span className="badge">{tag.label}      </span>
						})
					}
				</div>
				<div className="resource-save">
					Save
				</div>
			</div>
		);
	}
}
Resource.propTypes = {
	// This component gets the task to display through a React prop.
	// We can use propTypes to indicate it is required
	resource: PropTypes.object.isRequired,
};