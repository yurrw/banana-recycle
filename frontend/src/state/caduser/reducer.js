import update from 'react/lib/update';

const initialState = {
	isFetching: false,
	message: "",
	isSelecting: null,
	upload: {
		status: "IDLE",
		message: "",
		progress: 0
	},
	list: [],
	hasEdited: false,
	salvarBtEnabled: true,
	nextPage: false
};

export default function caduser(state = initialState, action) {
	
	switch (action.type) {

		case "IS_FETCHING_CADASTRO":
			return update(state, { isFetching: { $set: action.bool } });

		case "IS_SELECTING_DOCUMENT":
			return update(state, { isSelecting: { $set: action.id } });

		case "SET_DOCUMENTS_ITEMS_PER_PAGE":
			return update(state, { pagination: { itemsPerPage: { $set: action.itemsPerPage } } });

		case "SET_DOCUMENTS_CURRENT_PAGE":
			return update(state, { pagination: { currentPage: { $set: action.currentPage } } });

		case "SET_DOCUMENTS_FILTER_GROUPS":
			return update(state, { filter: { selectedGroups: { $set: action.groups } } });

		case "SET_DOCUMENTS_FILTER_VISIBILITY":
			return update(state, { filter: { visibility: { $set: action.visibility } } });

		case "SET_DOCUMENTS_FILTER_FOLDER":
			return update(state, { filter: { folder: { $set: action.folder } } });

		case "SET_DOCUMENTS_WHOLE_WORD":
			return update(state, { filter: { wholeWord: { $set: action.wholeWord } } });

		case "SET_DOCUMENTS_FILTER_KEYWORDS":
			return update(state, { filter: { selectedKeywords: { $set: action.keywords } } });

		case "SET_DOCUMENTS_FILTER_SECTORS":
			return update(state, { filter: { selectedSectors: { $set: action.sectors } } });

		case "SET_DOCUMENTS_FILTER_LOCALITIES":
			return update(state, { filter: { selectedLocalities: { $set: action.localities } } });

		default:
			return state;
	}
}