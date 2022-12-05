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
const stacksInput = asyncReadFile("day5stacks.txt");
const movesInput = asyncReadFile("./day5moves.txt");
const createStacks = (input) => {
	const stacks = Array(9)
		.fill()
		.map((_stack) => []);

	for (let i = 7; i >= 0; i--) {
		for (let j = 1; j < input[i].length; j += 4) {
			if (input[i][j] !== " ") {
				const index = input[8][Number(j)] - 1;
				stacks[index].push(input[i][j]);
			}
		}
	}
	return stacks;
};

const getMoves = (input) => {
	const moves = [];
	input.forEach((line) => {
		const numberOnly = line.match(/\d+/g);
		moves.push(numberOnly);
	});
	return moves;
};
const stacks = createStacks(stacksInput);
const moves = getMoves(movesInput);

const moveCrates = (input, moves) => {
	const stacks = JSON.parse(JSON.stringify(input));
	moves.forEach((move) => {
		const [count, origin, destination] = move;
		for (let i = 0; i < count; i++) {
			stacks[destination - 1].push(stacks[origin - 1].pop());
		}
	});
	let finalString = "";
	stacks.forEach((stack) => {
		finalString += stack[stack.length - 1];
	});
	return finalString;
};

console.log(moveCrates(stacks, moves)); // GFTNRBZPF

const moveCratesPartTwo = (input, moves) => {
	const stacks = JSON.parse(JSON.stringify(input));
	moves.forEach((move) => {
		const [count, origin, destination] = move;
		const stacksToMove = stacks[origin - 1].splice(
			stacks[origin - 1].length - count,
			count
		);
		stacks[destination - 1].push(...stacksToMove);
	});
	let finalString = "";
	stacks.forEach((stack) => {
		finalString += stack[stack.length - 1];
	});
	return finalString;
};

console.log(moveCratesPartTwo(stacks, moves)); // VRQWPDSGP
