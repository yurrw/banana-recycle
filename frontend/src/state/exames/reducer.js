import update from 'react/lib/update';

const doc = {
	title: "",
	institutions: [],
	folder: null,
	authors: [],
	url: "",
	keywords: [],
	themes: [],
	datetime: null,
	startCoverageDate: null,
	endCoverageDate: null,
	description: "",
	hasOwner: false,
	isPublic: true,
	sectors: [],
	localities: [],
	samplingPoints: [],	
	points: [],
	rects: [],
	log: [],
	projects: [],
	groups: []
};

const initialState = {
	isFetching: false,
	isSelecting: null,
	upload: {
		status: "IDLE",
		message: "",
		progress: 0
	},
	list: [],
	pagination: { itemsPerPage: 10, currentPage: 1 },
	filter: { 
		selectedGroups: [],
		visibility: 'all',
		folder: null,
		selectedKeywords: [],
		selectedSectors: [], 
		selectedLocalities: [],
		selectedTerms: [],
		wholeWord: false
	},
	selected: null,
	current: doc,
	hasEdited: false,
	salvarBtEnabled: true,
	nextPage: false
};

export default function pessoas(state = initialState, action) {
	
	switch (action.type) {

		case "IS_FETCHING_DOCUMENTS":
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

		case "SET_DOCUMENTS_FILTER_TERMS":
			return update(state, { filter: { selectedTerms: { $set: action.terms } } });

		case "SET_DOCUMENT_STATUS":
			if ( action.status === "SUCCESS" ) {
				return update(state, { upload: { status: { $set: action.status } }, hasEdited: { $set: false } });	
			}
			return update(state, { upload: { status: { $set: action.status } } });

		case "SET_DOCUMENT_MESSAGE":
			return update(state, { upload: { message: { $set: action.message } } });	

		case "SET_DOCUMENT_PROGRESS":
			return update(state, { upload: { progress: { $set: action.progress } } });			

		case "SET_TITLE":
			return update(state, { current: { title: { $set: action.title } }, hasEdited: { $set: true } });

		case "SET_FOLDER":
			return update(state, { current: { folder: { $set: action.folder } }, hasEdited: { $set: true } });		

		case "SET_KEYWORDS":
			return update(state, { current: { keywords: { $set: action.keywords } }, hasEdited: { $set: true } });	

		case "SET_THEMES":
			return update(state, { current: { themes: { $set: action.themes } }, hasEdited: { $set: true } });

		case "SET_AUTHORS":
			return update(state, { current: { authors: { $set: action.authors } }, hasEdited: { $set: true } });

		case "SET_INSTITUTIONS":
			return update(state, { current: { institutions: { $set: action.institutions } }, hasEdited: { $set: true } });		

		case "SET_SECTORS":
			return update(state, { current: { sectors: { $set: action.sectors } }, hasEdited: { $set: true } });

		case "SET_LOCALITIES":
			return update(state, { current: { localities: { $set: action.localities } }, hasEdited: { $set: true } });

		case "SET_SAMPLING_POINTS":
			return update(state, { current: { samplingPoints: { $set: action.samplingPoints } }, hasEdited: { $set: true } });

		case "SET_DATETIME":
			return update(state, { current: { datetime: { $set: action.datetime } }, hasEdited: { $set: true } });

		case "SET_START_COVERAGE_DATE":
			return update(state, { 
				current: { startCoverageDate: { $set: action.startCoverageDate } }, 
				hasEdited: { $set: true } 
			});

		case "SET_END_COVERAGE_DATE":
			return update(state, { 
				current: { endCoverageDate: { $set: action.endCoverageDate } }, 
				hasEdited: { $set: true } 
			});

		case "SET_DESCRIPTION":
			return update(state, { current: { description: { $set: action.description } }, hasEdited: { $set: true } });

		case "SET_URL":
			return update(state, { current: { url: { $set: action.url } }, hasEdited: { $set: true } });

		case "SET_IS_PUBLIC":
			return update(state, { current: { isPublic: { $set: action.bool } }, hasEdited: { $set: true } });

		case "SET_HAS_OWNER":
			return update(state, { current: { hasOwner: { $set: action.bool } }, hasEdited: { $set: true } });

		case "SET_POINTS":
			return update(state, { current: { points: { $set: action.points } }, hasEdited: { $set: action.hasEdited } });

		case "CREATE_POINT":
			return update(state, { 
				current: { points: { $push: [{lat: action.lat, lng: action.lng, img: [], savedImg: []}] } }, 
				hasEdited: { $set: true } 
			});

		case "REMOVE_POINT":
			return update(state, { 
				current: { points: { $splice: [[action.index, 1]] } }, 
				hasEdited: { $set: true } 
			});

		case "ADD_POINT_IMAGE":
			return update(state, { 
				current: { points: { [action.index]: { img: { $push: [{src: null, caption: ""}] } } } },
				hasEdited: { $set: true } 
			});

		case "REMOVE_POINT_IMAGE":
			return update(state, { 
				current: { points: { [action.i]: { img: { $splice: [[action.j, 1]] } } } },
				hasEdited: { $set: true } 
			});

		case "SET_POINT_SRC":
			return update(state, { 
				current: { points: { [action.i]: { img: { [action.j]: { src: { $set: action.src } } } } } },
				hasEdited: { $set: true } 
			});

		case "SET_POINT_CAPTION":
			return update(state, { 
				current: { points: { [action.i]: { img: { [action.j]: { caption: { $set: action.caption } } } } } },
				hasEdited: { $set: true } 
			});

		case "SET_LAT":
			return update(state, { 
				current: { points: { [action.index]: { lat: { $set: action.lat } } } }, 
				hasEdited: { $set: true } 
			});

		case "SET_LNG":
			return update(state, { 
				current: { points: { [action.index]: { lng: { $set: action.lng } } } }, 
				hasEdited: { $set: true } 
			});

		case "CREATE_RECT":
			return update(state, { 
				current: { rects: { $push: [{ nw: {lat: "", lng: ""}, se: {lat: "", lng: ""} }] } }, 
				hasEdited: { $set: true } 
			});

		case "REMOVE_RECT":
			return update(state, { current: { rects: { $splice: [[action.index, 1]] } }, hasEdited: { $set: true } });

		case "SET_LAT_NW":
			return update(state, { 
				current: { rects: { [action.index]: { nw: { lat: { $set: action.lat } } } } }, 
				hasEdited: { $set: true } 
			});

		case "SET_LNG_NW":
			return update(state, { 
				current: { rects: { [action.index]: { nw: { lng: { $set: action.lng } } } } }, 
				hasEdited: { $set: true } 
			});

		case "SET_LAT_SE":
			return update(state, { 
				current: { rects: { [action.index]: { se: { lat: { $set: action.lat } } } } }, 
				hasEdited: { $set: true } 
			});

		case "SET_LNG_SE":
			return update(state, { 
				current: { rects: { [action.index]: { se: { lng: { $set: action.lng } } } } }, 
				hasEdited: { $set: true } 
			});

		case "INSERT_DOCUMENT":
			return update(state, { list: { $push: [action.document] } });

		case "CLEAR_FORM":
			return update(state, { 
				current: { $set: doc },
				selected: { $set: null },
				hasEdited: { $set: false }  
			});

		case "UPDATE_DOCUMENT":
			return update(state, { list: { [action.index]: { $set: action.document } } });

		case "SELECT_DOCUMENT":
			return update(state, { 
				current: { $set: action.document },
				selected: { $set: action.index } 
			});

		case "SET_DOCUMENT_ID":
			return update(state, { selected: { $set: action.id } });		

		case "SET_DOCUMENTS":
			return update(state, { list: { $set: action.documents } });	

		case "SET_LOG":
			return update(state, { current: { log: { $set: action.log } } });

		case "TOGGLE_FAVORITE":
			let index = state.list.findIndex((d) => d.id === action.id);
			if ( index === -1 ) return state;
			return update(state, { list: { [index]: { isFavorite: { $apply: function(x) { return !x; } } } } });

		case "TOOGLE_SAVEBT":
			return update(state, { salvarBtEnabled: { $set: action.value } });

		case "ALLOW_NEXTPAGE":
			return update(state, { nextPage: { $set: action.nextPage } });
		default:
			return state;
	}
}