const { playerService } = require("./playerService");
const fs = require("fs");
const { Player } = require("./playerClass");

let playerDB = {
	filePath: "playerDB.txt",
	toReadFile: function () {
		try {
			playerService.playerList = fs
				.readFileSync(this.filePath, "utf-8")
				.split(/\r?\n/)
				.map(JSON.parse)
				.map((obj) => new Player(obj.name, obj.team, obj.rpg, obj.ppg, obj.apg)); //! this function allows that regular objects from file read back like Player(class) instance.
		} catch (err) {
			console.log("List is empty, nothing to read");
		}
	},
	toWriteFile: function () {
		try {
			if (playerService.playerList.length > 0) {
				const text = playerService.playerList.map(JSON.stringify).reduce((prev, next) => `${prev}\n${next}`);
				fs.writeFileSync(this.filePath, text, "utf-8");
				console.log("!!! File saved !!!!\n\n Program exit");
			} else {
				fs.writeFileSync(this.filePath, playerService.playerList.toString(), "utf-8");
				console.log("!!! File saved !!!!\n\n Program exit");
			}
		} catch (err) {
			console.log("Something went wrong while writing content, and a program closed! Original file kept" + err);
		}
	},
};
module.exports = {
	playerDB,
};
