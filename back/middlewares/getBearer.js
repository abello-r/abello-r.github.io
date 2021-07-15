"use strict"
const { fetchUrl } = require("fetch")

const getBearer = (req, res, next) => {
	const data = `grant_type=client_credentials&client_id=${process.env.UID}&client_secret=${process.env.SECRET}`
	const options = {
		method: "POST",
		headers: {
			"Content-Type": "application/x-www-form-urlencoded",
		},
		payload: data,
	}
	fetchUrl(process.env.URL, options, (error, meta, body) => {
		const rqe = JSON.parse(body.toString())
		const { access_token: token } = rqe
		process.env.BEARER = token
		next()
	})
}

module.exports = { getBearer }
