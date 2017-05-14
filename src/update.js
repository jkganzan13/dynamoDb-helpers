import R from 'ramda';
import { isReserved } from './helpers';

const getExpressionAttributeValues = (data, keysToIgnore) => {
	return Object.keys(data).reduce((acc, key) => {
		if (!R.contains(key, keysToIgnore)) {
			acc[`:${key}`] = data[key]
		}
		return acc
	}, {});
};

const getPrimaryKeys = (primaryKeys, data) => {
	return primaryKeys.reduce((acc, key) => {
		acc[key] = data[key];
		return acc;
	}, {});
};

const getUpdateExpression = (data, keysToIgnore = []) => {
	const getKeyWord = key => isReserved(key) ? `#${key}` : key;
	const getQueryItem = key => `${getKeyWord(key)} = :${key}`;
	const getUpdateQuery = (acc, key) => R.contains(key, keysToIgnore) ? acc : acc.concat(getQueryItem(key));

	const queries = Object.keys(data).reduce(getUpdateQuery, []);
	return queries.reduce((acc, query, i) => {
		if (i > 0) acc += ', ';
		return acc + query;
	}, 'SET ');
};

const getExpressionAttributeNames = (data, keysToIgnore) => {
	return Object.keys(data).reduce((acc, key) => {
		if (!R.contains(key, keysToIgnore) && isReserved(key)) {
			acc[`#${key}`] = key;
		}
		return acc;
	}, {});
};

/**
 * Dynamically creates request parameters for AWS update function
 * @param {object} data - event data from handler
 * @param {string[]} primaryKeys - primary/composite keys of the item to be updated
 * @param {string[]} keysToIgnore - keys to exclude from UpdateExpressions/ExpressionAttributes
 * @param {string} tableName - name of the table containing the item to update
 * @return {object}
 **/
const getUpdateParams = (data, primaryKeys, keysToIgnore, tableName) => {
	return {
		TableName: tableName,
		Key: getPrimaryKeys(primaryKeys, data),
		UpdateExpression: getUpdateExpression(data, keysToIgnore),
		ExpressionAttributeNames: getExpressionAttributeNames(data, keysToIgnore),
		ExpressionAttributeValues: getExpressionAttributeValues(data, keysToIgnore),
		ReturnValues: 'ALL_NEW',
	};
};

export {
	getUpdateParams
};