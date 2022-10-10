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
});

describe('commentate', () => {
	it('should return formatted commentary for a dot ball', () => {
		const result = commentate(dot);
		expect(
			dot.commentaries
				.map((commentary) => `${commentary} - ${dot.description}`)
				.includes(result)
		).toBe(true);
	});
	it('should return formatted commentary for a single', () => {
		const result = commentate(single);
		expect(
			single.commentaries
				.map((commentary) => `${commentary} - ${single.description}`)
				.includes(result)
		).toBe(true);
	});
	it('should return formatted commentary for a boundary', () => {
		const result = commentate(boundary);
		expect(
			boundary.commentaries
				.map((commentary) => `${commentary} - ${boundary.description}`)
				.includes(result)
		).toBe(true);
	});
	it('should return formatted commentary for out', () => {
		const result = commentate(out);
		expect(
			out.commentaries
				.map((commentary) => `${commentary} - ${out.description}`)
				.includes(result)
		).toBe(true);
	});
});
