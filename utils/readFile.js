import prompt from 'prompt';
import fs from 'fs/promises';

export async function readFile() {
	const { path: inputFilePath } = await prompt.get([
		{ name: 'path', description: 'Path to input file', required: true },
	]);
	return fs.readFile(inputFilePath, 'utf-8');
}
