/**
 * Created by saeidbay on 2016-10-26.
 */
MotherUrls = new Mongo.Collection('motherUrls');

MotherUrlsSchema = new SimpleSchema({
	url:{
		type: String
	}
});

MotherUrls.attachSchema(MotherUrlsSchema);