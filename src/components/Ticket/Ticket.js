import React from 'react';
import { add, format } from 'date-fns';

import classes from './Ticket.module.scss';

const Ticket = ({ ticket }) => {
  const routes = ticket.segments.map((segment) => {
    const route = { ...segment };

    route.start = format(new Date(segment.date), 'HH:mm');
    route.end = format(add(new Date(segment.date), { minutes: new Date(segment.duration) }), 'HH:mm');
    route.hours = Math.floor(segment.duration / 60);
    route.minutes = segment.duration - route.hours * 60;
    route.stopsText = route.stops.length === 0 ? 'Пересадок' : route.stops.length === 1 ? 'Пересадка' : 'Пересадки';

    return route;
  });

  return (
    <article className={classes.ticket}>
      <div className={classes['ticket__header']}>
        <span>{ticket.price.toLocaleString('ru')} р</span>
        <img src={`//pics.avs.io/99/36/${ticket.carrier}.png`} alt="carrier logo" />
      </div>
      <div className={classes['ticket__main']}>
        <RouteInfo route={routes[0]} />
        <RouteInfo route={routes[1]} />
      </div>
    </article>
  );
};

const RouteInfo = ({ route }) => {
  return (
    <div className={classes.route}>
      <div className={classes['route__info']}>
        <span className={classes['route__top']}>
          {route.origin} - {route.destination}
        </span>
        <span className={classes['route__bottom']}>
          {route.start} - {route.end}
        </span>
      </div>
      <div className={classes['route__info']}>
        <span className={classes['route__top']}>В пути</span>
        <span className={classes['route__bottom']}>
          {route.hours}ч {route.minutes}м
        </span>
      </div>
      <div className={classes['route__info']}>
        <span className={classes['route__top']}>
          {route.stops.length || 'Без'} {route.stopsText}
        </span>
        <span className={classes['route__bottom']}>{route.stops.join(', ') || '-'}</span>
      </div>
    </div>
  );
};

export default Ticket;
