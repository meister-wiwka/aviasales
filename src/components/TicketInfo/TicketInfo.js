import classes from './TicketInfo.module.scss';

const TicketInfo = ({ wayInfo }) => {
  return (
    <div className={classes.route}>
      <div className={classes['route__info']}>
        <span className={classes['route__top']}>
          {wayInfo.origin} - {wayInfo.destination}
        </span>
        <span className={classes['route__bottom']}>
          {wayInfo.start} - {wayInfo.end}
        </span>
      </div>
      <div className={classes['route__info']}>
        <span className={classes['route__top']}>В пути</span>
        <span className={classes['route__bottom']}>
          {wayInfo.hours}ч {wayInfo.minutes}м
        </span>
      </div>
      <div className={classes['route__info']}>
        <span className={classes['route__top']}>
          {wayInfo.stops.length || 'Без'} {wayInfo.stopsText}
        </span>
        <span className={classes['route__bottom']}>{wayInfo.stops.join(', ') || '-'}</span>
      </div>
    </div>
  );
};

export default TicketInfo;
