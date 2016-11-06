/**
 * Created by saeidbay on 2016-10-31.
 */

Meteor.startup(function() {

	_.each(motherUrlsList,function(url) {
		var found = MotherUrls.findOne({url:url});

		if (!found){
			MotherUrls.insert({url:url});
		}
	});
});