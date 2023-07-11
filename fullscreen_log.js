// When you open the page for a campaign, add an event listener to the Game Log button click.
// When the Game Log button is clicked, move the Game Log list, duplicate the necessary CSS
// references,

window.addEventListener("load", function () {
	console.log("D&D Beyond Game Log Symbiote: page loaded, ",this.window.location.href);

	// Create regex that looks for a campaign page
	const re = new RegExp("https:\/\/www.dndbeyond.com\/campaigns\/.*");
	const current_url = this.window.location.href;

	// If we are on a campaign page
	if (current_url.match(re)) {
		console.log("D&D Beyond Game Log Symbiote: Campaign Page Loaded")

		// Find buttons on campaigns page
		const button_arr = document.querySelectorAll("button");
		const button_arr_len = button_arr.length;

		// Find the game log button and add an event listener that waits for it to be clicked
		for (var i = 0; i < button_arr_len; i++) {
			var element = button_arr[i];
			if (element.className == "gamelog-button") {
				// element.addEventListener("click", destroy_page);
				element.addEventListener("mousedown", destroy_page);
				console.log("D&D Beyond Game Log Symbiote: Game Log button event listener added");
				break;
			};
		};

		// Create the CSS reference for the game log formatting
		const css_ref = document.createElement("link");
		css_ref.rel = "stylesheet";
		css_ref.href = "/content/1-0-2528-0/skins/waterdeep/css/compiled.css";

		// Find the html tag and place the new CSS reference into it
		const html_tag = document.querySelector("html");
		html_tag.insertAdjacentElement("afterbegin", css_ref);

		// Function that removes page elements
		function destroy_page() {
			// Lets wait a short time to allow the pop-up game log element to load
			setTimeout(() => {

				console.log("D&D Beyond Game Log Symbiote: Decimating page");

				const log_div = document.querySelector("ol").parentNode;
				html_tag.insertAdjacentElement("beforeend", log_div);

				// Remove document body
				document.body.remove();

				// Get the iframe elements in the page
				const iframe_arr = document.querySelectorAll("iframe");
				// Loop through the iframe elements on the page and delete them
				for (var i = 0; i < iframe_arr.length; i++) {
					var element = iframe_arr[i];
					element.remove();
				};

				// Scroll to end of game log
				log_div.scrollTop = log_div.scrollHeight;

				console.log("D&D Beyond Game Log Symbiote: Cleanup complete");

			}, 200);
		};

	}
});