export const Resources = new Mongo.Collection('resouces');

ResourcesScoresSchema = new SimpleSchema({
	likes:{
		type: Number
	},
	sharesOnFacebook:{
		type: Number,
		optional: true
	},
	sharesOnTwitter:{
		type: Number,
		optional: true
	}
	,
	sharesOnLinkedIn:{
		type: Number,
		optional: true
	}
});

ResourcesDatesSchema = new SimpleSchema({
	submittedAt:{
		type: Date
	},
	approvedAt:{
		type: Date
	}
});

ResourcesSchema = new SimpleSchema({
	active:{
		type: Boolean,
		defaultValue: false,
		autoform: {
          type: 'hidden'
        }
	},
	contributerId:{
		type: String,
		autoform: {
          type: 'hidden'
        }
	},
	title:{
		type: String,
		max: 200
	},
	description:{
		type : String,
		max : 1500
	},
	medium:{
		type: String,
		allowedValues: ['video','gadget','read','influencer']
	},
	labels:{
		type: [String],
		min: 1,
		max: 30
	},
	url:{
		type: SimpleSchema.RegEx.Domain
	},
	thumbnailURL:{
		type: SimpleSchema.RegEx.Domain
	},
	scores:{
		type: ResourcesScoresSchema,
		autoform: {
          type: 'hidden'
        }
	},
	dates:{
		type: ResourcesDatesSchema,
		autoform: {
          type: 'hidden'
        }
	}
});

Resources.attachSchema(ResourcesSchema);