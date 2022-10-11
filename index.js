import _, { defaults, last, reduce, sample } from 'lodash';
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

export function newInnings(overrides) {
	const defaultInnings = {
		runs: 0,
		wickets: 10,
		target: Infinity,
		balls: [],
	};
	return defaults(overrides, defaultInnings);
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

export function commentate(outcome) {
	const commentary = sample(outcome.commentaries);
	return `${commentary} - ${outcome.description}`;
}

export function commentateLastBall(innings) {
	const lastBall = last(innings.balls);
	return commentate(lastBall.outcome);
}

export function playInnings(innings, shots) {
	return reduce(
		shots,
		(acc, shot) => {
			const { shotTiming } = shot;
			const outcome = getOutcomeWhen(shotTiming);
			const innings = play(acc, outcome);

			const commentary = commentateLastBall(innings);
			console.log(commentary);

			return innings;
		},
		innings
	);
}

async function main() {
	const text = await readFile();
	const shots = parseInput(text);

	const innings = newInnings();
	playInnings(innings, shots);
}
