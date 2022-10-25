const prompt = require('prompt-sync')({sigint: true});
const { post_DM } = require('./twitter');

const games = new Map();

const new_game = (gameId) => {
	games.set(gameId, {
		grid: Array(7).fill(0).map(x => new Array(6).fill(0)),
		turn: 1
	})
}

//	DIRECTION => dir
//	0	1	2
//	_	X	3

const check_next = (x, y, dir) => {

	let sum = {x: 0, y: 0}
	switch (dir) {
		case 0:
			sum = {x: -1, y: 1};
			break;
		case 1:
			sum = {x: 0, y: 1};
			break;
		case 2:
			sum = {x: 1, y: 1};
			break;
		default: //case 3
			sum = {x: 1, y: 0};
	}

	let counter = 1;
	for (let i = 1; i < 4; i++) {
		if (x + sum.x < 0 || x + sum.x > 6 || y + sum.y > 5)
			break;
		if (grid[x][y] == grid[x + sum.x][y + sum.y]) {
			counter++;
			x += sum.x;
			y += sum.y;
		}
	}
	return counter;
}

const check_line = () => {
	for (let y = 0; y < 6; y++) {
		for (let x = 0; x < 7; x++) {
			if (grid[x][y] == 0)
				continue;
			for (let dir = 0; dir < 4; dir++) {
				if (check_next(x, y, dir) == 4) {
					return grid[x][y];
				}
			}
		}
	}
	return 0;
}

const insert_chip = (x, turn) => {
	if (x < 0 || 6 < x)
		return false;
	for (let y = 0; y < 6; y++) {
		if (grid[x][y] == 0) {
			grid[x][y] = turn;
			return true;
		}
	}
	return false;
}

const print_grid = (gameId, grid) => {
	for (let y = 5; y >= 0; y--) {
		const message = `|${grid[0][y]}|${grid[1][y]}|${grid[2][y]}|${grid[3][y]}|${grid[4][y]}|${grid[5][y]}|${grid[6][y]}|`;
		post_DM(gameId, message)
		console.log(message);
	}
}

/* let turn = 1;

while (check_line() == 0) {
	turn *= -1;
	console.log(turn == 1 ? "Blue's turn" : "Red's turn");
	print_grid();

	let input = prompt("Select a column:");

	if (insert_chip(parseInt(input), 1 + (turn + 1) / 2) == false) {
		console.log("\ninvalid\n");
		turn *= -1;
		continue;
	} else

	console.log("\n========================\n");
}

console.log(turn == 1 ? "Blue wins": "Red wins");
print_grid();
process.exit(); */

const connect4 = (gameId) => {
	let retry = true;
	const game = games.get(gameId);

	while (retry == true)
		game.turn *= -1;

		console.log(game.turn == 1 ? "Blue's turn" : "Red's turn");
		print_grid(gameId, game.grid);

		let input = prompt("Select a column:");

		if (insert_chip(parseInt(input), 1 + (game.turn + 1) / 2) == false) {
			console.log("\ninvalid\n");
			game.turn *= -1;
		} else {
			retry = false;
			console.log("\n========================\n");
		}
}

module.exports = connect4;
