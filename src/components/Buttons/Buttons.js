import { useSelector, useDispatch } from 'react-redux';

import { changeSortType, loadMore } from '../../redux/actions';

import classes from './Buttons.module.scss';

const Buttons = ({ buttons }) => {
  const dispatch = useDispatch();
  const sortType = useSelector((state) => state.sortType);
  const visualisedCounter = useSelector((state) => state.visualisedCounter);

  const handleClick = (name) => {
    if (name === 'load') {
      dispatch(loadMore(visualisedCounter + 5));
    } else {
      dispatch(changeSortType(name));
    }
  };

  const buttonsList = buttons.map(({ name, label }, index, arr) => {
    let buttonStyles = `${classes['buttons__item']}`;
    if (index === 0) {
      buttonStyles += ` ${classes['buttons__item--first']}`;
    }
    if (index === arr.length - 1) {
      buttonStyles += ` ${classes['buttons__item--last']}`;
    }
    if (arr.length === 1) {
      buttonStyles += ` ${classes['buttons__item--single']}`;
    }
    if (sortType === name || arr.length === 1) {
      buttonStyles += ` ${classes['buttons__item--active']}`;
    }

    return (
      <button key={name} type="button" onClick={() => handleClick(name)} className={buttonStyles}>
        {label}
      </button>
    );
  });

  return <div className={classes.buttons}>{buttonsList}</div>;
};

export default Buttons;
