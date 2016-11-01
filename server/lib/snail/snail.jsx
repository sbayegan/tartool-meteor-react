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


Snail = function(url) {

	let URLData = {
		host: null,
		url: null,
		dom: null,
		title: null,
		links: [],
		rawText: "",
		rawWordCount: 0,
		tags: [],
		totalTagsCount: 0
	};


	let future = new Future();
	let parsedURL = URL.parse(url);
	// Hostname should be defined before we can proceed
	let hostName = parsedURL.hostname;
	if (!hostName) {
		return URLData;
	}
	else {
		URLData.host = hostName;
		URLData.url = url;
	}

	/*
	 ////////////////////////////////////////////////////////////////////////////////////////
	 // TODO: Modularize
	 // If there is a hostname, check if it is coming from youtube.
	 let thisIsAYouTubeLink = (hostName == "www.youtube.com" || hostName == "youtube.com");
	 // TODO: Modularize
	 // If it is from youtube see if you can get the video id
	 if(thisIsAYouTubeLink){
	 // If the link is a valid youtube video link videoInformation will get filled
	 let videoInformation = VideoURLParser.parse(url);
	 if(videoInformation){
	 URLData.video = videoInformation;
	 }
	 else{
	 URLData.video = false;
	 }
	 }
	 ///////////////////////////////////////////////////////////////////////////////////////
	 */


	// Download the contents of the link
	FetchUrl.fetchUrl(url, function(error, meta, body) {
		// TODO: Meta could potentially have important information
		// It could definitely be used to find the links with redirects begind them.


		let rawHTML = body.toString();
		let handler = new HTMLParser.DefaultHandler(function(error, dom) {
			if (error)
				console.log(error);
		});
		let parser = new HTMLParser.Parser(handler);
		parser.parseComplete(rawHTML);

		URLData.dom = handler.dom;
		// Check and see if there were any redirects when it tried to fetch the url
		let finalUrl = meta.finalUrl;
		if (finalUrl != URLData.url) {
			let parseFinalUrl = URL.parse(finalUrl);
			URLData.url = parseFinalUrl.url;
			URLData.host = parseFinalUrl.host;
		}

		future.return();
	});
	future.wait();


	let scanDomHelper = function(node) {
		// Store the node type
		let nodeType = node.type;

		//
		let nodeIsTag = (nodeType == "tag");
		let tagIsTitle = (node.name == "title");
		let tagIsLink = (node.name == "a");

		let nodeIsScript = (nodeType == "script");
		let tagIsScript = (node.name == "script");
		let skipThisScript = (nodeIsScript && tagIsScript);

		let nodeIsStyle = (nodeType == "style");
		let tagIsStyle = (node.name == "style");
		let skipThisStyle = (nodeIsStyle && tagIsStyle);

		let nodeIsText = (nodeType == "text");

		if (nodeType && nodeIsText) {
			let rawText = node.data;
			if (rawText) {
				URLData.rawText = URLData.rawText.concat(" " + rawText);
			}
		}
		if (nodeType && nodeIsTag && tagIsTitle) {
			if (node) {
				if (node.children) {
					URLData.title = node.children[0].data;
				}
			}
			return;
		}
		if (nodeType && nodeIsTag && tagIsLink) {
			let link = node.attribs;
			if (link) {
				let href = link.href;
				if (href) {
					let thisIsAURL = IsURL(href);
					if (thisIsAURL) {
						let normalizedLink = normalizeURL(href);
						let foundUrlInList = _.find(URLData.links, function(link) {
							return (link == normalizedLink);
						});
						if (!foundUrlInList) {
							URLData.links.push(normalizedLink);
						}
					}
				}
			}
		}
		if (skipThisScript || skipThisStyle) {
			return
		}
		if (node.children) {
			for (let i = 0; i < node.children.length; i++) {
				scanDomHelper(node.children[i]);
			}
		}
		return;
	};

	let scanDom = function(dom) {
		for (let i = 0; i < dom.length; i++) {
			scanDomHelper(dom[i]);
		}
	};

	scanDom(URLData.dom);
	// Clean the raw text.
	URLData.rawText = URLData.rawText.replace(/\n/g, ' ');
	URLData.rawText = URLData.rawText.replace(/\t/g, ' ');
	URLData.rawText = URLData.rawText.replace(/<\/?\w(?:[^"'>]|"[^"]*"|'[^']*')*>/gmi, ' ');
	URLData.rawText = URLData.rawText.replace(/ +/g, ' ');
	URLData.rawText = URLData.rawText.trim();
	// TODO: remove parenthesis, dots and commas

	URLData.rawWordCount = wordCount(URLData.rawText);

	let totalTagsCount = 0;
	_.each(keyWordsData, function(tags) {
		let foundTags = 0;
		_.each(tags.words, function(keyword) {
			let regularExpression = new RegExp(keyword, "gi");
			let count = (URLData.rawText.match(regularExpression) || []).length;
			foundTags += count;
		});
		if (foundTags) {
			let TagCount = {};
			TagCount.label = tags.label;
			TagCount.count = foundTags;
			URLData.tags.push(TagCount);
			totalTagsCount += foundTags;
		}
	});

	URLData.totalTagsCount = totalTagsCount;
	return URLData;

	// Keywords shared by urls on with the same host may be removed.

};
