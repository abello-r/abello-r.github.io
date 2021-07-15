const express = require("express")
const config = require("./config.js")
const path = require("path")
const app = express()
const { getBearer } = require(path.resolve("./middlewares/getBearer.js"))

require("dotenv").config()
app.use("/public", express.static(path.resolve("../public")))

app.get("/", getBearer, (req, res) => {
	res.sendFile(path.resolve("../index.html"))
})

app.get("/private", getBearer, (req, res) => {})

app.listen(config.PORT, () => {
	console.log(`Started [PORT 3000] http://${config.HOST}:${config.PORT}`)

	console.log(`If you have this problem [localhost refused to connect],\
	Check that in the backend directory, the .env file has the correct data.`)
})
