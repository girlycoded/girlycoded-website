// import { marked } from "marked"

console.log("hello world");

var img = document.querySelector("#discordpfp");
var status_label = document.querySelector("#mystatus");
var username_label = document.querySelector("#myusername")

const status_colors = {
	online: "green",
	idle: "ffc04e", // orange
	dnd: "red",
	offline: "grey",
};

async function init() {
	const url = "https://api.lanyard.rest/v1/users/634169631472353301";

	var response = await fetch(url);
	if (!response.ok) {
		throw new Error(`Response status: ${response.status}`);
	}

	const result = await response.json();

	username_label.textContent = "@" + result.data.discord_user.username.replace("_", "​_​")
	username_label.style
	img.src = `https://cdn.discordapp.com/avatars/634169631472353301/${result.data.discord_user.avatar}?size=128`;

	var status_icon = document.querySelector("#status-icon");

	status_icon.style.backgroundColor = status_colors[result.data.discord_status];
	status_icon.title = `@${result.data.discord_user.username} is ${result.data.discord_status}`

	for (const key in result.data.activities) {
		if(!Object.prototype.hasOwnProperty.call(result.data.activities, key)) continue;
		
		const element = result.data.activities[key];
		
		if(element.name!="Custom Status") continue;
		status_label.textContent = (element.emoji?element.emoji.name:"") + (element.state?`"${element.state}"`:"");
	}
}
init();