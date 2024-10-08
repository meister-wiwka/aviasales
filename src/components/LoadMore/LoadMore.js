import { useDispatch, useSelector } from 'react-redux';
import { loadMore } from '../../actions';

const LoadMore = () => {
  const dispatch = useDispatch();
  const visualisedCounter = useSelector((state) => state.visualisedCounter);

  const handleClick = () => {
    dispatch(loadMore(visualisedCounter + 5));
  };

  return (
    <button type="button" onClick={() => handleClick()}>
      Показать еще 5 билетов
    </button>
  );
};

export default LoadMore;
