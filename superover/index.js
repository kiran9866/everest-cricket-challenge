import _, { sample, sampleSize } from 'lodash';
import prompt from '../utils/prompt';
import { newInnings, playInnings } from '../innings';
import {
	australia,
	bowlingCards as allBowlingCards,
	india,
} from '../configuration';
import { readFile } from '../utils/readFile';

export function parseInput(text) {
	return text
		.trim()
		.split('\n')
		.map((line) => line.split(' '))
		.map(([battingCard, shotTiming]) => ({
			battingCard,
			shotTiming,
		}));
}
export function validateTargetScore(target) {
	const isNumber = Number(target) === target;
	const isPositive = target >= 0;
	const isInteger = target % 1 === 0;
	return isNumber && isPositive && isInteger;
}

export function printResult(innings) {
	const { target, runs, wickets } = innings;
	const status =
		runs >= target
			? `won by ${wickets} wicket(s)`
			: `lost by ${target - runs} runs`;
	console.log(`AUSTRALIA score: ${runs} runs`);
	console.log(`AUSTRALIA ${status}`);
}

export function commentate(ball, bowler) {
	const {
		shot,
		striker,
		outcome: { commentaries, description },
	} = ball;
	const { battingCard, bowlingCard, shotTiming } = shot;
	const commentary = sample(commentaries);
	return `${bowler} bowled ${bowlingCard},
	${striker} played ${shotTiming} ${battingCard} shot,
	${commentary} - ${description}`;
}

export default async function main() {
	const text = await readFile();
	const shots = parseInput(text);
	const shotsWithBowlingCard = shots.map((shot) => ({
		...shot,
		bowlingCard: sample(allBowlingCards),
	}));
	const target = await prompt({
		description: 'Set target for the super over: ',
		validation: validateTargetScore,
		parse: _.toNumber,
	});
	const superoverInnings = {
		players: sampleSize(australia, 3),
		wickets: 2,
		target,
		balls: [],
	};
	const bowler = sample(india);
	const innings = newInnings(superoverInnings);
	const result = playInnings(innings, shotsWithBowlingCard);
	result.balls.forEach((ball) => {
		const commentary = commentate(ball, bowler);
		console.log(commentary);
	});
	printResult(result);
}
