Resources = new Mongo.Collection('resouces');

/*
ResourcesScoresSchema = new SimpleSchema({
	likes: {
		type: Number
	},
	sharesOnFacebook: {
		type: Number,
		optional: true
	},
	sharesOnTwitter: {
		type: Number,
		optional: true
	}
	,
	sharesOnLinkedIn: {
		type: Number,
		optional: true
	}
});

TagsCountSchema = new SimpleSchema({
	label: {
		type: String
	},
	count: {
		type: Number
	}
});
*/
ResourcesSchema = new SimpleSchema({
	createdAt: {
		type: Date
	},
	active: {
		type: Boolean,
		defaultValue: false
	},
	host: {
		type: String
	},
	url: {
		type: String
	},
	title: {
		type: String,
		max: 200
	},
	rawWordCount: {
		type: Number
	},
	totalTagsCount: {
		type: Number
	},
	tagsToRawWordCountRatio: {
		type: Number,
		decimal: true,
		optional:true,
	}
/*
	,
	tags: {
		type: [TagsCountSchema],
		optional: true
	},

	labels: {
		type: [String],
		min: 1,
		max: 30,
		optional: true
	},
	thumbnailURL: {
		type: SimpleSchema.RegEx.Domain,
		optional: true
	},
	socialMediaScores: {
		type: ResourcesScoresSchema,
		optional: true
	}
	*/
});

Resources.attachSchema(ResourcesSchema);