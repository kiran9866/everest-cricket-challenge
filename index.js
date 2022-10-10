import { sample } from 'lodash';
import { outcomeByTiming } from './configuration';
import { readFile } from './readFile';

export const getOutcomeWhen = (timing) => sample(outcomeByTiming[timing]);

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
	inputs.forEach(({ shotTiming }) => {
		const outcome = getOutcomeWhen(shotTiming);
		console.log(outcome.description);
	});
}

main()
	.then()
	.catch((err) => {
		console.error('Failed to run.');
	});
