import aviasalesService from '../services/AviasalesService';
import {
  ERROR_DETECT,
  LOAD_MORE,
  CHANGE_FILTERS_LIST,
  CHANGE_SORT_TYPE,
  TICKETS_LOAD,
  GET_SEARCH_ID,
  GET_TICKETS_PACK,
} from './types';

const errorDetect = (error) => {
  return {
    type: ERROR_DETECT,
    payload: error,
  };
};

export const loadMore = (value) => {
  return {
    type: LOAD_MORE,
    payload: value,
  };
};

export const changeFiltersList = (filtersList) => {
  return {
    type: CHANGE_FILTERS_LIST,
    payload: filtersList,
  };
};

export const changeSortType = (sortType) => {
  return {
    type: CHANGE_SORT_TYPE,
    payload: sortType,
  };
};

export const getSearchId = () => {
  return (dispatch) => {
    aviasalesService
      .getSearchId()
      .then((res) => {
        dispatch({ type: GET_SEARCH_ID, payload: res.searchId });
        dispatch(getTickets(res.searchId));
      })
      .catch((e) => dispatch(errorDetect(e)));
  };
};

export const getTickets = (searchId, offset = 0) => {
  return (dispatch) => {
    aviasalesService
      .getTicketsPack(searchId, offset)
      .then((res) => {
        dispatch({ type: GET_TICKETS_PACK, payload: res.tickets });
        if (res.stop) {
          dispatch({ type: TICKETS_LOAD });
        }
      })
      .catch((e) => {
        if (e.message === '500') {
          dispatch({ type: GET_TICKETS_PACK, payload: [] });
        } else {
          dispatch(errorDetect(e));
        }
      });
  };
};
