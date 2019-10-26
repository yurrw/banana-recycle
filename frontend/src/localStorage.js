export const loadState = () => {
	try {
		const serializedState = localStorage.getItem('coppeState');

		if (serializedState === null) return undefined;

		let __loadedState = JSON.parse(serializedState);

		// Verifica se esses campos existem, se nao, retorna undefined
		if ( 'choosenbyuser' in __loadedState.login === false ||
			'projectaccess' in __loadedState.login === false ||
			'groupaccess'in __loadedState.login === false) {
			return undefined;
		}

		return JSON.parse(serializedState);
	} catch (err) {
		return undefined;
	}
};

export const saveState = (state) => {
	try {
		const serializedState = JSON.stringify(state);
		localStorage.setItem('coppeState', serializedState);
	} catch (err) {
		// Ignore write errors.
	}
};