import update from 'react/lib/update';

const initialState = {
	isFetching: false,
	message: "",
	choosenbyuser: {
		isMariana: false,
		isBrumadinho: false
	},
	projectaccess: [],
	groupaccess: [],
	credentials: {
		username: null,
		token: null
	}
};

export default function login(state = initialState, action) {
	
	switch (action.type) {
		case "SET_CREDENTIALS":
			return update(state, { credentials: {
				token: { $set: action.token }, 
				username: { $set: action.username }
			}});			

		case "IS_FETCHING":
			return update(state, { isFetching: { $set: action.bool } });

		case "SET_MESSAGE":
			return update(state, { message: { $set: action.message } });		

		default:
			return state;
	}
}