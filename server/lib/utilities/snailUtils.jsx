/**
 * Created by saeidbay on 2016-10-31.
 */
import URL from 'url';
import Future from 'fibers/future';
import FetchUrl from 'fetch';
import HTMLParser from 'htmlparser';
import wordCount from 'wordcount';
import IsURL from 'is-url';
import normalizeURL from 'normalize-url';



RetrieveDOM = function(url) {
	let domInfo = {
		url: null,
		host: null,
		dom: null
	};
	let future = new Future();

	FetchUrl.fetchUrl(url, function(error, meta, body) {
		// TODO: Meta could potentially have important information
		// It could definitely be used to find the links with redirects begind them.

		if (error) {
			// TODO
			future.return(null);
		} else {
			let rawHTML = body.toString();
			let handler = new HTMLParser.DefaultHandler(function(error, dom) {
				if (error) {
					console.log(error);
					future.return(null);
				}
			});

			let parser = new HTMLParser.Parser(handler);
			parser.parseComplete(rawHTML);

			let finalUrl = meta.finalUrl;
			let parseFinalUrl = URL.parse(finalUrl);

			domInfo.url = finalUrl;
			domInfo.host = parseFinalUrl.host;
			domInfo.dom = handler.dom;
			domInfo.meta = meta;
			future.return(domInfo);
		}
	});

	return future.wait();
};


ScanDomHelper = function(domain,node,domContents) {

	// Store the node type
	let nodeType = node.type;

	let nodeIsTag = (nodeType == "tag");
	let tagIsTitle = (node.name == "title");
	let tagIsA = (node.name == "a");
	let tagIsLink = (node.name == 'link');

	let nodeIsScript = (nodeType == "script");
	let tagIsScript = (node.name == "script");
	let skipThisScript = (nodeIsScript && tagIsScript);

	let nodeIsStyle = (nodeType == "style");
	let tagIsStyle = (node.name == "style");
	let skipThisStyle = (nodeIsStyle && tagIsStyle);

	let nodeIsText = (nodeType == "text");

	if(nodeType && node.attribs && node.attribs.href && node.attribs.rel){
		if(node.attribs && node.attribs.href){
			let href = node.attribs.href;
			let rExpression = new RegExp('\\.ico', "gi");
			let iconFoundInHref = (href.match(rExpression) || []).length;

			let rel = node.attribs.rel;
				rExpression = new RegExp('icon', "gi");
			let iconFoundInRel = (rel.match(rExpression) || []).length;

			if(!domContents.thumbnail && (iconFoundInHref ||iconFoundInRel) ) {
				let href = node.attribs.href;
				let isThisAUrl = IsURL(href);
				if(href[0]=='/' && href[1] == '/'){
					href = href.slice(2,href.length)
					isThisAUrl = true;
				}
				if(isThisAUrl){
					domContents.thumbnail = href;
				}else{
					let thumbnail = domain+href;
					if(thumbnail[0]=='/' && thumbnail[1] == '/'){
						thumbnail = thumbnail.slice(2,thumbnail.length)
					}
					domContents.thumbnail = thumbnail;
				}
			}
		}
	}

	if (nodeType && nodeIsText) {
		let rawText = node.data;
		if (rawText) {
			domContents.rawText = domContents.rawText.concat(" " + rawText);
		}
	}
	if (nodeType && nodeIsTag && tagIsTitle) {
		if (node) {
			if (node.children) {
				domContents.title = node.children[0].data;
			}
		}
		return;
	}
	if (nodeType && nodeIsTag && tagIsA) {
		let link = node.attribs;
		if (link) {
			let href = link.href;
			if (href) {
				let thisIsAURL = IsURL(href);
				if (thisIsAURL) {
					let normalizedLink = normalizeURL(href);
					let foundUrlInList = _.find(domContents.links, function(link) {
						return (link == normalizedLink);
					});
					if (!foundUrlInList) {
						domContents.links.push(normalizedLink);
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
			ScanDomHelper(domain,node.children[i],domContents);
		}
	}
	return;
};

ScanDom = function(domain,dom) {
	let domContents = {
		title:null,
		thumbnail:null,
		links:[],
		rawText: ""
	};

	for (let i = 0; i < dom.length; i++) {
		ScanDomHelper(domain,dom[i],domContents);
	}
	return domContents;
};

CleanDOMRawText = function(input) {
	let rawText = input;
	rawText = rawText.replace(/\n/g, ' ');
	rawText = rawText.replace(/\t/g, ' ');
	rawText = rawText.replace(/<\/?\w(?:[^"'>]|"[^"]*"|'[^']*')*>/gmi, ' ');
	rawText = rawText.replace(/ +/g, ' ');
	rawText = rawText.trim();
	return rawText;
};

ScanForTags = function(title,cleanText) {
	let tagGroups = {
		rawWordCount:null,
		totalTagsCount:null,
		tags:[]
	};

	// TODO: remove parenthesis, dots and commas
	tagGroups.rawWordCount = wordCount(cleanText);

	// SCAN THE TITLE
	let notFoundRegEx = new RegExp('404', "gi");
	let jobsRegEx = new RegExp('job', "gi");
	let signRegEx = new RegExp('sign', "gi");
	let logRegEx = new RegExp('log', "gi");
	let registrationRegEx = new RegExp('registration', "gi");
	let foundSignKeyword = (title.match(signRegEx) || []).length;
	let foundLogKeyword = (title.match(logRegEx) || []).length;
	let foundRegistrationKeyword = (title.match(registrationRegEx) || []).length;
	let foundJobsRegEx = (title.match(jobsRegEx) || []).length;
	let notFound = (title.match(notFoundRegEx) || []).length;

	if(foundSignKeyword || foundLogKeyword || foundRegistrationKeyword || foundJobsRegEx || notFound){
		tagGroups.rawWordCount = 0;
		tagGroups.totalTagsCount = 0;
	}
	else{
		let totalTagsCount = 0;

		// Tag by Tag
		_.each(keyWordsData, function(tags) {
			let foundTags = 0;
			// KeyWord by KeyWord
			_.each(tags.words, function(keyword) {
				let regularExpression = new RegExp(keyword, "gi");
				let cleanTextCount = (cleanText.match(regularExpression) || []).length;
				let titleCount = (title.match(regularExpression) || []).length;
				titleCount = titleCount * TitleKeywordCount;
				foundTags += cleanTextCount;
				foundTags += titleCount;
			});
			if (foundTags) {
				let TagCount = {};
				TagCount.label = tags.label;
				TagCount.wordCount = foundTags;
				tagGroups.tags.push(TagCount);
				totalTagsCount += foundTags;
			}
		});
		tagGroups.totalTagsCount = totalTagsCount;
	}

	return tagGroups;
};

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