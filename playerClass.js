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
}

module.exports = {
	Player,
};
