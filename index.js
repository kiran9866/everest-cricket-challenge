import _, { defaults, get, last, reduce, sample, take } from 'lodash';
import { outcomeByTiming, single, three } from './configuration';
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

export function newInnings(overrides = {}) {
	const players = get(overrides, 'players', []);
	const [striker, nonStriker] = take(players, 2);
	const defaultInnings = {
		runs: 0,
		wickets: 10,
		target: Infinity,

		players,
		striker,
		nonStriker,

		balls: [],
	};
	return defaults(overrides, defaultInnings);
}

function swapPlayers(innings) {
	return {
		...innings,
		striker: innings.nonStriker,
		nonStriker: innings.striker,
	};
}

function replaceFallen(innings) {
	const fallen = innings.striker;
	const players = innings.players.filter((player) => player !== fallen);
	const striker = players.filter((player) => player !== innings.nonStriker)[0];
	return {
		...innings,
		players,
		striker,
	};
}

export function play(innings, outcome) {
	const targetReached = innings.runs >= innings.target;
	if (targetReached || innings.wickets <= 0) {
		return innings;
	}
	const inningsAfterShot = {
		...innings,
		runs: innings.runs + outcome.runs,
		wickets: innings.wickets + (outcome.wickets || 0),
		balls: [
			...innings.balls,
			{
				striker: innings.striker,
				outcome,
			},
		],
	};

	if (outcome.runs === single.runs || outcome.runs === three.runs) {
		return swapPlayers(inningsAfterShot);
	}

	if (outcome.wickets) {
		return replaceFallen(inningsAfterShot);
	}

	return inningsAfterShot;
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
