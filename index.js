import prompt from 'prompt';
import simple from './simple';
import superover from './superover';

const programs = {
	superover,
	simple,
};
async function run() {
	const { selection } = await prompt.get([
		{
			name: 'selection',
			description: 'Select a game? Choices: `simple` or `superover`',
			required: true,
			conform: (selection) => ['superover', 'simple'].includes(selection),
		},
	]);
	await programs[selection]();
}

run();
