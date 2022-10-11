import { sample } from 'lodash';
import { newInnings, playInnings } from './innings';
import { readFile } from './readFile';

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

export function commentate(outcome) {
	const commentary = sample(outcome.commentaries);
	return `${commentary} - ${outcome.description}`;
}

export function commentateLastBall(innings) {
	const lastBall = last(innings.balls);
	return commentate(lastBall.outcome);
}

export default async function main() {
	const text = await readFile();
	const shots = parseInput(text);

	const innings = newInnings();
	const result = playInnings(innings, shots);
	result.balls.forEach((ball) => {
		const commentary = commentate(ball.outcome);
		console.log(commentary);
	});
}
