/**
 * Created by saeidbay on 2016-10-26.
 */
CandidateUrls = new Mongo.Collection('candidateUrls');

CandidateUrlsSchema = new SimpleSchema({
	url:{
		type: String
	},
	previouslyOpened:{
		type: Boolean,
		optional:true
	}
});

CandidateUrls.attachSchema(CandidateUrlsSchema);