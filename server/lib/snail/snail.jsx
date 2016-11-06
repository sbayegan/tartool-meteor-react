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


Snail = function(id,inputUrl) {

	let url;

	if(inputUrl){
		url = inputUrl;
	}else{
		let urlProfile = CandidateUrls.findOne({_id:id});
		url = urlProfile.url;
	}

	let foundInRejected = RejectedUrls.findOne({url:url});
	let foundInResources = Resources.findOne({url:url});
	let alreadyOpened = CandidateUrls.findOne({url:url,previouslyOpened:true});

	if(foundInRejected || foundInResources){
		console.log("foundInRejected || foundInResources");
		CandidateUrls.remove({url:url});
	}
	else if (alreadyOpened){
		// TODO: remove from candidates
		console.log("opened once");
		CandidateUrls.remove({url:url});
		RejectedUrls.upsert({url:url},{
			$set:{
				rejectedAt: new Date(),
				tagsToRawWordCountRatio:0
				}
		});
		return;
	}else {
		// Mark it as started

		CandidateUrls.update({url:url},{
			$set:{
				previouslyOpened:true
			}
		});


		let domInfo = RetrieveDOM(url);
		let documentIsPdf = false;
		if (domInfo) {
			documentIsPdf = (domInfo.meta.responseHeaders['content-type'] == "application/pdf");
		}
		if (!domInfo || documentIsPdf) {
			console.log('badUrl:', url);
			CandidateUrls.remove({url: url});
			RejectedUrls.upsert({url: url}, {
				$set: {
					rejectedAt: new Date(),
					tagsToRawWordCountRatio: 0
				}
			})
		}
		else {
			let domContents = ScanDom(domInfo.host, domInfo.dom);
			let cleanedText = CleanDOMRawText(domContents.rawText);
			let tagGroups = ScanForTags(domContents.title, cleanedText);
			FilterResources(id, domInfo, domContents, tagGroups);
		}

		return;
	}
};
