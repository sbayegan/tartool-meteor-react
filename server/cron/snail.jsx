SyncedCron.add({
	name: 'Be happy you are not wasting your time',
	schedule: function(parser) {
		// parser is a later.parse object
		return parser.text('every 100 seconds');
	},
	job: SnailARandomUrl
});

