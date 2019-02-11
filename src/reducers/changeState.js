const loadingReducer = (type, state, action) => {
	if (action.type === `${type}_CHANGED`) return action.payload;
	return state;
};

export const content = (state = null, action) => loadingReducer('content', state, action);
export const twitch = (state = null, action) => loadingReducer('twitch', state, action);
export const theme = (state = 'light', action) => loadingReducer('theme', state, action);