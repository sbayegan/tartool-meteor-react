/**
 * Created by saeidbay on 2016-10-26.
 */
/**
 * Created by saeidbay on 2016-10-18.
 */
import URL from 'url';

import FetchUrl from 'fetch';
import HTMLParser from 'htmlparser';
import Future from 'fibers/future';
import IsURL from 'is-url';
import normalizeURL from 'normalize-url';
import wordCount from 'wordcount';


/**
 * It snails a url. If id is passed then we look for its corresponding URL in CandidateUrls.
 * We will use the inputUrl otherwise. inputUrl is usually passed by snailMotherUrls
 * @param id
 * @param inputUrl
 * @constructor
 */
Snail = function(id, inputUrl) {

	let url;

	// Set the url based on the id
	if (inputUrl) {
		url = inputUrl;
	} else {
		let urlProfile = CandidateUrls.findOne({_id: id});
		url = urlProfile.url;
	}

	let foundInRejected = RejectedUrls.findOne({url: url});
	let foundInResources = Resources.findOne({url: url});
	let alreadyOpened = CandidateUrls.findOne({url: url, previouslyOpened: true});

	if (foundInRejected || foundInResources) {
		console.log("resource was already found in rejected/resources");
		CandidateUrls.remove({url: url});
		return;
	}
	else if (alreadyOpened) {
		// TODO: may need to be moved to a new collection.
		console.log("opened once but could not finish the operation for whatever reason");
		CandidateUrls.remove({url: url});
		RejectedUrls.upsert({url: url}, {
			$set: {
				rejectedAt: new Date(),
				tagsToRawWordCountRatio: 0
			}
		});
		return;
	} else {
		// Mark it as started
		CandidateUrls.update({url: url}, {
			$set: {
				previouslyOpened: true
			}
		});
		// Phase 1
		let domInfo = RetrieveDOM(url);
		let documentIsPdf = false;
		// Phase 2
		if (domInfo) {
			documentIsPdf = (domInfo.meta.responseHeaders['content-type'] == "application/pdf");
		}
		// Phase 3
		if (!domInfo || documentIsPdf) {
			console.log('badUrl:', url);
			CandidateUrls.remove({url: url});
			RejectedUrls.upsert({url: url}, {
				$set: {
					rejectedAt: new Date(),
					tagsToRawWordCountRatio: 0
				}
			})
		}// Phase 4
		else {
			let domContents = ScanDom(domInfo.host, domInfo.dom);
			let cleanedText = CleanDOMRawText(domContents.rawText);
			let tagGroups = ScanForTags(domContents.title, cleanedText);
			FilterResources(id, domInfo, domContents, tagGroups);
		}

		return;
	}
};
