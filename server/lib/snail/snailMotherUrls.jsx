/**
 * Created by saeidbay on 2016-10-31.
 */

/**
 * Snail all mother URLs
 * @constructor
 */
SnailMotherUrls = function() {
	let motherUrls = MotherUrls.find({}).fetch();
	_.each(motherUrls, function(motherUrl) {
		Snail(null, motherUrl.url);
	});
};