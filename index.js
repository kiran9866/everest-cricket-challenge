import prompt from './utils/prompt';
import simple from './simple';
import superover from './superover';

const programs = {
	superover,
	simple,
};
async function run() {
	const selection = await prompt({
		description: 'Select a game? Choices: `simple` or `superover`',
		validation: (selection) => ['superover', 'simple'].includes(selection),
	});
	await programs[selection]();
}

run();
