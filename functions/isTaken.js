function isTaken(list, newName) {
	let name = list.find((elm) => elm.name == newName);
	if (name) {
		return true;
	} else {
		return false;
	}
}
module.exports = {
	isTaken,
};
