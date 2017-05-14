import R from 'ramda';
import reservedWords from './const';

export const isReserved = (item) => R.contains(item.toUpperCase(), reservedWords);
