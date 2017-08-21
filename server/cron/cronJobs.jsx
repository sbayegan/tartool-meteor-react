

SyncedCron.add({
	name: 'Snail a URL',
	schedule: function(parser) {
		// parser is a later.parse object
		return parser.text('every 5 seconds');
	},
	job: SnailARandomUrl
});


SyncedCron.add({
	name: 'Snail  a Mother URL',
	schedule: function(parser) {
		// parser is a later.parse object
		return parser.text('every 1 minute');
	},
	job: SnailMotherUrls
});