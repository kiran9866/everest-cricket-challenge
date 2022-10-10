import { sample } from 'lodash';
import { out, outcomeByTiming } from './configuration';
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

export function newInnings() {
	return {
		runs: 0,
		wickets: 10,
		balls: [],
	};
}

export function play(innings, outcome) {
	return {
		runs: innings.runs + outcome.runs,
		wickets: innings.wickets + (outcome.wickets || 0),
		balls: [
			...innings.balls,
			{
				outcome,
			},
		],
	};
}

async function main() {
	const text = await readFile();
	const shots = parseInput(text);
	const innings = newInnings();
	shots.forEach(({ shotTiming }) => {
		const outcome = getOutcomeWhen(shotTiming);
		console.log(outcome.description);
	});
}
