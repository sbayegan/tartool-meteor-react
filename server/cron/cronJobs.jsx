

SyncedCron.add({
	name: 'Snail a URL',
	schedule: function(parser) {
		// parser is a later.parse object
		return parser.text('every 1 second');
	},
	job: SnailARandomUrl
});


SyncedCron.add({
	name: 'Snail motherUrls',
	schedule: function(parser) {
		// parser is a later.parse object
		return parser.text('every 1 minute');
	},
	job: SnailMotherUrls
});