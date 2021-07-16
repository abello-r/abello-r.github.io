// Window Onload \\

function ft_get_code_from_url(name) {
	name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]")
	var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
		results = regex.exec(location.search)
	return results === null
		? ""
		: decodeURIComponent(results[1].replace(/\+/g, " "))
}

let api_token = undefined // Api token null
window.onload = api_token = ft_get_code_from_url("code") // Api token step_1 (url)
//window.onload = api_token = ft_get_token(); // Api token from /private

console.log(api_token)

function ft_get_token() {
	fetch("https://42ring.es/code")
		.then((response) => response.json())
		.then((datos) => {
			api_token = datos.token
			console.log(api_token)
			ft_token_info(datos.token)
		})
}

function ft_token_info(api_token) {
	fetch("https://api.intra.42.fr/oauth/token/info", {
		mode: "no-cors",
		headers: {
			Authorization: `Bearer ${api_token}`,
		},
	}).then((response) => response.json())
	//ft_xp();
}

/**********************************************************************/

// Swap Image \\

pick_two.addEventListener("change", () => {
	pick_two_img.setAttribute(
		"src",
		"src/" + pick_two.selectedOptions[0].value + ".ico"
	)
})

pick_one.addEventListener("change", () => {
	pick_one_img.setAttribute(
		"src",
		"src/" + pick_one.selectedOptions[0].value + ".ico"
	)
})

/**********************************************************************/

// Form and actions \\

let user = undefined
let user_two = undefined
let form = document.getElementById("form")
let form_two = document.getElementById("form_two")
let button_fight = document.getElementById("button")

player_one = 0
player_two = 0
power = 0 //	Power player one
power_two = 0 //	Power player two
streak_one = 0 // Streaks wins player one
streak_two = 0 // Streaks wins player two
flag_winner = 0 // 1 if p1 win or 2 if p2 win

form.onsubmit = (e) => ft_get_data_user(e) //	When form_1 is sended.
button_fight.onclick = (e) => ft_fight(e) //	When press "FIGHT" buttom.

async function ft_fight(e) {
	ft_get_data_user(e)
	// setTimeout(() => ft_victory(e), 1000)
}

function ft_xp() {
	// Funcion de llamadas de prueba
	fetch(
		`https://api.intra.42.fr/v2/campus/22/users/?page=6/sort=pool_year=2019"`,
		{
			headers: {
				Authorization: `Bearer ${api_token}`,
			},
		}
	)
		.then((reponse) => response.json())
		.then(async (datos) => {
			console.log(await datos)
		})
}

function ft_get_data_user(e) {
	const user1 = document.getElementById("username").value
	const user2 = document.getElementById("username_two").value
	if (e !== undefined) e.preventDefault()
	fetch(`/${user1}/${user2}`, {})
		.then((response) => response.json())
		.then(async (datos) => {
			console.log(datos)
			player_one = await datos[0].first_name
			player_two = await datos[1].first_name
			// power =
			// 	(await datos.correction_point) +
			// 	datos.wallet +
			// 	datos.achievements.length +
			// 	datos.projects_users.length * 0.5
			document.getElementById("showUser").innerHTML = "Skills"
			document.getElementById("showPower").innerHTML =
				"Power : " + datos[0].power
			power = datos[0].power
			document.getElementById("showPick").innerHTML =
				"Character : " + pick_one.selectedOptions[0].value
			document.getElementById("showUser_two").innerHTML = "Skills"
			document.getElementById("showPower_two").innerHTML =
				"Power : " + datos[1].power
			power_two = datos[1].power
			document.getElementById("showPick_two").innerHTML =
				"Character : " + pick_two.selectedOptions[0].value
			ft_victory(e)
			ft_win_phrases(e)
		})
}

