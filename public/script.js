// Window Onload \\

window.onload = ft_get_token;

let api_token = undefined;

function ft_get_token()
{
	fetch("http://localhost:3000/private")
	.then(response=>response.json())
	.then(datos=>
	{
		api_token = datos.token;
		ft_token_info(datos.token)
	});
}

function ft_token_info(api_token)
{
	fetch("https://api.intra.42.fr/oauth/token/info",{
	headers:
		{
			Authorization: `Bearer ${api_token}`
		}
	})
	.then(response=>response.json())
	.then(datos=>(console.log(datos)))
}

/**********************************************************************/

// Swap Image \\

pick_two.addEventListener("change",() =>{
	pick_two_img.setAttribute('src', pick_two.selectedOptions[0].value + '.ico')
})

pick_one.addEventListener("change",() =>{
	pick_one_img.setAttribute('src', pick_one.selectedOptions[0].value + '.ico')
})

/**********************************************************************/

// Form and actions \\

let user = undefined;
let form = document.getElementById("form");

form.onsubmit = (e) => ft_get_data_user(e);

function ft_get_data_user(e)
{
	user = document.getElementById("username").value;
	if (e !== undefined)
		e.preventDefault();
	fetch(`https://api.intra.42.fr/v2/users/${user}`,{
		headers:
			{
				Authorization: `Bearer ${api_token}`
			}
		})
		.then(response=>response.json())
		.then(datos=>
		{
			console.log(datos)
			document.getElementById("showUser").innerHTML = datos.usual_full_name;
			document.getElementById("showEmail").innerHTML = 'E-mail : ' + datos.email;
			document.getElementById("showCorrp").innerHTML = 'Correction Points : ' + datos.correction_point;
			document.getElementById("showWallet").innerHTML = 'Wallet Points : ' + datos.wallet;
			document.getElementById("showPhone").innerHTML = 'Phone Number : ' + datos.phone;
			document.getElementById("showPool").innerHTML = 'Pool : ' + datos.pool_year + ' ' + datos.pool_month;
			document.getElementById("showId").innerHTML = 'ID : ' + datos.id;
		})
}

function ft_get_username()
{
	console.log("hola");
}

/**********************************************************************/
