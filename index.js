import { sample } from 'lodash';
import { outcomeByTiming } from './configuration';
import { readFile } from './readFile';

export function getOutcomeWhen(timing) {
	return sample(outcomeByTiming[timing]);
}

export function parseInput(text) {
	return text
		.trim()
		.split('\n')
		.map((line) => line.split(' '))
		.map(([bowlingCard, battingCard, shotTiming]) => ({
			bowlingCard,
			battingCard,
			shotTiming,
		}));
}

async function main() {
	const text = await readFile();
	const inputs = parseInput(text);
	console.log(inputs);
}

main()
	.then()
	.catch((err) => {
		console.error('Failed to run.');
	});
