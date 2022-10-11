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
