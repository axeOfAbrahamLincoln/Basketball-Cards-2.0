const { nextLine } = require("@learnly/simple-reader");

// ! this function is from Zaid
function getYesOrNoInput() {
	while (true) {
		console.log("Yes or No (y/n)");
		let answer = nextLine();
		if (answer !== "y" && answer !== "n") {
			console.log("\nwrong answer\n");
			continue;
		} else {
			return answer;
		}
	}
}

module.exports = {
	getYesOrNoInput,
};