const ft_victory = (e) => {
	if (power > 0 && power_two > 0) {
		if (power > power_two) {
			// If player ONE wins.
			flag_winner = 1
			streak_one += 1
			streak_two = 0
			ft_win_phrases() // Win text top

			document.getElementById("crown_two").setAttribute("title", "") // Reset p2
			document
				.getElementById("crown_one")
				.setAttribute("title", "The crown for the king") // Title on img
			document
				.getElementById("crown_one")
				.setAttribute("src", "src/" + "crown.ico") // Set crown for the king
			document.getElementById("crown_two").setAttribute("src", "") // Remove crown player two

			document.getElementById("victory").innerHTML =
				"¡" +
				player_one +
				" wins!" +
				"<br>" +
				"Streak's = " +
				streak_one // Set straks p1
		} else if (power_two > power) {
			// If player TWO wins.
			flag_winner = 2
			streak_one = 0
			streak_two += 1
			ft_win_phrases() // Win text top

			document.getElementById("crown_one").setAttribute("title", "") // Reset p1
			document
				.getElementById("crown_two")
				.setAttribute("title", "The crown for the king") // Title on img
			document
				.getElementById("crown_two")
				.setAttribute("src", "src/" + "crown.ico") // Set crown for the king
			document.getElementById("crown_one").setAttribute("src", "") // Remove crown player one

			document.getElementById("victory").innerHTML =
				"¡" +
				player_two +
				" wins!" +
				"<br>" +
				"Streak's = " +
				streak_two // Set streaks p2
		} else if (power_two == power) {
			document
				.getElementById("crown_two")
				.setAttribute("src", "src/draw.ico") // Draw ico
			document
				.getElementById("crown_one")
				.setAttribute("src", "src/draw.ico") // Draw ico
			document.getElementById("victory").innerHTML =
				"¡It's a draw!" + "<br>" + "No one wins."
			document.getElementById("msg_winner").innerHTML = ""
		}
	}
}

