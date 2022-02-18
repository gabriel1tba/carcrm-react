import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { MdCloudUpload, MdDelete, MdKeyboardBackspace } from 'react-icons/md';
import {
  AppBar,
  Button,
  CircularProgress,
  IconButton,
  Toolbar,
  Typography,
} from '@material-ui/core';

import Confirm from '../../Confirm';

import { toggleScreen1 } from '../../../store/actions/navigation';

import { destroyLogo, uploadLogo } from '../../../store/actions/app';

import { baseURL } from '../../../services/api';

const Logo = () => {
  const dispatch = useDispatch();
  const app = useSelector((state) => state.appReducer.app);

  const [isUpload, setIsUpload] = useState(null);
  const [isDeleted, setIsDeleted] = useState(null);
  const [confirmEl, setConfirmEl] = useState(null);

  const handleUpload = (event) => {
    setIsUpload(true);
    const body = new FormData();
    body.append('file', event.target.files[0]);

    dispatch(uploadLogo(body)).then((res) => res && setIsUpload(true));
  };

  const handleDestroy = (id) => {
    setIsDeleted(id);

    dispatch(destroyLogo(id)).then((res) => res && setIsDeleted(null));
  };

  return (
    <>
      <AppBar position="absolute">
        <Toolbar>
          <IconButton
            onClick={() => dispatch(toggleScreen1({ open: false }))}
            edge="start"
            color="inherit"
          >
            <MdKeyboardBackspace />
          </IconButton>

          <Typography variant="h6" color="inherit">
            Minha logo
          </Typography>
        </Toolbar>
      </AppBar>

      <div className="card-body scroll">
        <div className="d-flex flex-column align-items-center mt-5">
          {app.logo ? (
            <>
              <img
                alt=""
                style={isDeleted ? { opacity: 0.5 } : {}}
                className="img-fluid"
                src={
                  baseURL + 'thumb/logo/' + app.logo + '?u=' + app.id + '&h=150'
                }
              />

              <div className="mt-4">
                {isDeleted ? (
                  <CircularProgress color="secondary" />
                ) : (
                  <Button
                    color="secondary"
                    startIcon={<MdDelete />}
                    onClick={() => setConfirmEl(true)}
                  >
                    Remover
                  </Button>
                )}

                {confirmEl && (
                  <Confirm
                    open={confirmEl}
                    onConfirm={() => handleDestroy(app.id)}
                    onClose={() => setConfirmEl(null)}
                  />
                )}
              </div>
            </>
          ) : (
            <>
              <h5 className="mt-4 mb-4">Já tem uma logo?</h5>
              <input
                onChange={handleUpload}
                id="button-upload-logo"
                type="file"
                hidden
              />
              {isUpload ? (
                <CircularProgress />
              ) : (
                <label htmlFor="button-upload-logo">
                  <Button
                    variant="contained"
                    color="secondary"
                    component="span"
                    startIcon={<MdCloudUpload />}
                  >
                    upload
                  </Button>
                </label>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Logo;
