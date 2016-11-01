Resources = new Mongo.Collection('resouces');

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

TagsCountSchema = new SimpleSchema({
	label:{
		type:String
	},
	count:{
		type: Number
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
	labels:{
		type: [String],
		min: 1,
		max: 30
	},
	host:{
		type: String
	},
	url:{
		type: SimpleSchema.RegEx.Domain
	},
	title:{
		type: String,
		max: 200
	},
	rawWordCount:{
		type: Number
	},
	totalTagsCount:{
		type: Number
	},
	tags:{
		type:[TagsCountSchema]
	}
	,
	tagsToRawWordCountRatio:{
		type:Number,
		decimal:true
	}
	,
	thumbnailURL:{
		type: SimpleSchema.RegEx.Domain
	},
	socialMediaScores:{
		type: ResourcesScoresSchema,
		autoform: {
          type: 'hidden'
        }
	},
	createdAt:{
		type: Date,
		autoform: {
          type: 'hidden'
        }
	}
});

Resources.attachSchema(ResourcesSchema);