const fetch = require('fetch').fetchUrl
const express = require('express');
const config = require('./config.js');
const app = express();

require('dotenv').config()
app.use(express.static('../public'))

app.get('/', (req, res) => {
	res.send('../public/index.html');
});

app.get('/private', (req, res) => {
	const data = 'grant_type=client_credentials&client_id=' + process.env.UID + '&client_secret=' + process.env.SECRET
	const options =
	{
		method: 'POST',
		headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
		payload: data
	}
	const response = fetch(process.env.URL, options, (error, meta, body) => {
		const rqe = JSON.parse(body.toString())
		const { access_token: token } = rqe;
		return (res.json({ token }))
	})
});

import '../public/script.js';

app.get('/code', async (req, res) => {
	const Token_Endpoint = `https://api.intra.42.fr/oauth/token`;
	const Grant_Type = 'authorization_code';
	// const Grant_Type = 'client_credentials';
	const Code = api_token;
	const Redirect_Uri = 'https://42ring.es/code';
	const Client_Id = process.env.UID;
	const Client_Secret = process.env.SECRET;
	const Scope = "public";

	// Check State to avoid security errors
	if (req.query.state != 'ThisIsMyStateValue')
	{
		res.redirect('/');
	}

	// log.info(`Body: ${body}`);
	let json = await axios.post(Token_Endpoint,
		{
			grant_type: Grant_Type,
			// grant_type: 'client_credentials',
			code: Code,
			redirect_uri: Redirect_Uri,
			client_id: Client_Id,
			client_secret: Client_Secret,
			scope: Scope
		},
		{ headers: { 'Content-Type': 'application/json' } });
	//console.log(Code)
	console.log(json)
})

app.listen(config.PORT, () => {
	console.log(`\

Started [PORT 80] http://${config.HOST}:${config.PORT}`);

	console.log(`\ 
If you have this problem [localhost refused to connect], Check that in the backend directory, the .env file has the correct data.`);
});
