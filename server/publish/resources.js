/**
 * Created by saeidbay on 2016-11-05.
 */
if (Meteor.isServer) {
	// This code only runs on the server
	Meteor.publish('resources', function() {
		return Resources.find();
	});
}