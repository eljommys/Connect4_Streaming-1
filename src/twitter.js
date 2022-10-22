const OAuth1Helper = require("./oauth")
const axios = require("axios");

const getAllDirectMessages = async () => {
	const request = {
		url: 'https://api.twitter.com/1.1/direct_messages/events/list.json?count=10',
		method: 'GET',
		body: {
			"uniqueId": 1234
		}
	};

	const authHeader = OAuth1Helper.getAuthHeaderForRequest(request);
	const response = await axios.get(request.url, {headers: authHeader});

	return response;
}

const getReplies = async (conversationId) => {
	const request = {
		url: "https://api.twitter.com/2/tweets/search/recent?tweet.fields=author_id&query=conversation_id:1581804042036002816",
		method: 'GET',
		body: {
			"uniqueId": 1235
		}
	};

	const authHeader = OAuth1Helper.getAuthHeaderForRequest(request);
	const response = await axios.get(request.url, {headers: authHeader});

	return response;
}

const main = async () => {
	//const DMs = await getAllDirectMessages()
	const replies = await getReplies("1581804042036002816");
	//console.log(DMs.status, DMs.statusText)
	console.log(replies.status/* , replies.statusText */)
}

main();

//exports.module = {}
