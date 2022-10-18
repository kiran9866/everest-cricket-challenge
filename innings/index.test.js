import { boundary, dot, out, single, three } from '../configuration';
import { getOutcomeWhen, newInnings, play } from '.';

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
		const shot = {};
		const result = play(innings, shot, dot);
		expect(result).toMatchObject({ runs: 0, wickets: 10 });
	});
	it('should return current innings state for a single', () => {
		const innings = newInnings();
		const shot = {};
		const result = play(innings, shot, single);
		expect(result).toMatchObject({ runs: 1, wickets: 10 });
	});
	it('should return current innings state for a boundary', () => {
		const innings = newInnings();
		const shot = {};
		const result = play(innings, shot, boundary);
		expect(result).toMatchObject({ runs: 4, wickets: 10 });
	});
	it('should return current innings state for out', () => {
		const innings = newInnings();
		const shot = {};
		const result = play(innings, shot, out);
		expect(result).toMatchObject({ runs: 0, wickets: 9 });
	});
	it('should not play when target reached', () => {
		const innings = newInnings({ target: 10, runs: 10 });
		const shot = {};
		const result = play(innings, shot, single);
		expect(result).toBe(innings);
	});
	it('should not play when no wickets left', () => {
		const innings = newInnings({ wickets: 0 });
		const shot = {};
		const result = play(innings, shot, single);
		expect(result).toBe(innings);
	});
	it('should swap players when single', () => {
		const innings = newInnings({ players: ['a', 'b'] });
		const shot = {};
		const result = play(innings, shot, single);
		expect(result.striker).toBe('b');
		expect(result.nonStriker).toBe('a');
	});
	it('should swap players when three', () => {
		const innings = newInnings({ players: ['a', 'b'] });
		const shot = {};
		const result = play(innings, shot, three);
		expect(result.striker).toBe('b');
		expect(result.nonStriker).toBe('a');
	});
	it('should not swap players for boundary', () => {
		const innings = newInnings({ players: ['a', 'b'] });
		const shot = {};
		const result = play(innings, shot, boundary);
		expect(result.striker).toBe('a');
		expect(result.nonStriker).toBe('b');
	});
	it('should replace striker for out', () => {
		const innings = newInnings({ players: ['a', 'b', 'c'] });
		const shot = {};
		const result = play(innings, shot, out);
		expect(result.striker).toBe('c');
		expect(result.nonStriker).toBe('b');
	});
	it('should add given shot and outcome to ball history', () => {
		const innings = newInnings();
		const shot = {};
		const result = play(innings, shot, dot);
		expect(result.balls).toHaveLength(1);
		expect(result.balls[0]).toMatchObject({
			outcome: dot,
			shot,
		});
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
			striker: 'a',
			nonStriker: 'b',
			runs: 0,
			target: 10,
			wickets: 10,
		});
	});
});
