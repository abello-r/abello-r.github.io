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

let userAction = document.getElementById("username");
let myImage = document.querySelector('img');

userAction.onmouseover = () => ft_image_swap('src/astronauta.svg');
userAction.onmouseleave = () => ft_image_swap('src/ordenador.svg');

function ft_image_swap(path)
{
	myImage.setAttribute('src', path);
}

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
