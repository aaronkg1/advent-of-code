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

const cleaningAreas = asyncReadFile("./day4.txt");

const formatPairs = (pairs) => {
	return pairs.map((pair) => {
		const ranges = pair.split(",");
		const rangeOne = ranges[0].split("-").map((val) => Number(val));
		const rangeTwo = ranges[1].split("-").map((val) => Number(val));
		return [rangeOne, rangeTwo];
	});
};

const formattedPairs = formatPairs(cleaningAreas);

const partOne = (areas) => {
	let sum = 0;
	areas.forEach((area) => {
		if (
			(area[0][0] <= area[1][0] && area[0][1] >= area[1][1]) ||
			(area[1][0] <= area[0][0] && area[1][1] >= area[0][1])
		) {
			sum += 1;
		}
	});
	return sum;
};

console.log(partOne(formattedPairs));

const generateRange = (array) => {
	return Array(array[1] - array[0] + 1)
		.fill()
		.map((_val, index) => index + array[0]);
};

const partTwo = (areas) => {
	let sum = 0;
	areas.forEach((area) => {
		const [areaOne, areaTwo] = area;
		const rangeOne = generateRange(areaOne);
		const rangeTwo = generateRange(areaTwo);
		for (let i = 0; i < rangeOne.length; i++) {
			if (rangeTwo.some((value) => value === rangeOne[i])) {
				sum += 1;
				break;
			}
		}
	});
	return sum;
};

console.log(partTwo(formattedPairs));
