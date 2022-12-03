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
const itemsList = asyncReadFile("./day3.txt");
const splitRucksacks = (array) => {
	const splitSacks = [];
	array.forEach((rucksack) => {
		const rucksackOne = rucksack.slice(0, rucksack.length / 2).split("");
		const rucksackTwo = rucksack.slice(rucksack.length / 2).split("");
		splitSacks.push([rucksackOne, rucksackTwo]);
	});
	return splitSacks;
};

const charToPriority = (char) => {
	const charCode = char.charCodeAt(0);
	return charCode >= 97 ? charCode - 96 : charCode - 38;
};

const sumPriorities = (rucksacks) => {
	let sum = 0;
	rucksacks.forEach((rucksack) => {
		const [compartOne, compartTwo] = rucksack;
		for (let i = 0; i < compartOne.length; i++) {
			if (compartTwo.indexOf(compartOne[i]) >= 0) {
				sum += charToPriority(compartOne[i]);
				break;
			}
		}
	});
	return sum;
};

const allRucksacks = splitRucksacks(itemsList);
console.log(sumPriorities(allRucksacks));

const partTwo = (elves) => {
	let sum = 0;
	for (let i = 0; i < elves.length; i = i + 3) {
		const badges = elves[i].split("");
		for (let j = 0; j < badges.length; j++) {
			if (
				elves[i + 1].indexOf(badges[j]) >= 0 &&
				elves[i + 2].indexOf(badges[j]) >= 0
			) {
				sum += charToPriority(badges[j]);
				break;
			}
		}
	}
	return sum;
};

console.log(partTwo(itemsList));
