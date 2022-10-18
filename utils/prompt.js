import _ from 'lodash';
import readline from 'readline/promises';

export default async function prompt({
	description,
	validation = _.stubTrue,
	parse = _.identity,
}) {
	const rl = readline.createInterface(process.stdin, process.stdout);
	const value = await rl.question(description);
	rl.close();
	const answer = parse(value);
	if (!validation(answer)) {
		return prompt({ description, validation, parse });
	}
	return answer;
}
