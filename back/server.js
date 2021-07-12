const fetch = require('fetch').fetchUrl
const express = require('express');
const config = require('./config.js');
const app = express();

require('dotenv').config()
app.use(express.static('../public'))

app.get('/', (req, res) =>
{
	res.send('../public/index.html');
});

app.get('/private', (req, res) =>
{
	const data = 'grant_type=client_credentials&client_id=' + process.env.UID + '&client_secret=' + process.env.SECRET
	const options =
	{
		method: 'POST',
		headers: {'Content-Type': 'application/x-www-form-urlencoded'},
		payload:data
	}
	const response = fetch(process.env.URL, options, (error, meta, body) =>
	{
		const rqe = JSON.parse(body.toString())
		const {access_token:token} = rqe;
		return(res.json({token}))
	})
});

console.log("aqui");
console.log(token);

app.listen(config.PORT, () =>
{
	console.log(`\

Started [PORT 80] http://${config.HOST}:${config.PORT}`);

	console.log(`\ 
If you have this problem [localhost refused to connect], Check that in the backend directory, the .env file has the correct data.`);
});
