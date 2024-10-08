import classes from './TicketsSorter.module.scss';

import { useSelector, useDispatch } from 'react-redux';

import { changeSortType } from '../../actions';

const TicketsSorter = () => {
  const dispatch = useDispatch();
  const sortType = useSelector((state) => state.sortType);

  const handleClick = (name) => {
    dispatch(changeSortType(name));
  };

  const buttons = [
    { name: 'cheapest', label: 'Самый дешевый' },
    { name: 'fastest', label: 'Самый быстрый' },
    { name: 'optimal', label: 'Оптимальный' },
  ];

  const buttonsList = buttons.map(({ name, label }) => {
    const st = sortType === name ? classes['tickets-sorter__button--active'] : null;
    return (
      <li key={name} className={classes['tickets-sorter__item']}>
        <button
          type="button"
          onClick={() => handleClick(name)}
          className={`${classes['tickets-sorter__button']} ${st} ${classes[`tickets-sorter__button--${name}`]}`}
        >
          {label}
        </button>
      </li>
    );
  });

  return (
    <div className={classes['tickets-sorter']}>
      <ul className={classes['tickets-sorter__list']}>{buttonsList}</ul>
    </div>
  );
};

export default TicketsSorter;
