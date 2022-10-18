import prompt from './prompt';
import fs from 'fs/promises';

export async function readFile() {
	const inputFilePath = await prompt({
		name: 'path',
		description: 'Path to input file: ',
	});
	return fs.readFile(inputFilePath, 'utf-8');
}
