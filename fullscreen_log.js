// When you open the page for a campaign, add an event listener to the Game Log button click.
// When the Game Log button is clicked, move the Game Log list, duplicate the necessary CSS
// references, inject the modified ones, and remove the unused page elements.

var isGameLogExpanded = false;

async function onStateChangeEvent(msg) {
	if (msg.kind === "hasInitialized") {
		// API finished loading, which means the page is also finished loading

		// Get host and page file name
		console.log("D&D Beyond Game Log Observer Symbiote: Getting host and page data")
		const host_name = window.location.hostname;
		const page_name = window.location.pathname.split("/").pop();
		
		// If we are on the landing page
		if (host_name === 'localhost' && page_name === 'index.html') {
			// Extract the data path to the local symbiote files
			const local_path = window.location.href.replace('index.html', '');
			
			// Store the path somewhere that won't get wiped
			await TS.localStorage.global.setBlob(local_path);
			console.log("D&D Beyond Game Log Observer Symbiote: Local data path stored")
		};

		console.log("D&D Beyond Game Log Observer Symbiote: Page loaded, ", this.window.location.href);

		// Create regex that looks for a campaign page
		const re = new RegExp("https:\/\/www.dndbeyond.com\/campaigns\/.*");
		const current_url = this.window.location.href;

		// If we are on a campaign page
		if (current_url.match(re)) {
			console.log("D&D Beyond Game Log Observer Symbiote: Campaign Page Loaded")

			// Find buttons on campaigns page
			const button_arr = document.querySelectorAll("button");
			const button_arr_len = button_arr.length;

			// Find the game log button and add an event listener that waits for it to be clicked
			for (var i = 0; i < button_arr_len; i++) {
				var element = button_arr[i];
				if (element.className == "gamelog-button") {
					element.addEventListener("mousedown", destroy_page);
					console.log("D&D Beyond Game Log Observer Symbiote: Game Log button event listener added");
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
			async function destroy_page() {

				// Lets wait for the log element to load before we do anything
				var isLogLoaded = false;
				let getLog = null;
				while (!isLogLoaded) { 
					// Must add delay or you crash. Ask me how I know
					await new Promise(resolve => setTimeout(resolve, 1));
					getLog = document.querySelector('ol');
					if ((getLog != null) && (getLog.className === "GameLog_GameLogEntries__3oNPD")) {
						console.log("D&D Beyond Game Log Observer Symbiote: Log loaded");
						isLogLoaded = true;
					};
				};

				// DESTROY THE PAGE //
				console.log("D&D Beyond Game Log Observer Symbiote: Decimating page");

				const log_div = await document.querySelector("ol").parentNode;
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
				console.log("D&D Beyond Game Log Observer Symbiote: Cleanup complete");

				// CREATE THE OBSERVER BANNER //
				
				// Create flexing box
				const flex_div = document.createElement("div");
				flex_div.className = 'box';
				html_tag.insertAdjacentElement('afterbegin', flex_div);
				flex_div.insertAdjacentElement('afterbegin', log_div);
				
				// Get stored path
				const local_path = await TS.localStorage.global.getBlob();
				console.log("D&D Beyond Game Log Observer Symbiote: Retrieved local data");
				
				// Create new div to hold/format iframe
				console.log("D&D Beyond Game Log Observer Symbiote: Creating banner container");
				const iframe_div = document.createElement("div");
				iframe_div.className = 'observer_banner'
				flex_div.insertAdjacentElement('afterbegin', iframe_div);
				
				// Make iframe for embedded page
				const new_iframe = document.createElement("iframe");
				new_iframe.src = local_path + 'banner.html';
				new_iframe.className = 'observer_iframe';
				iframe_div.insertAdjacentElement("afterbegin", new_iframe);
				console.log("D&D Beyond Game Log Observer Symbiote: Now observing log...");
				
				// Mark the flag that we finished loading and expanding the log
				isGameLogExpanded = true;
			};
		};
	};
};




function set_banner_state(x) {

};

function check_should_show_banner() {
	isGameLogExpanded && isObservingGameLog ? set_banner_state(true) : set_banner_state(false);
};

setInterval(check_should_show_banner, 5000);