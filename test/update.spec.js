import { getUpdateParams } from '../src/update';

describe('UPDATE', () => {
	it('should return the correct update parameters', () => {
		const table = 'Movies';
		const year = 2015;
		const title = 'The Big New Movie';
		const rating = 5.5;
		const plot = 'Everything happens all at once.';
		const actors = ['Larry', 'Moe', 'Curly'];

		const data = {
			year,
			title,
			rating,
			plot,
			actors,
		};

		const expected = {
			TableName:'Movies',
			Key:{
				'year': 2015,
				'title': 'The Big New Movie'
			},
			UpdateExpression: 'SET rating = :rating, plot = :plot, actors = :actors',
			ExpressionAttributeValues:{
				':rating':5.5,
				':plot':'Everything happens all at once.',
				':actors':['Larry', 'Moe', 'Curly']
			},
			ExpressionAttributeNames: {},
			ReturnValues:'ALL_NEW'
		};

		const result = getUpdateParams(data, ['year', 'title'], ['year', 'title'], table);
		expect(result).to.eql(expected);
	});

	it('should return the correct update parameters', () => {
		const table = 'Customer';
		const id = 111;
		const name = 'John Doe';
		const position = 'Web Dev';

		const data = {
			id,
			name,
			position,
		};

		const expected = {
			TableName:'Customer',
			Key:{
				'id': 111,
			},
			UpdateExpression: 'SET #name = :name, #position = :position',
			ExpressionAttributeValues:{
				':name':'John Doe',
				':position':'Web Dev',
			},
			ExpressionAttributeNames: {
				'#name': 'name',
				'#position': 'position'
			},
			ReturnValues:'ALL_NEW'
		};

		const result = getUpdateParams(data, ['id'], ['id'], table);
		expect(result).to.eql(expected);
	});
});