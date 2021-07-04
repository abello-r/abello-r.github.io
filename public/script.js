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
	pick_two_img.setAttribute('src', "src/" + pick_two.selectedOptions[0].value + '.ico')
})

pick_one.addEventListener("change",() =>{
	pick_one_img.setAttribute('src', "src/" + pick_one.selectedOptions[0].value + '.ico')
})

/**********************************************************************/

// Form and actions \\

let user = undefined;
let form = document.getElementById("form");
let user_two = undefined;
let form_two = document.getElementById("form_two");

form.onsubmit = (e) => ft_get_data_user(e);

form_two.onsubmit = (e) => ft_get_data_user_two(e);

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
			let power;
			power = datos.correction_point + datos.wallet;
			document.getElementById("showUser").innerHTML = 'Skills'
			document.getElementById("showPower").innerHTML = 'Power : ' + power;
			document.getElementById("showPick").innerHTML = 'Pick : ' + pick_one.selectedOptions[0].value
		})
}

function ft_get_data_user_two(e)
{
	user = document.getElementById("username_two").value;
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
			let power;
			console.log(datos)
			power = datos.correction_point + datos.wallet;
			document.getElementById("showUser_two").innerHTML = 'Skills'
			document.getElementById("showPower_two").innerHTML = 'Power : ' + power;
			document.getElementById("showPick_two").innerHTML = 'Pick : ' + pick_two.selectedOptions[0].value
		})
}

/**********************************************************************/
