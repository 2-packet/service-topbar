const request = require('supertest');
const app = require('../server/server.js');

describe('Test the root path', () => {
	test('It should response the GET method', (done) => {
		return request(app)
			.get('/search')
			.then((response) => {
				expect(response.statusCode).toBe(200);
				done();
			});
	});
});
