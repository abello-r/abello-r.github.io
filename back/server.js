/*-----------------------------------Requeriments--------------------------------------------*/

const express = require("express")
const app = express()

const config = require("./config.js")
const path = require("path")
const request = require("request")
const { getBearer } = require(path.resolve("./middlewares/getBearer.js"))

require("dotenv").config()

app.use("/public", express.static(path.resolve("../public")))
app.use("/src", express.static(path.resolve("../public/src")))
app.use("/src", express.static(path.resolve("../public/ring.html")))

/*--------------------------------------------------------------------------------*/



/*-----------------------------------CallBacks--------------------------------------------*/

app.get("/", getBearer, (req, res) => {
	res.sendFile(path.resolve("../public/index.html"))	// Public Login
})

app.get("/ring", getBearer, (req, res) => {
	console.log(`Code: ${req.query.code}`)
	res.sendFile(path.resolve("../public/ring.html"))	// Ring Zone
})

app.get("/private", getBearer, (req, res) =>
{
	res.json({
		token: process.env.BEARER_TOKEN,				// Hidden Token
		info: "This route will not available soon",
	})
})

app.get("*", (req, res) =>
{
	res.send("404 Page not found, come back buddy :(")									// All Bad Requests
})

/*--------------------------------------------------------------------------------*/


/*
 ** GET /{login1}/${login2}
 ** Returns the power of each login with a status of 200
 ** 	and all the data (login and power) is sent in a json array.
 ** In case of same login, returns an error and a status 418
 ** If any login does not exist, then a status of 404 is returned
 ** 	and an error mesage inside "error" in json
 */

app.get("/:login1/:login2", getBearer, (req, res, next) =>
{
	if (req.originalUrl.startsWith("/404"))
		return next()
	if (req.params.login1 === req.params.login2)
		return res
			.status(418)
			.json(`Fighting ${req.params.login1} vs ${req.params.login2}...`)
	const options =
	{
		method: "GET",
		url: `https://api.intra.42.fr/v2/users/${req.params.login1}`,
		headers: {	Authorization: `Bearer ${process.env.BEARER_TOKEN}` },
	}

	request(options, async (error, response, body) =>
	{
		if (error) throw new Error(error)

		console.log(body)
		if (response.statusCode != 200)
			return res
				.status(404)
				.json({ error: `${req.params.login1} is not a valid user` })
		const parsed1 = await JSON.parse(body)
		const options =
		{
			method: "GET",
			url: `https://api.intra.42.fr/v2/users/${req.params.login2}`,
			headers: { Authorization: `Bearer ${process.env.BEARER_TOKEN}` },
		}
		request(options, async (error, response, body) =>
		{
			if (error) throw new Error(error)

			console.log(body)
			if (response.statusCode != 200)
				return res
					.status(404)
					.json({ error: `${req.params.login2} is not a valid user` })
					const parsed = await JSON.parse(body)
					

			/*------------------------------------------------------------------------------*/		
			// Calculate POWER PLAYER ONE
			const power1 =
				parsed1.correction_point + 
				parsed1.wallet +
				parsed1.achievements.length +
				parsed1.projects_users.length * 0.5
			
			// Calculate POWER PLAYER TWO
			const power2 =
				parsed.correction_point +
				parsed.wallet +
				parsed.achievements.length +
				parsed.projects_users.length * 0.5
			/*------------------------------------------------------------------------------*/

				res.status(200).json([
				{
					login: parsed1.login,
					power: power1,
					first_name: parsed1.first_name,
				},
				{
					login: parsed.login,
					power: power2,
					first_name: parsed.first_name,
				},
			])
			// res.render(path.resolve("src/ejs/profile.ejs"), { user: parsed })
		})
		// res.render(path.resolve("src/ejs/profile.ejs"), { user: parsed })
	})
})


/*-----------------------------------App Listen--------------------------------------------*/

app.listen(config.PORT, () =>
{
	console.log(
		`Started [PORT ${config.PORT}] http://${config.HOST}:${config.PORT}`
	)

	console.log(`If you have this problem [localhost refused to connect],\
	Check that in the backend directory, the .env file has the correct data.`)
})

/*---------------------------------------------------------------------------------------------*/
