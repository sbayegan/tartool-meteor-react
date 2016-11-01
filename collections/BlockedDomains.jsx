/**
 * Created by saeidbay on 2016-10-26.
 */
BlockedDomains = new Mongo.Collection('blockedDomains');

BlockedDomainsSchema = new SimpleSchema({
	domain:{
		type: String
	}
});

BlockedDomains.attachSchema(BlockedDomainsSchema);