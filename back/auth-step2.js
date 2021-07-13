// Una vez tienes el code lo cambias por un token valido
// Tu variable api_token = code (en mi código)

import 'server.js';

api_token = 1;
console.log(api_token);

//Step 2: Exchange the code for a token
router.get('/code', async (req, res) => {
    const Token_Endpoint = `https://api.intra.42.fr/oauth/token`;
    const Grant_Type = 'authorization_code';
    // const Grant_Type = 'client_credentials';
    const Code = req.query.code;
    const Redirect_Uri = 'https://42ring.es/code';
    const Client_Id = process.env.UID;
    const Client_Secret = process.env.SECRET;
    const Scope = "public";

    // Check State to avoid security errors
    if(req.query.state != 'ThisIsMyStateValue'){
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
        {headers: {'Content-Type': 'application/json'}});
        // console.log(Code)
        console.log(json)
})