function ft_win_phrases() {
	var ran = Math.floor(Math.random(1, 4) * (4 - 1)) + 1 // New random number 1 , 3
	var pick = 0

	if (flag_winner == 1) pick = pick_one
	else if (flag_winner == 2) pick = pick_two

	if (pick.selectedOptions[0].value == "Marvin") {
		// Marvin phrases
		document.getElementById("msg_winner").style.color = "#0e008f"
		if (ran == 1)
			document.getElementById("msg_winner").innerHTML =
				"Hey, wanna kill all humans?"
		else if (ran == 2)
			document.getElementById("msg_winner").innerHTML =
				"Humans are so miserable"
		else if (ran == 3)
			document.getElementById("msg_winner").innerHTML =
				"The blackhole will absorb you."
	} else if (pick.selectedOptions[0].value == "Hulk") {
		// Hulk phrases
		document.getElementById("msg_winner").style.color = "#007e06"
		if (ran == 1)
			document.getElementById("msg_winner").innerHTML =
				"Don't make me angry! ..."
		else if (ran == 2)
			document.getElementById("msg_winner").innerHTML =
				"I eat dumbells for breakfast."
		else if (ran == 3)
			document.getElementById("msg_winner").innerHTML = "Any last words?"
	} else if (pick.selectedOptions[0].value == "Pickle") {
		// Pickle phrases
		document.getElementById("msg_winner").style.color = "green"
		if (ran == 1)
			document.getElementById("msg_winner").innerHTML =
				" I'm Pickle Riiick!"
		else if (ran == 2)
			document.getElementById("msg_winner").innerHTML =
				"Come on, flip the pickle."
		else if (ran == 3)
			document.getElementById("msg_winner").innerHTML =
				"I’m a scientist. Because, I invent, transform, create and destroy for a living."
	} else if (pick.selectedOptions[0].value == "Spider-Man") {
		// Spiderman phrases
		document.getElementById("msg_winner").style.color = "#f70050"
		if (ran == 1)
			document.getElementById("msg_winner").innerHTML =
				"J.J. doesn't pay me enough for this!"
		else if (ran == 2)
			document.getElementById("msg_winner").innerHTML =
				"Great fight; and some great pics for J.J.!"
		else if (ran == 3)
			document.getElementById("msg_winner").innerHTML =
				"With great power comes great responsibility"
	} else if (pick.selectedOptions[0].value == "Batman") {
		// Batman phrases
		document.getElementById("msg_winner").style.color = "black"
		if (ran == 1)
			document.getElementById("msg_winner").innerHTML = "I’m Batman."
		else if (ran == 2)
			document.getElementById("msg_winner").innerHTML =
				"The world only makes sense if you force it to."
		else if (ran == 3)
			document.getElementById("msg_winner").innerHTML =
				"It’s not who I am underneath, but what I do that defines me."
	} else if (pick.selectedOptions[0].value == "Iron-Man") {
		// IronMan man phrs
		document.getElementById("msg_winner").style.color = "#cfa900"
		if (ran == 1)
			document.getElementById("msg_winner").innerHTML = "I am Iron Man."
		else if (ran == 2)
			document.getElementById("msg_winner").innerHTML =
				"Give me a scotch. I'm starving."
		else if (ran == 3)
			document.getElementById("msg_winner").innerHTML = "I love you 3000."
	} else if (pick.selectedOptions[0].value == "Deadpool") {
		// Deadpool phrases
		document.getElementById("msg_winner").style.color = "#b60200"
		if (ran == 1)
			document.getElementById("msg_winner").innerHTML =
				"House blowing up builds character."
		else if (ran == 2)
			document.getElementById("msg_winner").innerHTML =
				"Bad Deadpool... Good Deadpool!"
		else if (ran == 3)
			document.getElementById("msg_winner").innerHTML =
				"Whose kitty litter did I just shit in?"
	} else if (pick.selectedOptions[0].value == "Superman") {
		// Superman phrases
		document.getElementById("msg_winner").style.color = "blue"
		if (ran == 1)
			document.getElementById("msg_winner").innerHTML = "Dreams save us."
		else if (ran == 2)
			document.getElementById("msg_winner").innerHTML =
				"I’m here to fight for truth and justice."
		else if (ran == 3)
			document.getElementById("msg_winner").innerHTML =
				"You’re stronger than you think you are. trust me."
	} else if (pick.selectedOptions[0].value == "Wolverine") {
		// Wolverine phrases
		document.getElementById("msg_winner").style.color = "#e3be00"
		if (ran == 1)
			document.getElementById("msg_winner").innerHTML =
				"Patience isn't my strongest suit."
		else if (ran == 2)
			document.getElementById("msg_winner").innerHTML =
				"Nature made me a freak. Man made me a weapon. And God made it last too long."
		else if (ran == 3)
			document.getElementById("msg_winner").innerHTML =
				"The pain lets you know you’re still alive."
	} else if (pick.selectedOptions[0].value == "Trump") {
		// Donald Trump phrases
		document.getElementById("msg_winner").style.color = "#00aae4"
		if (ran == 1)
			document.getElementById("msg_winner").innerHTML =
				"Everything in life is luck."
		else if (ran == 2)
			document.getElementById("msg_winner").innerHTML =
				"The elections were a fraud."
		else if (ran == 3)
			document.getElementById("msg_winner").innerHTML = "¡Save America!"
	} else if (pick.selectedOptions[0].value == "The-Bicho") {
		// Cristiano Ronaldo phrases
		document.getElementById("msg_winner").style.color = "red"
		if (ran == 1)
			document.getElementById("msg_winner").innerHTML =
				"Your love makes me strong, your hate makes me unstoppable."
		else if (ran == 2)
			document.getElementById("msg_winner").innerHTML = "¡Siuuuuuuuuuuu!"
		else if (ran == 3)
			document.getElementById("msg_winner").innerHTML =
				"Talent without working hard is nothing."
	} else if (pick.selectedOptions[0].value == "BugsBunny") {
		// Bugsbunny phrases
		document.getElementById("msg_winner").style.color = "orange"
		if (ran == 1)
			document.getElementById("msg_winner").innerHTML =
				"I’m just a little wabbit!"
		else if (ran == 2)
			document.getElementById("msg_winner").innerHTML = "What’s up, Doc?"
		else if (ran == 3)
			document.getElementById("msg_winner").innerHTML =
				"Ehhhhhh, shut up!"
	} else if (pick.selectedOptions[0].value == "Agnes-Gru") {
		// Agnes Gru phrases
		document.getElementById("msg_winner").style.color = "pink"
		if (ran == 1)
			document.getElementById("msg_winner").innerHTML =
				"It's so fluffy I'm gonna die."
		else if (ran == 2)
			document.getElementById("msg_winner").innerHTML =
				"Oh, my gosh look at that fluffy unicorn!"
		else if (ran == 3)
			document.getElementById("msg_winner").innerHTML =
				"Will you read us a bedtime story?"
	} else if (pick.selectedOptions[0].value == "Son-Goku") {
		// Son Goku phrases
		document.getElementById("msg_winner").style.color = "#072083"
		if (ran == 1)
			document.getElementById("msg_winner").innerHTML =
				"Power comes in response to a need, not a desire."
		else if (ran == 2)
			document.getElementById("msg_winner").innerHTML =
				"Show me what you can do."
		else if (ran == 3)
			document.getElementById("msg_winner").innerHTML =
				"I’m so hungry, I can’t even move."
	}
}

/**********************************************************************/
