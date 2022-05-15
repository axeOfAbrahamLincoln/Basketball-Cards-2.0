function printTopList(list, sortby, top) {
	if (list.length >= top) {
		console.log(
			`Top ${top} players with the ${sortby == 1 ? "highest rebounds average" : sortby == 2 ? "highest points average" : "highest assists average"}:\n`
		);
		for (let i = 0; i < top; i++) {
			console.log(
				`${i + 1}. ${list[i].name}, team: ${list[i].team},  ${
					sortby == 1 ? "RPG: " + list[i].rpg : sortby == 2 ? "PPG: " + list[i].ppg : "APG: " + list[i].apg
				}`
			);
		}
	} else {
		console.log(`There is just ${list.length} ${list.length == 1 ? "palyer" : "players"} in the system!`);
		console.log(
			`Top ${list.length} ${list.length == 1 ? "palyer" : "players"} with the ${
				sortby == 1 ? "highest rebounds average" : sortby == 2 ? "highest points average" : "highest assists average"
			}:\n`
		);
		for (let i = 0; i < list.length; i++) {
			console.log(
				`${i + 1}. ${list[i].name}, team: ${list[i].team},  ${
					sortby == 1 ? "PPG: " + list[i].rpg : sortby == 2 ? "PPG: " + list[i].ppg : "APG: " + list[i].apg
				}`
			);
		}
	}
}

module.exports = {
	printTopList,
};
