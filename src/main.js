import { marked } from "marked"
const navbar = document.querySelector(".navbar")

// const test_component = import.meta.glob("./components/test.html?raw", {"as": "raw", eager: true})

// console.log(test_component)
import navbar_component from "./components/navbar.html?raw"

navbar.innerHTML = navbar_component


// navbar.innerHTML = test_component['./components/test.html']