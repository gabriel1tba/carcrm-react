import { Snackbar, SnackbarContent } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { green, red } from '@material-ui/core/colors';

import { useSelector, useDispatch } from 'react-redux';
import { showNotify } from '../../store/actions/notify';

const useStyles = makeStyles({
  success: {
    backgroundColor: green[500],
  },
  error: {
    backgroundColor: red[600],
  },
});

const Notify = () => {
  const dispatch = useDispatch();
  const notify = useSelector((state) => state.notifyReducer);
  const classes = useStyles();

  return (
    <Snackbar
      anchorOrigin={{
        horizontal: notify.horizontal,
        vertical: notify.vertical,
      }}
      open={notify.open}
      autoHideDuration={notify.time}
      onClose={() => dispatch(showNotify({ open: false }))}
    >
      <SnackbarContent
        className={`${classes[notify.class]} d-flex justify-content-center`}
        message={
          <span className="d-flex align-items-center">{notify.msg}</span>
        }
      />
    </Snackbar>
  );
};

export default Notify;
