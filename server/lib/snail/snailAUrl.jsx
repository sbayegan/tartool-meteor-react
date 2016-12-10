/**
 * Created by saeidbay on 2016-10-26.
 */

/**
 * Grab a random URL from the table and snail it
 * @constructor
 */
SnailARandomUrl = function() {
	let candidateUrlsCount = CandidateUrls.find({}).count();
	if(candidateUrlsCount){
		let nextCandidate = CandidateUrls.findOne({});
		let chosenUrlId = nextCandidate._id;

		Snail(chosenUrlId);
	};
};
