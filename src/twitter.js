const OAuth1Helper = require("./oauth")
const axios = require("axios");
const express = require('express');
const fs = require('fs');
const http = require('http');
const https = require('https');
//const privateKey  = fs.readFileSync('sslcert/server.key', 'utf8');
//const certificate = fs.readFileSync('sslcert/server.crt', 'utf8');

const get_all_DMs = async () => {
	const request = {
		url: 'https://api.twitter.com/1.1/direct_messages/events/list.json?count=10',
		method: 'GET',
		body: {
			"uniqueId": 1234
		}
	};

	const authHeader = OAuth1Helper.getAuthHeaderForRequest(request);
	const response = await axios.get(request.url, {headers: authHeader, responseType: 'stream'});

	const stream = response.data;
	stream.on('data', data => {
		data = JSON.parse(data.toString())
		console.log(data)
	})
	//return response;
}

const get_DM = async (gameId) => {
	const request = {
		url: `https://api.twitter.com/1.1/direct_messages/events/show.json?id=${gameId}`,
		method: 'GET',
		body: {
			"uniqueId": 1234
		}
	};

	const authHeader = OAuth1Helper.getAuthHeaderForRequest(request);
	const response = await axios.get(request.url, {headers: authHeader});

	return response;
}

const get_replies = async (conversationId) => {
	const url = `https://api.twitter.com/2/tweets/search/recent?tweet.fields=author_id&query=conversation_id:${conversationId}`

	const response = await axios.get(url, {headers: {"Authorization": `Bearer ${process.env.BEARER_TOKEN}`}});
	return response;
}

const post_DM = async (recipientId, message) => {
	const request = {
		url: "https://api.twitter.com/1.1/direct_messages/events/new.json",
		method: 'POST',
		body: {
			"uniqueId": 1235,
			"event": {
				"type": "message_create",
				"message_create": {
					"target": {
						"recipient_id": `${recipientId}`
						},
					"message_data": {
						"text": `${message}`
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
	const app = express();
	const port = 8080;
	//const httpServer = http.createServer()
	//await get_all_DMs();
	app.get('/', (req, res) => {
		console.log("leel");
	})

	app.listen(port, () => {
		console.log(`Listening to ${port}`)
	})
}

main()

//exports.module = {get_all_DMs, get_DM, get_replies, post_DM}
