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



Meteor.methods({
	"parseURL":function(url) {
		let domInfo = RetrieveDOM(url);
		let domContents = ScanDom(domInfo.host,domInfo.dom);
		return domContents;
	}

});