/**
 * Created by saeidbay on 2016-10-26.
 */
RejectedUrls = new Mongo.Collection('rejectedUrls');

RejectedUrlsSchema = new SimpleSchema({
	url:{
		type:String
	},
	tagsToRawWordCountRatio:{
		type: Number,
		decimal: true
	}
});

RejectedUrls.attachSchema(RejectedUrlsSchema);