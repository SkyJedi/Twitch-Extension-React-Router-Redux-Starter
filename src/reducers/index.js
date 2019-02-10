import {combineReducers} from 'redux';
import * as changeState from './changeState';

const allReducers = combineReducers({
	content: changeState.content,
	data: changeState.data,
	theme: changeState.theme,
});

export default allReducers;
