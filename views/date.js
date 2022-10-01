var today = new Date();
var options = {
	weekday: "long",
	day: "numeric",
	month: "long",
};

export let day = today.toLocaleDateString("en-us", options);