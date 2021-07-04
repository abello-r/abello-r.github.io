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
let button_fight = document.getElementById("button");

let power;
let power_two;

form.onsubmit = (e) => ft_get_data_user(e);
form_two.onsubmit = (e) => ft_get_data_user_two(e);
button_fight.onclick = (e) => ft_fight(e);

function ft_fight(e){
	ft_get_data_user(e);
	ft_get_data_user_two(e);
	ft_victory(e);
}

function ft_get_data_user(e)
{
	user = document.getElementById("username").value;
	localStorage.setItem('player', user);
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
			power = datos.correction_point + datos.wallet;
			localStorage.setItem('power', power);
			document.getElementById("showUser").innerHTML = 'Skills'
			document.getElementById("showPower").innerHTML = 'Power : ' + power;
			document.getElementById("showPick").innerHTML = 'Character : ' + pick_one.selectedOptions[0].value
		})
}

function ft_get_data_user_two(e)
{
	user = document.getElementById("username_two").value;
	localStorage.setItem('player_two', user);

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
			power_two = datos.correction_point + datos.wallet;
			localStorage.setItem('power_two', power_two);
			document.getElementById("showUser_two").innerHTML = 'Skills';
			document.getElementById("showPower_two").innerHTML = 'Power : ' + power_two;
			document.getElementById("showPick_two").innerHTML = 'Character : ' + pick_two.selectedOptions[0].value
		})
}

function ft_victory(e)
{
	var power = localStorage.getItem('power');
	var power_two = localStorage.getItem('power_two');
	var player_one = localStorage.getItem('player');
	var player_two = localStorage.getItem('player_two');

	if (power > 0 && power_two > 0)
	{
		if (power > power_two)
		{
			document.getElementById("victory").innerHTML = '¡' + player_one + ' wins!';
		}
		else if (power_two > power)
		{
			document.getElementById("victory").innerHTML = '¡' + player_two + ' wins!';
		}
	}
}

/**********************************************************************/
