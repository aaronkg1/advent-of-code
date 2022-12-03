import { readFileSync, promises as fsPromises } from "fs";

function asyncReadFile(filename) {
	try {
		const contents = readFileSync(filename, "utf-8");

		const arr = contents.split("\n");

		return arr;
	} catch (err) {
		console.log(err);
	}
}
const strategyGuide = asyncReadFile("./day2input.txt");
console.log(strategyGuide);

const selectionScoresOne = {
	X: 1,
	Y: 2,
	Z: 3,
};

const partOneScores = (strategy) => {
	let totalScore = 0;
	strategy.forEach((round) => {
		let roundScore = 0;
		const moves = round.split(" ");
		const oppMove = moves[0];
		const yourMove = moves[1];
		roundScore += selectionScoresOne[yourMove];
		if (yourMove.charCodeAt(0) == oppMove.charCodeAt(0) + 23) {
			roundScore += 3;
		} else if (
			(yourMove == "X" && oppMove == "C") ||
			(yourMove == "Y" && oppMove == "A") ||
			(yourMove == "Z" && oppMove == "B")
		) {
			roundScore += 6;
		}
		totalScore += roundScore;
	});
	return totalScore;
};

const selectionScores = {
	A: 1,
	B: 2,
	C: 3,
};

const selectionStrategy = {
	// lose
	X: {
		A: "C",
		B: "A",
		C: "B",
	},
	// draw
	Y: {
		A: "A",
		B: "B",
		C: "C",
	},
	// win
	Z: {
		A: "B",
		B: "C",
		C: "A",
	},
};

const partTwoScores = (strategy) => {
	let totalScore = 0;
	strategy.forEach((round) => {
		let roundScore = 0;
		const moves = round.split(" ");
		const oppMove = moves[0];
		const outcome = moves[1];
		const yourMove = selectionStrategy[outcome][oppMove];
		roundScore += selectionScores[yourMove];
		if (outcome == "Y") {
			roundScore += 3;
		} else if (outcome == "Z") {
			roundScore += 6;
		}
		totalScore += roundScore;
	});
	return totalScore;
};
console.log(partOneScores(strategyGuide));
console.log(partTwoScores(strategyGuide));
