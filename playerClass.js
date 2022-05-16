class Player {
	name;
	team;
	rpg = 0;
	ppg = 0;
	apg = 0;
	constructor(playerName, playerTeam, playerRPG, playerPPG, playerAPG) {
		this.name = playerName;
		this.team = playerTeam;
		this.rpg = playerRPG;
		this.ppg = playerPPG;
		this.apg = playerAPG;
	}
	updateValues(newValue, atribute) {
		if (atribute == 1) {
			this.name = newValue;
		} else if (atribute == 2) {
			this.team = newValue;
		} else if (atribute == 3) {
			this.rpg = newValue;
		} else if (atribute == 4) {
			this.ppg = newValue;
		} else if (atribute == 5) {
			this.apg = newValue;
		}
	}
	printCard() {
		console.log(`name: ${this.name}\nteam: ${this.team}`);
		console.log(`RPG: ${this.rpg} PPG: ${this.ppg} APG: ${this.apg}\n`);
	}
}

module.exports = {
	Player,
};
