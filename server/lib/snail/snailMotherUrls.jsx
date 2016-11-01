/**
 * Created by saeidbay on 2016-10-31.
 */

SnailMotherUrls = function() {
	let motherUrls = MotherUrls.find({}).fetch();
	_.each(motherUrls,function(motherUrl) {
		Snail(motherUrl.url);
	});
};