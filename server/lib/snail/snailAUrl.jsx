/**
 * Created by saeidbay on 2016-10-26.
 */

SnailARandomUrl = function() {
	let candidateUrlsCount = CandidateUrls.find({}).count();
	if(candidateUrlsCount){
		let nextCandidate = CandidateUrls.findOne({});
		let chosenUrl = nextCandidate.url;

		Snail(chosenUrl);
	};
};