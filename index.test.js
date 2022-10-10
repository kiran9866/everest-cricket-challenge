import { getOutcomeWhen } from '.';

describe('getOutcomeWhen', () => {
	it('should return correct outcome for given timing', () => {
		const outcome = getOutcomeWhen('early');
		const { runs } = outcome;
		expect(runs === 1 || runs === 2 || runs === 0).toBe(true);
	});
});
