import { boundary, dot, out, single } from '../configuration';
import { commentate } from '.';

const allCommentaries = (outcome) => {
	return outcome.commentaries.map(
		(commentary) => `${commentary} - ${outcome.description}`
	);
};
describe('commentate', () => {
	it('should return formatted commentary for a dot ball', () => {
		const result = commentate(dot);
		expect(allCommentaries(dot).includes(result)).toBe(true);
	});
	it('should return formatted commentary for a single', () => {
		const result = commentate(single);
		expect(allCommentaries(single).includes(result)).toBe(true);
	});
	it('should return formatted commentary for a boundary', () => {
		const result = commentate(boundary);
		expect(allCommentaries(boundary).includes(result)).toBe(true);
	});
	it('should return formatted commentary for out', () => {
		const result = commentate(out);
		expect(allCommentaries(out).includes(result)).toBe(true);
	});
});
