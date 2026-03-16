import { marked } from "marked"
const navbar = document.querySelector(".navbar")

// const test_component = import.meta.glob("./components/test.html?raw", {"as": "raw", eager: true})

// console.log(test_component)
import test from "./components/test.html?raw"

navbar.innerHTML = test


// navbar.innerHTML = test_component['./components/test.html']
navbar.innerHTML = marked("# hello world")

fetch("https://nekoweb.org/api/site/info/girlycoded.nekoweb.org")
	.then(res => {
		if(!res.ok) {
			throw new Error("Network response was not OK")
		}
		return res.json()
	})
	.then(data => {
		console.log(data)
	})
	.catch(err => {
		console.error("Fetch error:", err);
	})