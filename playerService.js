const { nextLine } = require("@learnly/simple-reader");

const { Player } = require("./playerClass");
const { isTaken } = require("./functions/isTaken");
const { getSaveOrCancelInput } = require("./functions/getSaveOrCancelInput");
const { printMenu } = require("./functions/printMenu");
const { getYesOrNoInput } = require("./functions/getYesOrNoInput");
const { sortingNum, sortingString } = require("./functions/sorting");
const { printTopList } = require("./functions/printTopList");

playerService = {
	playerList: [],
	addPlayer: function () {
		const playerDetails = ["player name", "team name", "Rebound Per Game(RPG)", "Points Per Game(PPG)", "Assists Per Game(APG)"];
		let inputPlayerData;
		let playerData = [];

		while (true) {
			// for loop for adding details to newPlayer
			for (let i = 0; i < playerDetails.length; i++) {
				// 0,1 adding string(player name and team)
				if (i <= 1) {
					console.log(`Add ${playerDetails[i]}:`);
					inputPlayerData = nextLine();
					//if name is taken
					if (isTaken(this.playerList, inputPlayerData)) {
						console.log("\nthis name is already taken\n");
						i--;
						continue;
					}
					//empty string
					else if (!inputPlayerData) {
						console.log(`\n!!! ${playerDetails[i]} is obligatory`);
						i--;
						continue;
					}
					// correct entry
					else {
						playerData.push(inputPlayerData);
						console.log("\nentry saved\n");
					}
				}
				// 2,3,4 adding numbers(rpg,ppg,apg)
				else {
					console.log(`Add ${playerDetails[i]}:`);
					console.log("(or press enter to set it to zero)");
					inputPlayerData = Number(nextLine());
					if (inputPlayerData >= 0) {
						playerData.push(inputPlayerData);
						console.log("\nsaved\n");
					} else {
						console.log(`\n!!! cant be set as ${playerDetails[i]}`);
						i--;
						continue;
					}
				}
			}
			// finish the adding process
			let shouldSave = getSaveOrCancelInput();
			if (shouldSave) {
				console.log("Player card:");
				let newPlayer = new Player(...playerData);
				newPlayer.printCard();
				this.playerList.push(newPlayer); //add newPlayer to playerList
				console.log("\nSaved!");
			} else {
				console.log("\nNot saved!");
			}

			break;
		}
	},
	updatePlayer: function () {
		let updateMenuInput;
		const updateMenu = ["NAME", "TEAM", "ReboundPerGame", "PointsPerGame", "AssistsPerGame\n", "Save and Exit"];
		const UPDATE_name = 1;
		const UPDATE_team = 2;

		const UPDATE_SaveAndExit = 6;

		//if playerList has entries
		if (this.playerList.length > 0) {
			console.log("Enter the name of the player you want to update:");
			let searchInput = nextLine();
			let searchResult = this.searchPlayer(searchInput); // searching for the EXACT name
			//if there is a match for the searched player
			if (searchResult) {
				while (true) {
					console.log(`\nPlayer card:`);
					searchResult.printCard(); // print player details
					console.log("What would you like to update? :\n");
					printMenu(updateMenu, "update"); // print the update menu
					updateMenuInput = Number(nextLine()); // user input from update menu
					// if correct menu number selected
					if (updateMenuInput > 0 && updateMenuInput <= 5) {
						while (true) {
							console.log(`Enter new ${updateMenu[updateMenuInput - 1]}`);
							// name and team update (string)
							if (updateMenuInput == UPDATE_name || updateMenuInput == UPDATE_team) {
								let newEntry = nextLine();
								// correct entry( have to contain a character)
								if (newEntry && updateMenuInput == UPDATE_name) {
									if (isTaken(this.playerList, newEntry)) {
										console.log("\nthis name is already taken\n");
										continue;
									} else {
										searchResult.updateValues(newEntry, updateMenuInput);
										console.log("\n!!updated!!\n");
										console.log("press Enter to continue");
										nextLine();
										break; //back to update menu
									}
								} else if (newEntry && updateMenuInput == UPDATE_team) {
									searchResult.updateValues(newEntry, updateMenuInput);
									console.log("\n!!updated!!\n");
									console.log("press Enter to continue");
									nextLine();
									break; //back to update menu
								}
								// false entry (no character)
								else {
									console.log(`\n!!! player must have a ${updateMenu[updateMenuInput - 1]} !!!\n`);
									console.log("press Enter to continue");
									nextLine();
									break; //back to update menu
								}
							}
							// rpg,ppg,apg update (numbers)
							else {
								console.log("(or press enter to set it to zero)");
								let newEntry = Number(nextLine());
								// correct entry (positiv number)
								if (newEntry >= 0) {
									searchResult.updateValues(newEntry, updateMenuInput);
									console.log("\n!!! updated !!!\n");
									console.log("press Enter to continue");
									nextLine();
									break; // back to update menu
								}
								//false entry (minus number or string)
								else {
									console.log("\n!!! not a number !!!");
									console.log("press Enter to continue");
									nextLine();
									break; // back to update menu
								}
							}
						}
					}
					// if "save and exit" selected
					else if (updateMenuInput == UPDATE_SaveAndExit) {
						break; // back to program menu
					}
					// if incorrect menu number selected (not a number or wrong menu number)
					else {
						console.log("!!!! incorrect menu number !!!!\n");
						console.log("press Enter to continue");
						nextLine();
						continue; // back to update menu
					}
				}
			} else {
				console.log("\nno such a player");
				console.log("press ENTER to continue");
				nextLine();
			}
		}

		// if playerList is empty
		else {
			console.log("Nothing to UPDATE, database is empty\n");
			console.log("press ENTER to continue");
			nextLine();
		}
	},
	deletePlayer: function () {
		//if playerList has entries
		if (this.playerList.length > 0) {
			while (true) {
				console.log("Type the name of the player you want to delete");
				let searchInput = nextLine();

				let searchResult = this.searchPlayer(searchInput); // searching for the EXACT name

				// if player card found
				if (searchResult) {
					console.log(`\nPlayer card:`);
					searchResult.printCard(); // print the player card before ask to delete
					while (true) {
						console.log(`Are you sure you want to delete ${searchResult.name}'s player card?`);

						let shouldDelete = getYesOrNoInput();
						if (shouldDelete == "y") {
							let index = this.playerList.indexOf(searchResult); // index of a selected player
							this.playerList.splice(index, 1); // delete object of a selected player
							console.log(`\n${searchResult.name}'s player card is deleted`);
							console.log("press ENTER to continue");
							nextLine();
							break;
						} else {
							//cancel the delete
							console.log("\ncanceled");
							console.log("press ENTER to continue");
							nextLine();
							break;
						}
					}
				}
				// if no player card found
				else {
					console.log("\nno such a player");
					console.log("press ENTER to continue");
					nextLine();
					break;
				}
			}
		}
		// if playerList is empty
		else {
			console.log("Nothing to DELETE, database is empty\n");
			console.log("press ENTER to continue");
			nextLine();
		}
	},
	printPlayer: function () {
		//if playerList has entries
		if (this.playerList.length > 0) {
			console.log("Enter the name of the player you want to print:");
			let searchInput = nextLine();
			let searchResult = this.searchPlayer(searchInput); // searching for the EXACT name
			//if player found in playerList
			if (searchResult) {
				console.log(`\nPlayer card:`);
				searchResult.printCard(); // print the player card
				console.log("press ENTER to continue");
				nextLine();
			}
			// if no player card found
			else {
				console.log("\nno such a player");
				console.log("press ENTER to continue");
				nextLine();
			}
		}
		// if playerList is empty
		else {
			console.log("Nothing to PRINT, database is empty\n");
			console.log("press ENTER to continue");
			nextLine();
		}
	},
	partialSearch: function () {
		// if playerList has entries
		if (this.playerList.length > 0) {
			console.log("Enter (part of) the player Name or Team:");
			let search = nextLine().toLowerCase();
			let searchResult = this.playerList.filter((elm) => elm.name.toLowerCase().includes(search) || elm.team.toLowerCase().includes(search)); //  searching for the PART of the name of the player or team

			// if there is a match
			if (searchResult && search !== "") {
				console.log("Search result:\n");
				// printing all the found players and teams
				for (let a = 0; a < searchResult.length; a++) {
					console.log(a + 1);
					searchResult[a].printCard();
				}
				console.log("press ENTER to continue");
				nextLine();
			}
			// if result has no match for the searched word
			else {
				console.log("\nno such a player OR team");
				console.log("press ENTER to continue");
				nextLine();
			}
		}
		// if playerList is empty
		else {
			console.log("Nothing to SEARCH, database is empty\n");
			console.log("press ENTER to continue");
			nextLine();
		}
	},
	listPlayer: function () {
		if (this.playerList.length > 0) {
			let listMenuInput;
			const listMenu = ["TOP3", "Players by team", "All players\n", "Back to main menu"];
			const TOP3 = 1;
			const PLAYERS_BY_TEAM = 2;
			const ALL_PLAYERS = 3;
			const BACK_TO_MAIN_MENU = 4;
			let top3MenuInput;
			const top3Menu = ["RPG", "PPG", "APG\n", "Back to list menu"];
			const TOP3_RPG = 1;
			const TOP3_PPG = 2;
			const TOP3_APG = 3;
			const BACK_TO_LIST_MENU = 4;

			let listMenuRun = true;

			while (listMenuRun) {
				console.log(`***  LISTS  *** \n`);
				printMenu(listMenu, "list");
				listMenuInput = Number(nextLine());
				// top3 menu
				if (listMenuInput == TOP3) {
					while (true) {
						console.log(`***  ${listMenu[listMenuInput - 1]}  *** \n`);

						printMenu(top3Menu, "TOP3 list"); //print the top3 menu
						top3MenuInput = Number(nextLine()); // user selecting a top3 menu number
						//printing top3 list sorted by RPG
						if (top3MenuInput == TOP3_RPG) {
							printTopList(sortingNum(this.playerList, 1), TOP3_RPG, 3);
							console.log("\npress ENTER to go back to main menu");
							nextLine();
							listMenuRun = false; // set false to break the list menu (while loop)
							break; // break the top3 menu than list menu and go back to program menu
						}
						//printing top3 list sorted by PPG
						else if (top3MenuInput == TOP3_PPG) {
							printTopList(sortingNum(this.playerList, TOP3_PPG), TOP3_PPG, 3);

							console.log("\npress ENTER to go back to main menu");
							nextLine();
							listMenuRun = false; // set false to break the list menu (while loop)
							break;
						}
						//printing top3 list sorted by PPG
						else if (top3MenuInput == TOP3_APG) {
							printTopList(sortingNum(this.playerList, TOP3_APG), TOP3_APG, 3);
							console.log("\npress ENTER to go back to main menu");
							nextLine();
							listMenuRun = false; // set false to break the list menu (while loop)
							break; // break the top3 menu than list menu and go back to program menu
						}
						// back to List Menu
						else if (top3MenuInput == BACK_TO_LIST_MENU) {
							break; // break the top3 menu
						}
						// wrong number and start the top3 menu
						else {
							console.log("!!!! incorrect menu number !!!!\n");

							continue; // from top3 menu
						}
					}
				} else if (listMenuInput == PLAYERS_BY_TEAM) {
					// list players by team
					console.log("Enter the team name:");
					let search = nextLine().toLowerCase();
					let sortedTeamList = sortingString(this.searchTeam(search), PLAYERS_BY_TEAM);

					// if no result
					if (sortedTeamList == false) {
						console.log("\nno such a team"); // if no result
						console.log("press ENTER to continue");
						nextLine();
						continue; //from list menu
					}
					// if has result then print the list
					else {
						console.log("Search result:\n");
						for (let a = 0; a < sortedTeamList.length; a++) {
							console.log(a + 1);
							sortedTeamList[a].printCard();
						}
						console.log("press ENTER to continue");
						nextLine();

						break; // continue from program menu
					}
				} else if (listMenuInput == ALL_PLAYERS) {
					// list all the players
					let sortedAllPlayer = sortingString(this.playerList, ALL_PLAYERS);
					console.log("Search result:\n");
					for (let a = 0; a < sortedAllPlayer.length; a++) {
						console.log(a + 1);
						sortedAllPlayer[a].printCard();
					}
					console.log("press ENTER to continue");
					nextLine();

					break; // break the listMenu loop and continue from program menu
				} else if (listMenuInput == BACK_TO_MAIN_MENU) {
					break; //break the loop to continue from program menu
				} else {
					console.log("!!!! incorrect menu no# !!!!\n");
					continue; // from list menu
				}
			}
		}
		// if playerList is empty
		else {
			console.log("Nothing to list, database is empty\n");
			console.log("press ENTER to continue");
			nextLine();
		}
	},
	searchPlayer: function (toSearch) {
		return this.playerList.find((elm) => elm.name == toSearch);
	},
	searchTeam: function (toSearch) {
		return this.playerList.filter((elm) => elm.team.toLowerCase() == toSearch);
	},
};

module.exports = {
	playerService,
};
