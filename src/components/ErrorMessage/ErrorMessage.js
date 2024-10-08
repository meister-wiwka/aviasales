import classes from './ErrorMessage.module.scss';

const ErrorMessage = ({ message }) => {
  return (
    <div className={classes.error}>
      <span className={classes['error_message']}>{message}</span>
    </div>
  );
};

export default ErrorMessage;
