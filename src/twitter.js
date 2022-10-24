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
	const url = `https://api.twitter.com/2/tweets/search/recent?tweet.fields=author_id&query=conversation_id:${conversationId}`

	//const authHeader = OAuth1Helper.getAuthHeaderForRequest(request);
	const response = await axios.get(url, {headers: {"Authorization": `Bearer ${process.env.BEARER_TOKEN}`}});

	return response;
}

const postDM = async () => {
	const request = {
		url: "https://api.twitter.com/1.1/direct_messages/events/new.json",
		method: 'POST',
		body: {
			"uniqueId": 1235,
			"event": {
				"type": "message_create",
				"message_create": {
					"target": {
						"recipient_id": "1022383710"
						},
					"message_data": {
						"text": "Hello World!"
					}
				}
			}
		}
	};

	const authHeader = OAuth1Helper.getAuthHeaderForRequest(request);
	const response = await axios.post(request.url, request.body, {headers: authHeader});

	return response;
}

const main = async () => {
	const DMs = await getAllDirectMessages()
	const replies = await getReplies("1581804042036002816");
	//const DM_post = await postDM()

	console.log(DMs.status, DMs.statusText)
	console.log(replies.status, replies.statusText)
	//console.log(DM_post)
}

main();

//exports.module = {}
