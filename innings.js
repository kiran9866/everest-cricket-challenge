import { defaults, get, last, reduce, sample, take } from 'lodash';
import { outcomeByTiming, single, three } from './configuration';

export const getOutcomeWhen = (timing) => sample(outcomeByTiming[timing]);

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

export function play(innings, shot, outcome) {
	const targetReached = innings.runs >= innings.target;
	const allOut = innings.wickets < 1;
	if (targetReached || allOut) {
		return innings;
	}

	const inningsWithOutcome = {
		...innings,
		runs: innings.runs + outcome.runs,
		wickets: innings.wickets + (outcome.wickets || 0),
		balls: [
			...innings.balls,
			{
				striker: innings.striker,
				shot,
				outcome,
			},
		],
	};

	if (outcome.runs === single.runs || outcome.runs === three.runs) {
		return swapPlayers(inningsWithOutcome);
	}

	if (outcome.wickets) {
		return replaceFallen(inningsWithOutcome);
	}

	return inningsWithOutcome;
}

export function playInnings(innings, shots) {
	return reduce(
		shots,
		(acc, shot) => {
			const { shotTiming } = shot;
			const outcome = getOutcomeWhen(shotTiming);
			return play(acc, shot, outcome);
		},
		innings
	);
}
