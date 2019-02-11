import {combineReducers} from 'redux';

const loadingReducer = (type, state, action) => {
	if (action.type === `${type}_CHANGED`) return action.payload;
	return state;
};

const allReducers = combineReducers({
	content: (state = null, action) => loadingReducer('content', state, action),
	theme: (state = 'light', action) => loadingReducer('theme', state, action),
});

export default allReducers;
