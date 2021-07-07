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
	const data = 'grant_type=client_credentials&client_id=' + '6485b53f2069b2e310b735eb2019dc626d08cac9ac7071cf453b6cc7e710b41c' + '&client_secret=' + '1ea4a33997183a9f8bb82c31aec10d33db0f5cc9926662aa1378ff737caa93c9'
	const options =
	{
		method: 'POST',
		headers: {'Content-Type': 'application/x-www-form-urlencoded'},
		payload:data
	}
	const response = fetch('https://api.intra.42.fr/oauth/token', options, (error, meta, body) =>
	{
		const rqe = JSON.parse(body.toString())
		const {access_token:token} = rqe;
		return(res.json({token}))
	})
});

app.listen(config.PORT, () =>
{
	console.log(`\

Started [PORT 3000] http://${config.HOST}:${config.PORT}`);

	console.log(`\ 
If you have this problem [localhost refused to connect], Check that in the backend directory, the .env file has the correct data.`);
});
