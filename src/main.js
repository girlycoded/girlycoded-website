import { marked } from "marked"
const navbar = document.querySelector("#navbar")

import navbar_component from "./components/navbar.html?raw"
navbar.innerHTML = navbar_component


// navbar.innerHTML = test_component['./components/test.html']

const url = "https://api.lanyard.rest/v1/users/634169631472353301"

var response = await fetch(url)
if (!response.ok) {
	throw new Error(`Response status: ${response.status}`)
}

const result = await response.json()

var img = document.querySelector("#discordpfp")
var status_label = document.querySelector("#mystatus")

img.src = `https://cdn.discordapp.com/avatars/634169631472353301/${result.data.discord_user.avatar}?size=128`

var status_icon = document.querySelector("#status-icon")

const status_colors = {
	online: "green",
	idle: "ffc04e", // orange
	dnd: "red",
	offline: "grey"
}

status_icon.style.backgroundColor = status_colors[result.data.discord_status]

for (const key in result.data.activities) {
	if (!Object.hasOwn(result.data.activities, key)) continue;
	
	const element = result.data.activities[key];
	
	if(element.name!="Custom Status") continue;
	status_label.textContent = `"${element.state}"`
}