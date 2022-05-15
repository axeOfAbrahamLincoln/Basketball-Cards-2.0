function printMenu(menu, menuName) {
	menu.forEach((element, idx) => {
		console.log(`${idx + 1}. ${element}`);
	});
	console.log("");
	console.log(`Choose from the ${menuName} menu [1-${menu.length}]:`);
}

module.exports = {
	printMenu,
};
