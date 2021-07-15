"use strict"
const request = require("request")

const getBearer = (req, res, next) => {
	const formData = {
		grant_type: "client_credentials",
		client_id: `${process.env.UID}`,
		client_secret: `${process.env.SECRET}`,
	}

	const options = {
		method: "POST",
		url: "https://api.intra.42.fr/oauth/token",
		headers: {
			"content-type": "multipart/form-data",
		},
		formData: formData,
	}

	request(options, function (error, response, body) {
		if (error) throw new Error(error)
		console.log(body)
		const parsed = JSON.parse(body)
		console.log(parsed.access_token)
		process.env.BEARER_TOKEN = parsed.access_token
		next()
	})
}

module.exports = { getBearer }
