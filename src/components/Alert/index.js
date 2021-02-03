import { Modal, Typography } from '@material-ui/core';

import { MdError, MdCheckCircle } from 'react-icons/md';

import { useSelector, useDispatch } from 'react-redux';
import { showAlert } from '../../store/actions/alert';

function Alert() {
  const dispatch = useDispatch();
  const alert = useSelector((state) => state.alertReducer);

  if (alert.open) {
    setTimeout(() => {
      dispatch(showAlert({ open: false }));
    }, alert.time);
  }

  return (
    <Modal
      open={alert.open}
      onClose={() => dispatch(showAlert({ open: false }))}
      className="d-flex flex-column align-items-center justify-content-center h-100"
    >
      <div className="bg-white rounded-lg d-flex align-items-center p-4">
        {alert.class === 'success' && (
          <MdCheckCircle
            style={{ fontSize: '2.5rem' }}
            className="mr-3 text-success"
          />
        )}

        {alert.class === 'error' && (
          <MdError
            style={{ fontSize: '2.5rem' }}
            className="mr-3 text-danger"
          />
        )}
        <Typography className="font-weight-bold" variant="subtitle1">
          {alert.msg}
        </Typography>
      </div>
    </Modal>
  );
}

export default Alert;
