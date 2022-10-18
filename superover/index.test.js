import { parseInput } from '.';

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
