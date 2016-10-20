/**
 * Created by saeidbay on 2016-10-18.
 */
import URL from 'url';
import VideoURLParser from 'js-video-url-parser';
import FetchUrl from 'fetch';
import HTMLParser from 'htmlparser';
import Future from 'fibers/future';
import IsURL from 'is-url';

Meteor.methods({
	"parseURL":function(url) {

		let URLData = {
			host:null,
			url:null,
			dom:null,
			title:null,
			links:[]

		};


		let future = new Future();
		let parsedURL = URL.parse(url);
		// Hostname should be defined before we can proceed
		let hostName = parsedURL.hostname;
		if(!hostName){
			return URLData;
		}
		else{
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
		FetchUrl.fetchUrl(url,function(error,meta,body) {
			// TODO: Meta could potentially have important information
			// It could definitely be used to find the links with redirects begind them.




			let rawHTML = body.toString();
			let handler = new HTMLParser.DefaultHandler(function (error, dom) {
				if (error)
					console.log(error);
			});
			let parser = new HTMLParser.Parser(handler);
			parser.parseComplete(rawHTML);

			URLData.dom = handler.dom;
			future.return();
		});
		future.wait();


		let scanDomHelper = function(node) {
			let nodeType = node.type;
			let nodeIsTag = (nodeType == "tag");
			let tagIsTitle = (node.name == "title");
			let tagIsLink = (node.name == "a");

			let nodeIsScript = (nodeType == "script");
			let tagIsScript = (node.name == "script");

			if (nodeType && nodeIsTag && tagIsTitle){
				if(node){
					if(node.children){
						URLData.title = node.children[0].data;
					}
				}
				return;
			}
			else if(nodeType && nodeIsTag && tagIsLink){
				let link = node.attribs.href;
				if (link) {
					let thisIsAURL = IsURL(link);
					if(thisIsAURL) {
						URLData.links.push(link);
					}
				}
				return;
			}
			else if(nodeType && nodeIsScript && tagIsScript){
				return
			}
			else if(node.children){
				for( let i = 0; i < node.children.length; i++){
					let resultOfThisChild = scanDomHelper(node.children[i]);
					if(resultOfThisChild){
						return resultOfThisChild;
					}
				}
			}
			return false;
		};

		let scanDom = function(dom) {
			for( let i = 0; i < dom.length; i++){
				let resultOfThisChild = scanDomHelper(dom[i]);
				if(resultOfThisChild){
					return resultOfThisChild;
				}
			}
			return false;
			// TODO: Remove duplicate entrees in the links list
		};

		scanDom(URLData.dom);

		return URLData;
	}

});