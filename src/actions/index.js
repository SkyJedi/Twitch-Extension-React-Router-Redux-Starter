export const setProps = (data) => {
	const [key, value] = Object.entries(data)[0];
	return {type: `${key}_CHANGED`, payload: value}
};