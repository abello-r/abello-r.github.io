const express = require("express")
const config = require("./config.js")
const path = require("path")
const app = express()
const request = require("request")
const { getBearer } = require(path.resolve("./middlewares/getBearer.js"))

require("dotenv").config()
app.use("/public", express.static(path.resolve("../public")))

app.get("/", getBearer, (req, res) => {
	res.sendFile(path.resolve("../index.html"))
})

app.get("/:login1/:login2", getBearer, (req, res, next) => {
	if (req.originalUrl.startsWith("/404")) return next()
	const options = {
		method: "GET",
		url: `https://api.intra.42.fr/v2/users/${req.params.login1}`,
		headers: {
			Authorization: `Bearer ${process.env.BEARER_TOKEN}`,
		},
	}

	request(options, async (error, response, body) => {
		if (error) throw new Error(error)

		console.log(body)
		if (response.statusCode != 200) return res.redirect("/404")
		const parsed1 = await JSON.parse(body)
		const options = {
			method: "GET",
			url: `https://api.intra.42.fr/v2/users/${req.params.login2}`,
			headers: {
				Authorization: `Bearer ${process.env.BEARER_TOKEN}`,
			},
		}
		request(options, async (error, response, body) => {
			if (error) throw new Error(error)

			console.log(body)
			if (response.statusCode != 200) return res.redirect("/404")
			const parsed = await JSON.parse(body)
			/*
			 ** datos.correction_point) +
			 ** datos.wallet +
			 ** datos.achievements.length +
			 **	datos.projects_users.length * 0.5
			 */
			const power1 =
				parsed1.correction_point +
				parsed1.wallet +
				parsed1.achievements.length +
				parsed1.projects_users.length * 0.5
			const power2 =
				parsed.correction_point +
				parsed.wallet +
				parsed.achievements.length +
				parsed.projects_users.length * 0.5
			res.json([
				{ login: parsed1.login, power: power1 },
				{ login: parsed.login, power: power2 },
			])
			// res.render(path.resolve("src/ejs/profile.ejs"), { user: parsed })
		})
		// res.render(path.resolve("src/ejs/profile.ejs"), { user: parsed })
	})
})

app.get("/private", getBearer, (req, res) => {
	res.json({ token: process.env.BEARER_TOKEN })
})

app.get("*", (req, res) => {
	res.send("404 :(")
})

app.listen(config.PORT, () => {
	console.log(
		`Started [PORT ${config.PORT}] http://${config.HOST}:${config.PORT}`
	)

	console.log(`If you have this problem [localhost refused to connect],\
	Check that in the backend directory, the .env file has the correct data.`)
})
