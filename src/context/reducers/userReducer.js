

const userReducer = (state = null, action) => {
	switch (action.type) {
		case 'GET_USER':
			return state;
		case 'SET_USER':
			return state;
		default:
			return state;
	}
}

export default userReducer;