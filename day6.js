import { readFileSync, promises as fsPromises } from "fs";

function asyncReadFile(filename) {
	try {
		const contents = readFileSync(filename, "utf-8");

		const arr = contents.split("");
		return arr;
	} catch (err) {
		console.log(err);
	}
}

const datastream = asyncReadFile("day6.txt");

const findBuffer = (stream, bufferLength) => {
	for (let i = 0; i < stream.length; i++) {
		let startFound = true;
		const startSignal = stream.slice(i, i + bufferLength);
		for (let j = 0; j < startSignal.length; j++) {
			const charCount = startSignal.filter(
				(val) => val === startSignal[j]
			).length;
			if (charCount > 1) {
				startFound = false;
				break;
			}
			if (startFound && j === bufferLength - 1) {
				return i + bufferLength;
			}
		}
		if (startFound) {
			break;
		}
	}
};

const partOne = findBuffer(datastream, 4); // 1640
const partTwo = findBuffer(datastream, 14); // 3613

console.log("Part One:", partOne);
console.log("Part Two:", partTwo);
