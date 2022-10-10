import { sample } from 'lodash';
import { outcomeByTiming } from './configuration';

export function getOutcomeWhen(timing) {
	return sample(outcomeByTiming[timing]);
}
