const { nextLine } = require("@learnly/simple-reader");

// ! this function is from Zaid
function getSaveOrCancelInput() {
	while (true) {
		console.log("Press 0 to cancel and exit");
		console.log("Press 1 to save and exit");
		let save = Number(nextLine());
		if (save !== 0 && save !== 1) {
			console.log("\nwrong answer\n");
			continue;
		} else {
			return save;
		}
	}
}

module.exports = {
	getSaveOrCancelInput,
};
