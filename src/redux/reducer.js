import {
  ERROR_DETECT,
  LOAD_MORE,
  CHANGE_FILTERS_LIST,
  CHANGE_SORT_TYPE,
  TICKETS_LOAD,
  GET_SEARCH_ID,
  GET_TICKETS_PACK,
} from './types';

const initialState = {
  searchId: '',
  tickets: [],
  isLoading: true,
  error: null,
  sortType: 'cheapest',
  filtersList: [
    { name: 'all', label: 'Все', selected: true },
    { name: '0', label: 'Без пересадок', selected: true },
    { name: '1', label: '1 пересадка', selected: true },
    { name: '2', label: '2 пересадки', selected: true },
    { name: '3', label: '3 пересадки', selected: true },
  ],
  visualisedCounter: 5,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ERROR_DETECT:
      return { ...state, error: action.payload, isLoading: false };
    case LOAD_MORE:
      return { ...state, visualisedCounter: action.payload };
    case CHANGE_FILTERS_LIST:
      return { ...state, filtersList: action.payload };
    case CHANGE_SORT_TYPE:
      return { ...state, sortType: action.payload };
    case TICKETS_LOAD:
      return { ...state, isLoading: false };
    case GET_TICKETS_PACK:
      return { ...state, tickets: [...state.tickets, ...action.payload], isLoading: false };
    case GET_SEARCH_ID:
      return { ...state, searchId: action.payload };
    default:
      return state;
  }
};

export default reducer;
