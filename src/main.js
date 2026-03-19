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

let website_info_response = await fetch("https://nekoweb.org/api/site/info/girlycoded.nekoweb.org")
if(!website_info_response.ok){
	throw new Error(`Response status: ${website_info_response.status}`)
}

let website_info_result = await website_info_response.json()
console.log(website_info_result)

let site_visit_count = document.querySelector("#site-visit-count")
let site_follower_count = document.querySelector("#site-follower-count")

site_visit_count.textContent = `Website views: ${website_info_result.views}`
site_follower_count.textContent = `Website followers: ${website_info_result.followers}`