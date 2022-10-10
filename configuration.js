import { filter, flatMap, fromPairs, groupBy, map } from 'lodash';
export const bowlingCards = [
	'bouncer',
	'inswinger',
	'outswinger',
	'legcutter',
	'offcutter',
	'slowerball',
	'yorker',
	'pace',
	'offbreak',
	'doosra',
];

export const battingCards = [
	'straight',
	'sweep',
	'flick',
	'coverdrive',
	'leglance',
	'pull',
	'longon',
	'scoop',
	'squarecut',
	'uppercut',
];

export const timings = ['early', 'good', 'perfect', 'late'];

export const single = {
	runs: 1,
	commentaries: ['Excellent running between the wickets.'],
	when: ['early'],
};
export const double = {
	runs: 2,
	commentaries: [
		'Convert ones into twos.',
		'Excellent running between the wickets. ',
	],
	when: ['early', 'good'],
};
export const three = {
	runs: 3,
	commentaries: ['Excellent effort on the boundary.'],
	when: ['good'],
};
export const boundary = {
	runs: 4,
	commentaries: [
		'Excellent effort on the boundary.',
		'Excellent line and length.',
	],
	when: ['perfect'],
};
export const six = {
	runs: 6,
	commentaries: ["It's a huge hit.", "That's a massive and out of the ground."],
	when: ['perfect'],
};
export const dot = {
	runs: 0,
	commentaries: ['Edged and taken.'],
	when: ['early', 'late'],
};
export const out = {
	runs: 0,
	commentaries: ["It's a wicket."],
	wickets: -1,
	when: ['late'],
};

export const outcomes = [single, double, three, boundary, six, dot, out];
export const outcomeByTiming = fromPairs(
	map(timings, (timing) => [
		timing,
		filter(outcomes, (outcome) => outcome.when.includes(timing)),
	])
);

export let india = [
	'Ranganathan B',
	'Varenya Raj',
	'Sudhakar Dharwada',
	'Naveen Kumar B',
	'Mohammed Faizuddin',
	'Nidhuraj',
	'Lakshmi Prasanna',
	'Ravinder Deolal',
	'Venkateshwar K',
	'Anirudh B S',
	'Balakrishna',
	// Kiran Tulishaku (hopefully)
];

export let australia = [
	'Craig Brown',
	'Asad Naveed',
	'Chris Jones',
	'Daniel Prager',
	'Martin Chesbrough',
	'Brent Snook',
	'Ringo Thomas',
	'Rick Giner',
	'Benjamin Blackwood',
	'Charlotte',
	'Jodie Assaf',
];
