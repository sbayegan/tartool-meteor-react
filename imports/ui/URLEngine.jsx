import React, {Component} from 'react';
import {Meteor} from 'meteor/meteor';
import ReactDOM from 'react-dom';
import URL from 'url';
import {createContainer} from 'meteor/react-meteor-data';


// Feed component - represents the whole feed
class URLEngine extends Component {
	/*
	 Take a look at https://react.rocks/example/react-select-popover
	 */
	constructor(props) {
		super(props);
		this.handleURL = this.handleURL.bind(this);
	}

	handleURL(event){
		event.preventDefault();

		// Get host name
		let url = ReactDOM.findDOMNode(this.refs.url).value.trim();
		Meteor.call('parseURL',url,(error,result) => {
			if(error)console.log("error",error);
			else console.log("result",result);
		});

		// Is hostname youtube ?
		//let isItYouTube = (hostname == "www.youtube.com" || hostname == "youtube.com")
		//console.log("isItYouTube",isItYouTube);
	}


	render() {
		return (
			<div className="feed-search">
				{ this.props.currentUser ?
					<div>
						<form onSubmit={this.handleURL.bind(this)}>
							URL: <input type="text" id="url" ref="url"/><br/>
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