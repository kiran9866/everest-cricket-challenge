import { parseInput, validateTargetScore } from '.';

describe('parseInput', () => {
	it('should parse given input text', () => {
		const text = `
straight early
sweep perfect
        `;
		const result = parseInput(text);
		expect(result).toEqual([
			{
				battingCard: 'straight',
				shotTiming: 'early',
			},
			{
				battingCard: 'sweep',
				shotTiming: 'perfect',
			},
		]);
	});
});

describe('validateTargetScore', () => {
	it('should return true for validate input target score', () => {
		const result = validateTargetScore(8);
		expect(result).toBe(true);
	});

	it('should throw an error for negative number as a input target score', () => {
		const result = validateTargetScore(-1);
		expect(result).toBe(false);
	});

	it('should throw an error for float number as a input target score', () => {
		const result = validateTargetScore(8.5);
		expect(result).toBe(false);
	});

	it('should throw an error for string as a input target score', () => {
		const result = validateTargetScore('hello');
		expect(result).toBe(false);
	});
});
