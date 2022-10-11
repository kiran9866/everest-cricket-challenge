import { commentate, getOutcomeWhen, newInnings, play } from '.';
import { boundary, dot, out, single } from './configuration';

describe('getOutcomeWhen', () => {
	it('should return correct outcome for given timing', () => {
		const outcome = getOutcomeWhen('early');
		const { runs } = outcome;
		expect(runs === 1 || runs === 2 || runs === 0).toBe(true);
	});
});

describe('play', () => {
	it('should return current innings state for a dot ball', () => {
		const innings = newInnings();
		const result = play(innings, dot);
		expect(result).toMatchObject({ runs: 0, wickets: 10 });
	});
	it('should return current innings state for a single', () => {
		const innings = newInnings();
		const result = play(innings, single);
		expect(result).toMatchObject({ runs: 1, wickets: 10 });
	});
	it('should return current innings state for a boundary', () => {
		const innings = newInnings();
		const result = play(innings, boundary);
		expect(result).toMatchObject({ runs: 4, wickets: 10 });
	});
	it('should return current innings state for out', () => {
		const innings = newInnings();
		const result = play(innings, out);
		expect(result).toMatchObject({ runs: 0, wickets: 9 });
	});
	it('should not play when target reached', () => {
		const innings = newInnings({ target: 10, runs: 10 });
		const result = play(innings, single);
		expect(result).toBe(innings);
	});
	it('should not play when no wickets left', () => {
		const innings = newInnings({ wickets: 0 });
		const result = play(innings, single);
		expect(result).toBe(innings);
	});
});

const allCommentaries = (outcome) => {
	return outcome.commentaries.map(
		(commentary) => `${commentary} - ${outcome.description}`
	);
};
describe('commentate', () => {
	it('should return formatted commentary for a dot ball', () => {
		const result = commentate(dot);
		expect(allCommentaries(dot).includes(result)).toBe(true);
	});
	it('should return formatted commentary for a single', () => {
		const result = commentate(single);
		expect(allCommentaries(single).includes(result)).toBe(true);
	});
	it('should return formatted commentary for a boundary', () => {
		const result = commentate(boundary);
		expect(allCommentaries(boundary).includes(result)).toBe(true);
	});
	it('should return formatted commentary for out', () => {
		const result = commentate(out);
		expect(allCommentaries(out).includes(result)).toBe(true);
	});
});

describe('newInnings', () => {
	it('should create new innings with overrides', () => {
		const overrides = {
			players: ['a', 'b'],
			target: 10,
		};
		expect(newInnings(overrides)).toEqual({
			balls: [],
			players: ['a', 'b'],
			runs: 0,
			target: 10,
			wickets: 10,
		});
	});
});
