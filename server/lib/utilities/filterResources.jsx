/**
 * Created by saeidbay on 2016-11-02.
 */

FilterResources = function(id, domInfo, domContents, tagGroups, isThisAMotherUrl) {
	let url = domInfo.url;
	let host = domInfo.host
	let title = domContents.title;
	let links = domContents.links;
	let thumbnail = domContents.thumbnail;
	let rawWordCount = tagGroups.rawWordCount;
	let totalTagsCount = tagGroups.totalTagsCount;
	let tags = tagGroups.tags;

	if (id && !isThisAMotherUrl) {
		// Remove it from candidates;
		CandidateUrls.remove({_id: id});
	}
	if (isThisAMotherUrl) {
		console.log("This is a mother url", url);
		_.each(links, function(url) {
			let found = CandidateUrls.findOne({url: url});
			if (!found) {
				CandidateUrls.insert({url: url});
			}
		});
	} else {
		console.log("This is not a mother url", url);

		let tagsToRawWordCountRatio = 0;
		if (totalTagsCount <= rawWordCount) {
			tagsToRawWordCountRatio = totalTagsCount / rawWordCount || 0;
		} else {
			tagsToRawWordCountRatio = 1;
		}

		let itemIsAccepted = ((tagsToRawWordCountRatio >= StandardRatio) && title);

		console.log(tagsToRawWordCountRatio.toFixed(2), title, url);

		if (itemIsAccepted) {

			let found = Resources.findOne({url: url});
			if (!found) {
				console.log("[YES]");

				let document = {
					createdAt: new Date(),
					active: false,
					host: host,
					url: url,
					title: title,
					thumbnail: thumbnail,
					rawWordCount: rawWordCount,
					totalTagsCount: totalTagsCount,
					tags: tags,
					tagsToRawWordCountRatio: tagsToRawWordCountRatio,
				};
				Resources.insert(document);
			}
		}
		else {
			console.log("[X]");

			RejectedUrls.upsert({url: url}, {
				$set: {
					tagsToRawWordCountRatio: tagsToRawWordCountRatio,
					rejectedAt: new Date()
				}
			});
		}
	}


	// REJECTED |OR| RESOURCES
	// 1/20

};