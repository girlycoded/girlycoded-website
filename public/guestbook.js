const guestbook_messages_url = "https://firestore.googleapis.com/v1/projects/joosan-web/databases/(default)/documents/test/";
const message_form = document.getElementById("message-form");
const guestbook_messages = document.getElementById("guestbook-messages");

async function fetchData(url) {
	try {
		const response = await fetch(url);

		if(!response.ok){
			throw new Error(`HTTP error status ${response.status}`);
		}

		const data = await response.json();
		return data;
	}
	catch (error) {
		console.error("Fetch failed", error);
	};
};

async function post_message(name, message) {
	const result = fetch(guestbook_messages_url, {
		method: "POST",
		headers: {
			"Content-Type": "applications/json",
		},
		body: JSON.stringify({
			fields: {
				name: {
					stringValue: name,
				},
				message: {
					stringValue: message,
				},
			},
		}),
	});
	return result;
}

function message_form_submit(e) {
	e.preventDefault();

	const formdata = new FormData(message_form);
	const name = formdata.get("name");
	const message = formdata.get("message");
	
	const data = Object.fromEntries(formdata);
	
	if(message === "" || name === "") return;

	post_message(name, message)
	.then(data => {
		location.reload();
	});
}

function create_message_elements_from_documents(documents){
	for (const key in documents) {
		if (!Object.hasOwn(documents, key)) continue;
		
		const element = documents[key];
		const createDate = element.createTime.split("T")[0];

		const message_container = document.createElement("div");
		message_container.className = "textarea border";

		const message_info = document.createElement("h6");
		message_info.textContent = `${element.fields.name.stringValue} • ${createDate}`;

		const message_content = document.createElement("p");
		message_content.textContent = element.fields.message.stringValue;

		message_container.append(message_info);
		message_container.append(message_content);
		guestbook_messages.append(message_container);
	}
}

function init() {
	message_form.addEventListener("submit", message_form_submit);

	fetchData(guestbook_messages_url)
	.then(data => {
		const documents = data.documents;
		if(documents && documents.length > 0) {
			documents.sort((a, b) => Date.parse(b.createTime) - Date.parse(a.createTime));
		}
		if(!documents) return;
		create_message_elements_from_documents(documents);
	});
}
init();