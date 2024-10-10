import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';

import { getSearchId, getTickets } from '../../redux/actions';
import Ticket from '../Ticket';
import Buttons from '../Buttons';
import ErrorMessage from '../ErrorMessage';

import classes from './TicketsList.module.scss';

const TicketsList = () => {
  const dispatch = useDispatch();
  const searchId = useSelector((state) => state.searchId);
  const isLoading = useSelector((state) => state.isLoading);
  const error = useSelector((state) => state.error);
  const tickets = useSelector((state) => state.tickets);
  const sortType = useSelector((state) => state.sortType);
  const filters = useSelector((state) => state.filtersList);
  const visualisedCounter = useSelector((state) => state.visualisedCounter);

  useEffect(() => {
    if (!searchId) {
      dispatch(getSearchId());
    }
  }, [dispatch, searchId]);

  useEffect(() => {
    if (searchId && isLoading) {
      dispatch(getTickets(searchId));
    }
  }, [dispatch, isLoading, searchId]);

  const anyFilterSelected = filters.some(filter => filter.selected && filter.name !== 'all');

  const sortedList = (tickets || []).map((ticket) => {
    const transformedTicket = { ...ticket, id: uuidv4() };
    transformedTicket.totalTime = transformedTicket.segments.reduce((total, { duration }) => total + duration, 0);
    transformedTicket.optimalValue = transformedTicket.totalTime + transformedTicket.price;
    transformedTicket.stops = Math.max(transformedTicket.segments[0].stops.length, transformedTicket.segments[1].stops.length);
    return transformedTicket;
  }).sort((prev, next) => {
    switch (sortType) {
      case 'cheapest':
        return prev.price - next.price;
      case 'fastest':
        return prev.totalTime - next.totalTime;
      case 'optimal':
        return prev.optimalValue - next.optimalValue;
      default:
        return 0;
    }
  }).filter(ticket => filters.some(filter => filter.selected && filter.name === String(ticket.stops))).slice(0, visualisedCounter).map((ticket) => (
    <li key={ticket.id}>
      <Ticket ticket={ticket} />
    </li>
  ));

  return error ? (
    <ErrorMessage message={error.message} />
  ) : (
    <>
      <ul className={classes['tickets-list']}>{sortedList}</ul>
      {anyFilterSelected && (tickets || []).length > visualisedCounter ? (
        <Buttons buttons={[{ name: 'load', label: 'Загрузить еще 5 билетов' }]} />
      ) : null}
      {sortedList.length === 0 ? (
        <ErrorMessage message={'Рейсов, подходящих под заданные фильтры, не найдено'} />
      ) : null}
    </>
  );
};

export default TicketsList;
