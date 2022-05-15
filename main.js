const { nextLine } = require("@learnly/simple-reader");
const fs = require("fs");
const { playerService } = require("./playerService");
const { playerDB } = require("./playerDB");
const { printMenu } = require("./functions/printMenu");
const { programMenu, ADD_PLAYER, UPDATE_PLAYER, DELETE_PLAYER, PRINT_PLAYER, SEARCH_PLAYER, LISTS, SAVEandEXIT } = require("./constVariables");

let prgMenuInput;

playerDB.toReadFile();

// STARTING THE PROGRAM
while (true) {
	console.log("***** Basketball Players Database *****\n");
	// print main menu
	printMenu(programMenu, "program");
	// read user menu choice
	prgMenuInput = Number(nextLine());

	// Add player to database (1)
	if (prgMenuInput == ADD_PLAYER) {
		console.log(`\n***  ${programMenu[prgMenuInput - 1]}  *** \n`);
		playerService.addPlayer();
	}
	// Update player's data (2)
	else if (prgMenuInput == UPDATE_PLAYER) {
		console.log(`\n***  ${programMenu[prgMenuInput - 1]}  *** \n`);
		playerService.updatePlayer();
	}
	// Delete player from database (3)
	else if (prgMenuInput == DELETE_PLAYER) {
		console.log(`\n***  ${programMenu[prgMenuInput - 1]}  *** \n`);
		playerService.deletePlayer();
	}
	// Print player card (exact search) (4)
	else if (prgMenuInput == PRINT_PLAYER) {
		console.log(`\n***  ${programMenu[prgMenuInput - 1]}  *** \n`);
		playerService.printPlayer();
	}
	// Search (partial search)(5)
	else if (prgMenuInput == SEARCH_PLAYER) {
		console.log(`\n***  ${programMenu[prgMenuInput - 1]}  *** \n`);
		playerService.partialSearch();
	}
	// Lists (6)
	else if (prgMenuInput == LISTS) {
		// console.log(`\n***  ${programMenu[prgMenuInput - 1]}  *** \n`);
		playerService.listPlayer();
	}
	// Exit (7)
	else if (prgMenuInput == SAVEandEXIT) {
		console.log(`\n***  ${programMenu[prgMenuInput - 1]}  *** \n`);
		playerDB.toWriteFile();
		break;
	}
	// None of them
	else {
		console.log("!!!! incorrect menu no# !!!!\n");
		continue;
	}
}
