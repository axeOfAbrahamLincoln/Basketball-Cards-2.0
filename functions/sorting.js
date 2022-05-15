function sortingNum(list, sortby) {
	if (sortby == 1) {
		return list.sort(function (a, b) {
			return b.rpg - a.rpg;
		});
	}
	if (sortby == 2) {
		return list.sort(function (a, b) {
			return b.ppg - a.ppg;
		});
	}
	if (sortby == 3) {
		return list.sort(function (a, b) {
			return b.apg - a.apg;
		});
	}
}
function sortingString(list, sortby) {
	if (sortby == 2 || sortby == 3) {
		return list.sort(function (a, b) {
			// sorting alphabetically - ascending
			const nameA = a.name;
			const nameB = b.name;
			if (nameA < nameB) {
				return -1;
			}
			if (nameA > nameB) {
				return 1;
			}

			return 0;
		});
	}
}
module.exports = {
	sortingNum,
	sortingString,
};
