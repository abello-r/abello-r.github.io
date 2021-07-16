const express = require('express');
const router = express();
const config = require('./config.js');
require('dotenv').config()
const axios = require('axios');

// Una vez tienes el code lo cambias por un token valido
// Tu variable api_token = code (en mi código)

let api_token = '1a8e94a848ae990b557c366163ae145057e1a7538cafcb7fb2b8abb2f33d5036';

//Step 2: Exchange the code for a token
router.get('/code', async (req, res) =>
{
	const Token_Endpoint = `https://api.intra.42.fr/oauth/token`;
	const Grant_Type = 'authorization_code';
	const Code = api_token;
	const Redirect_Uri = 'https://42ring.es/code';
	const Client_Id = process.env.UID;
	const Client_Secret = process.env.SECRET;
	const Scope = "public";

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
	// console.log(Code)
	console.log(json)
})

router.listen(config.PORT, () => {
	console.log(`\

Started [PORT 80] http://${config.HOST}:${config.PORT}`);

	console.log(`\ 
If you have this problem [localhost refused to connect], Check that in the backend directory, the .env file has the correct data.`);
});
