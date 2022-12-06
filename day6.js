import { readFileSync, promises as fsPromises } from "fs";

function asyncReadFile(filename) {
	try {
		return readFileSync(filename, "utf-8");
	} catch (err) {
		console.log(err);
	}
}

const datastream = asyncReadFile("day6.txt");

const findBuffer = async (stream, bufferLength) => {
	for (let i = 0; i < stream.length; i++) {
		let startFound = true;
		const startSignal = stream.slice(i, i + bufferLength);
		for (let j = 0; j < startSignal.length; j++) {
			const charIndex = startSignal.indexOf(startSignal[j], j + 1);
			if (charIndex > -1) {
				startFound = false;
				break;
			}
			if (startFound && j === bufferLength - 1) {
				return i + bufferLength;
			}
		}
	}
};
const startOne = performance.now();
const partOne = await findBuffer(datastream, 4);
const endOne = performance.now();
console.log("Part One:", partOne, `Execution time: ${endOne - startOne} ms`); // Part One: 1640 Execution time: 0.2870829105377197 ms

const startTwo = performance.now();
const partTwo = await findBuffer(datastream, 14);
const endTwo = performance.now();

console.log("Part Two:", partTwo, `Execution time: ${endTwo - startTwo} ms`); // Part Two: 3613 Execution time: 0.406207799911499 ms
